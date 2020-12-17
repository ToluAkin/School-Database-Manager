import React, { Component } from "react";
import { Link } from "react-router-dom";
import Course from "./Course";
import config from "../config";
const axios = require("axios");

class Courses extends Component {
    constructor() {
        super();

        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        this.AllCourses();
    }

    AllCourses = () => {
        axios.get(`${config.apiBaseUrl}/courses`)
            .then((response) => {
                this.setState({
                    courses: response.data,
                })
            })
            .catch((error) => {
                console.log('Error fetching data', error);
            });
    };

    render() {
        const data = this.state.courses;
        let courses;

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