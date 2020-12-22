import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
 * @class UserSignIn
 * Handles the signing in of a specified user
 */
class UserSignIn extends Component {
    state = { emailAddress: '', password: '', errors: [] }

    render() {
        const { emailAddress, password, errors } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                            </React.Fragment>
                        )} />
                    <p>
                        Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                    </p>
                </div>
            </div>
        );
    }

    // Handles the action when form is edited
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // Handles the action when the form is submitted
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: [ 'Sign-in was unsuccessful' ] };
                    })
                } else {
                    this.props.history.push(from);
                }
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    this.props.history.push('/error');
                } else {
                    console.log('Error fetching data', error);
                }
            });
    }

    // Handles the action when the cancel button is clicked
    cancel = () => {
        this.props.history.push('/');
    }
}

export default UserSignIn;
