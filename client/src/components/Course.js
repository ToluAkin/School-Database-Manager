import React from "react";
import { Link } from "react-router-dom";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor Course handles the course card on the homepage
 */
const Course = (props) => {
    return (
        <div className="grid-33">
            <Link
                className="course--module course--link"
                to={`/courses/${props.id}`}
            >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.title}</h3>
            </Link>
        </div>
    );
};

export default Course;