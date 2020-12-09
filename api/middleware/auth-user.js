'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Middleware to authenticate the request using Basic Auth.
exports.authenticateUser = async (req, res, next) => {
    let message; // store the message to display

    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);

    // If the user's credentials are available...
    if (credentials) {
        // Attempt to retrieve the user from the data store
        // by their username (i.e. the user's "key"
        // from the Authorization header).
        const user = await User.findOne({ where: { emailAddress: credentials.name} });
        // If a user was successfully retrieved from the data store...
        // Use the bcrypt npm package to compare the user's password
        // (from the Authorization header) to the user's password
        // that was retrieved from the data store.

        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);

            // If the passwords match...
            // Store the retrieved user object on the request object
            // so any middleware functions that follow this middleware function
            // will have access to the user's information.
            if (authenticated) {
                console.log(`Authentication successful for email address: ${ credentials.name }`);

                // Store the user on the Request object.
                req.currentUser = user;
            } else {
                message = `Authentication failure for username: ${ credentials.name }`;
            }
        } else {
            message = `User not found for email address: ${ user.emailAddress }`;
        }
    } else {
        message = 'Auth header not found';
    }

    // If user authentication failed...
    // Return a response with a 401 Unauthorized HTTP status code.
    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        // Or if user authentication succeeded...
        // Call the next() method.
        next();
    }
};
