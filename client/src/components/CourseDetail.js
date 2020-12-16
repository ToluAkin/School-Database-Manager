import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
const axios = require("axios");

class CourseDetail extends Component {
    constructor() {
        super();

        this.state = {
            courseDetail: [],
        }
    }

    componentDidMount() {
        this.GetCourseDetail();
    }

    GetCourseDetail = () => {
        const id = this.props.match.params.id;
        axios.get(`${config.apiBaseUrl}/courses/${id}`)
            .then((response) => {
                this.setState({
                    courseDetail: response.data,
                })
            })
            .catch((error) => {
                console.log('Error fetching data', error);
            });
    }

    render() {
        let course = this.state.courseDetail;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link className="button" to="#">Update Course</Link>
                                <Link className="button" to="#">Delete Course</Link>
                            </span>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <p>{course.description}</p>
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
                                        <li>{course.materialsNeeded}</li>
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