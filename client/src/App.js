import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import isAuth from './auth/isAuth';

import {
  faTrash,
  faFilter,
  faPlus,
  faEllipsisH,
  faCaretDown,
  faSearch,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import Login from './components/Login';
import Header from './components/Layout/Header';
import Projects from './components/Projects';
import ProjectNew from './components/Projects/ProjectNew';
import ProjectEdit from './components/Projects/ProjectEdit';
import Users from './components/Users';
import Project from './components/Project/index';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './auth/index';

library.add(
  faTrash,
  faFilter,
  faPlus,
  faEllipsisH,
  faCaretDown,
  faSearch,
  faEdit
);

class App extends Component {
  state = {
    userInfo: {},
    isLogin: false,
  };
  componentDidMount() {
    isAuth
      ? this.setState({ isLogin: true })
      : this.setState({ isLogin: false });
  }
  setUserInfo = user => {
    this.setState({ userInfo: user, isLogin: true });
  };

  clearUserInfo = () => {
    this.setState({ userInfo: '', isLogin: false });
  };

  render() {
    const { isLogin } = this.state;
    return (
      <BrowserRouter>
        {isLogin ? (
          <>
            <Header
              clearUserInfo={this.clearUserInfo}
              userInfo={this.state.userInfo}
            />
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/projects" />}
              />
              <PrivateRoute
                clearUserInfo={this.clearUserInfo}
                exact
                path="/projects"
                component={props => <Projects {...props} />}
              />
              <PrivateRoute
                clearUserInfo={this.clearUserInfo}
                exact
                path="/project/new"
                component={props => <ProjectNew {...props} />}
              />
              <PrivateRoute
                clearUserInfo={this.clearUserInfo}
                exact
                path="/project/:projectId/edit"
                component={props => <ProjectEdit {...props} />}
              />
              <PrivateRoute
                clearUserInfo={this.clearUserInfo}
                exact
                path="/project/:projectId"
                component={props => <Project {...props} />}
              />
              <PrivateRoute
                clearUserInfo={this.clearUserInfo}
                exact
                path="/project/:projectId/:scrumId"
                component={props => <Project {...props} />}
              />
              <PrivateRoute
                clearUserInfo={this.clearUserInfo}
                exact
                path="/users"
                component={props => <Users {...props} />}
              />
              <Route exact path="/login" render={() => <Redirect to="/" />} />
              <Route component={PageNotFound} />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route
              exact
              path="/login"
              component={props => (
                <Login {...props} setUserInfo={this.setUserInfo} />
              )}
            />
            <Route
              render={props => {
                return (
                  <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: props.location }
                    }}
                  />
                );
              }}
            />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
