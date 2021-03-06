import React, { Component } from "react";
import Form from "./Form";
import config from "../config";
const axios = require("axios");

/**
 * @class UpdateCourse
 * Handles updating course details
 */
class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        id: this.props.match.params.id,
        user: [],
        errors: []
    }

    /**
     * Component Lifecycle
     */
    componentDidMount() {
        this.GetCourse();
    }

    /**
     * To get the details of a selected course
     * @constructor
     */
    GetCourse = () => {
        const { context } = this.props;
        const id = this.props.match.params.id;
        axios.get(`${config.apiBaseUrl}/courses/${id}`)
            .then((response) => {
                if (response.data.userId !== context.authenticatedUser.id) {
                    this.props.history.push('/forbidden');
                } else {
                    this.setState({
                        title: response.data.title,
                        description: response.data.description,
                        estimatedTime: response.data.estimatedTime,
                        materialsNeeded: response.data.materialsNeeded,
                        user: response.data.user
                    })
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    this.props.history.push('/notfound');
                } else if (error.response.status === 500) {
                    this.props.history.push('/error');
                } else {
                    console.log('Error fetching data', error);
                }
            });
    }

    /**
     * Renders the elements of the specified course page
     * @returns {JSX.Element}
     */
    render() {
        const { title, description, estimatedTime, materialsNeeded, errors } = this.state;
        return (
            <div className='bounds course--detail'>
                <h1>Update Course</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Update Course"
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
                                    <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
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
        const { title, description, estimatedTime, materialsNeeded, id } = this.state;

        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;
        const userId = context.authenticatedUser.id;
        const course = { title, description, estimatedTime, materialsNeeded, id, userId };

        context.data.updateCourse(course, emailAddress, password)
            .then((errors) => {
                if (errors.length > 0) {
                    this.setState({ errors });
                } else {
                    this.props.history.push(`/courses/${this.props.match.params.id}`)
                }
            })
            .catch((error) => {
                console.error(error)
                this.props.history.push('/error');
            })
    }

    // Handles the action when the cancel button is clicked
    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }
}

export default UpdateCourse;