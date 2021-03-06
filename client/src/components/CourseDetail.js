import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import ReactMarkdown from 'react-markdown'
const axios = require("axios");

/**
 * @class CourseDetail
 * Handles rendering the detail of a course
 */
class CourseDetail extends Component {
    constructor() {
        super();

        this.state = {
            courseDetail: [],
            user: []
        }
    }

    /**
     * Component Lifecycle
     */
    componentDidMount() {
        this.GetCourseDetail();
    }

    /**
     * To get the details of a course and the owner
     * @constructor
     */
    GetCourseDetail = () => {
        const id = this.props.match.params.id;
        axios.get(`${config.apiBaseUrl}/courses/${id}`)
            .then((response) => {
                this.setState({
                    courseDetail: response.data,
                    user: response.data.user
                })
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
     * The action to delete a course
     * @param e
     */
    deleteCourse(e) {
        e.preventDefault();
        const { context } = this.props;
        const id = this.props.match.params.id;

        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        context.data.deleteCourse(id, emailAddress, password)
            .then((errors) => {
                if (errors.length > 0) {
                    this.setState({ errors });
                } else  {
                    this.props.history.push('/');
                }
            })
            .catch((error) => {
                console.error(error)
                this.props.history.push('/error');
            })
    }

    /**
     * Renders the elements of the course detail page
     * @returns {JSX.Element}
     */
    render() {
        const { context } = this.props;
        let course = this.state.courseDetail;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            { context.authenticatedUser && context.authenticatedUser.id === course.userId &&
                                <span>
                                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                    <button className="button" onClick={(e) => {
                                        if (window.confirm('Are you sure you want to delete this course?')) this.deleteCourse(e)
                                    }}>Delete Course</button>
                                </span>
                            }
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseDetail;