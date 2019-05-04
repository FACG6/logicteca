import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import {
  faTrash,
  faFilter,
  faPlus,
  faEllipsisH,
  faCaretDown,
  faSearch,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Login from './components/Login';
import Header from './components/Layout/Header';
import Projects from './components/Projects';
import ProjectNew from './components/Projects/ProjectNew';
import ProjectEdit from './components/Projects/ProjectEdit';
import Users from './components/Users';
import Project from './components/Project/index';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './auth/PrivateRoute';
import LogedoutRoute from './auth/LogedoutRoute';

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
  // axios configuration
  axiosSource = axios.CancelToken.source();
  axiosInstance = axios.create({
    baseURL: '/api/v1/',
    cancelToken: this.axiosSource.token
  });

  state = {
    userInfo: {},
  };

  setUserInfo = userInfo => {
    this.setState({ userInfo });
  };

  clearUserInfo = () => {
    this.setState({ userInfo: '' });
  };

  componentWillUnmount() {
    this.axiosSource.cancel('cancel getUserInfo request');
  }

  componentDidMount() {
    this.axiosInstance
    .get('/isAuthenticated')
      .then(({ data: userInfo }) => this.setState({ userInfo }))
  }

  render() {
    return (
      <BrowserRouter>
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
              <LogedoutRoute
                exact
                path="/login"
                component={props => (
                  <Login {...props} setUserInfo={this.setUserInfo} />
                )}
              />
              <Route component={PageNotFound} />
            </Switch>
          </>
      </BrowserRouter>
    );
  }
}

export default App;
