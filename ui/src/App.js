import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Navbar from './components/navbar';
import LoginForm from './components/forms/loginForm';
import RegisterForm from './components/forms/registerForm';
import LandingPage from './components/landingPage';
import UserHome from './components/userHome';
import Logout from './components/logout';
import UserProfile from './components/userProfile';
import auth from './services/authService'
import './App.css';
import "react-toastify/dist/ReactToastify.css";


class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <div className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/home" component={UserHome} />
            <Route path="/logout" component={Logout} />
            <Route path="/userProfile" component={UserProfile} />
            <Route path="/" exact component={LandingPage} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
