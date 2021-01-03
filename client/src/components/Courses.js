import React, { Component } from "react";
import { Link } from "react-router-dom";
import Course from "./Course";
import config from "../config";
const axios = require("axios");

/**
 * @class Courses
 * Handles the rendering of all the courses in the database
 */
class Courses extends Component {
    constructor() {
        super();

        this.state = {
            courses: []
        };
    }

    /**
     * Component Lifecycle
     */
    componentDidMount() {
        this.AllCourses();
    }

    /**
     * To get all the courses
     * @constructor
     */
    AllCourses = () => {
        axios.get(`${config.apiBaseUrl}/courses`)
            .then((response) => {
                this.setState({
                    courses: response.data,
                })
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    this.props.history.push('/error');
                } else {
                    console.log('Error fetching data', error);
                }
            });
    };

    /**
     * Renders the elements to render the all courses page
     * @returns {JSX.Element}
     */
    render() {
        const data = this.state.courses;
        let courses;

        /**
         * Check if there is data to be passed to render the course cards
         */
        if (data && data.length) {
            courses = data.map((course) => (
                <Course title={course.title} key={course.id} id={course.id} />
            ));
        }

        return (
            <div className="bounds">
                {courses}
                <div className="grid-33">
                    <Link
                        className="course--module course--add--module"
                        to="/courses/create"
                    >
                        <h3 className="course--add--title">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 13 13"
                                className="add"
                            >
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "/>
                            </svg>
                            New Course
                        </h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Courses;