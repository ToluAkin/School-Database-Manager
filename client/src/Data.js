import config from "./config";

/**
 * @class Data
 */
export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    /**
     * The api handles getting a user detail
     * @param emailAddress
     * @param password
     * @returns {Promise<null|any>}
     */
    async getUser(emailAddress, password) {
        const response = await this.api(
            `/users`, 'GET', null, true, { emailAddress, password }
        );
        if (response.status === 200) {
            return response.json().then((data) => data);
        } else if (response.status === 401) {
            return null;
        } else  {
            throw new Error();
        }
    }

    /**
     * The api handles creating a user
     * @param user
     * @returns {Promise<any|*[]>}
     */
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /**
     * The api handles creating a course
     * @param course
     * @param emailAddress
     * @param password
     * @returns {Promise<any|*[]>}
     */
    async createCourse(course, emailAddress, password) {
        const response = await this.api(
            `/courses`, 'POST', course, true, { emailAddress, password }
        );
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /**
     * The api handles updating a course
     * @param course
     * @param emailAddress
     * @param password
     * @returns {Promise<any|*[]>}
     */
    async updateCourse(course, emailAddress, password) {
        const response = await this.api(
            `/courses/${course.id}`, 'PUT', course, true, { emailAddress, password }
        );
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /**
     * The api handles deleting a course
     * @param courseId
     * @param emailAddress
     * @param password
     * @returns {Promise<any|*[]>}
     */
    async deleteCourse(courseId, emailAddress, password) {
        const response = await this.api(
            `/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password }
        );
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }
}