import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import { library } from "@fortawesome/fontawesome-svg-core";
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
    isLogin: true,
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
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/projects" />}
              />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/project/new" component={ProjectNew} />
              <Route
                exact
                path="/project/:projectId/edit"
                component={ProjectEdit}
              />
              <Route
                exact
                path="/project/:projectId"
                component={Project}
              />
              <Route
                exact
                path="/project/:projectId/:scrumId"
                component={Project}
              />
              <Route exact path="/users" component={Users} />
              <Route exact path='/logout' component={(props) => <Logout clearUserInfo={this.clearUserInfo} {...props} />} />
              <Route component={PageNotFound} />
            </Switch>
          </>
        ) : (
            <Switch>
              <Route exact path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          )}
      </BrowserRouter>
    );
  }
}

export default App;
