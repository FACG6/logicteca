import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { library } from '@fortawesome/fontawesome-svg-core';
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
    isAuth: false,
    userInfo: {}
  };
  setUserInfo = userInfo => {
    this.setState({ userInfo, isAuth: true });
  };
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to="/projects" />}
            />
            <PrivateRoute exact path="/projects" component={Projects} />
            <PrivateRoute exact path="/project/new" component={ProjectNew} />
            <PrivateRoute
              exact
              path="/project/:projectId/edit"
              component={ProjectEdit}
            />
            <PrivateRoute
              exact
              path="/project/:projectId"
              component={Project}
            />
            <PrivateRoute
              exact
              path="/project/:projectId/:scrumId"
              component={Project}
            />
            <PrivateRoute exact path="/users" component={Users} />
            <Route
              exact
              path="/login"
              component={Login}
              setUserInfo={this.setUserInfo}
            />
            <Route component={PageNotFound} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
