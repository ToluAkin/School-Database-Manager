import React from 'react';
import { BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import components
import NotFound from "./components/NotFound";
import Error from "./components/Error";
import Forbidden from "./components/Forbidden";
import Header from "./components/Header";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";

// import HOC
import withContext from './Context';
import PrivateRoute from "./PrivateRoute";

// imports withContext
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail)
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {
  return (
      <Router>
        <div>
          <HeaderWithContext />

          <Switch>
              <Route exact path="/"  component={Courses} />
              <Route path="/signin" component={UserSignInWithContext} />
              <Route path="/signup" component={UserSignUpWithContext} />
              <Route path="/signout" component={UserSignOutWithContext} />
              <Route path="/courses/:id" component={CourseDetailWithContext} />
              <PrivateRoute path="/create-course" component={CreateCourseWithContext} />
              <PrivateRoute path="/course-update/:id" component={UpdateCourseWithContext} />
              <Route path="/forbidden" component={Forbidden} />
              <Route path="/error" component={Error} />
              <Route path="/notfound" component={NotFound} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
