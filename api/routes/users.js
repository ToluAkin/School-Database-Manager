'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
// Handler function to wrap each route.
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const { User } = require('../models');

// Construct a router instance.
const router = express.Router();

// Returns the currently authenticated user.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));

// Creates a user, sets the Location header to "/", and returns no content
router.post('/users', asyncHandler(async (req, res) => {
    try {
        const reqBody = req.body;
        if (reqBody.password) {
            reqBody.password = bcrypt.hashSync(reqBody.password, salt);
        }

        if (reqBody.emailAddress) {
            const existingEmail = await User.findOne({ where: { emailAddress: reqBody.emailAddress }});
            if (existingEmail) {
                const error = new Error('The email exist already.');
                error.status = 404;
                throw error;
            }
        }
        // Get the user from the request body.
        await User.create(reqBody);
        res.status(201).location('/').end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));

module.exports = router;