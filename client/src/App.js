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
} from "@fortawesome/free-solid-svg-icons";
import Login from "./components/Login";
import Header from "./components/Layout/Header";
import Projects from "./components/Projects";
import ProjectNew from "./components/Projects/ProjectNew";
import ProjectEdit from "./components/Projects/ProjectEdit";
import Users from "./components/Users";
import Project from "./components/Project/index";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from './auth/index';
import Logout from './components/logout'

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
    isLogin: true
  };
  setUserInfo = userInfo => {
    this.setState({ userInfo, isLogin: true });
  };

  clearUserInfo = () => {
    this.setState({ userInfo: '', isLogin: false });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <BrowserRouter>
        {isLogin ? (
          <>
            <Header userInfo={this.state.userInfo} />
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
                component={props => <Redirect to="/" />}
              />
              <Route
                exact
                path='/logout'
                component={(props) => <Logout clearUserInfo={this.clearUserInfo}
                  {...props}
                />}
              />
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
