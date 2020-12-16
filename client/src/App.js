import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import NotFound from "./components/NotFound";
import Error from "./components/Error";
import Header from "./components/Header";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

import withContext from './Context';
import PrivateRoute from "./PrivateRoute";

// imports withContext
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

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
              <Route path="/courses/:id" component={CourseDetail} />
              <Route path="/error" component={Error} />
              <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
