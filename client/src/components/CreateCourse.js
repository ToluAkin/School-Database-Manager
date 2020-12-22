import React, { Component } from "react";
import Form from "./Form";

/**
 * @class CreateCourse
 * Handles creating a course
 */
class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    /**
     * Handles the rendering of elements needed to render the create course view
     * @returns {JSX.Element}
     */
    render() {
        const { context } = this.props;
        const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

        return (
            <div className='bounds course--detail'>
                <h1>Create Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="input-title course--title--input"
                                            placeholder="Course title..."
                                            value={ title }
                                            onChange={this.change}
                                        />
                                    </div>
                                    <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className=""
                                            placeholder="Course description..."
                                            value={ description }
                                            onChange={this.change}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    className="course--time--input"
                                                    placeholder="Hours"
                                                    value={ estimatedTime }
                                                    onChange={this.change}
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    className=""
                                                    placeholder="List materials..."
                                                    value={ materialsNeeded }
                                                    onChange={this.change}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                />
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
        const { title, description, estimatedTime, materialsNeeded } = this.state;

        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;
        const userId = context.authenticatedUser.id;
        const course = { title, description, estimatedTime, materialsNeeded, userId };

        context.data.createCourse(course, emailAddress, password)
            .then( errors => {
                if (errors.length > 0) {
                    this.setState({ errors });
                } else {
                    this.props.history.push('/')
                }
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    this.props.history.push('/error');
                } else {
                    console.log('Error fetching data', error);
                }
            })
    }

    // Handles the action when the cancel button is clicked
    cancel = () => {
        this.props.history.push('/');
    }
}

export default CreateCourse;