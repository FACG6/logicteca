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
import Scrum from "./components/scrum";
import PageNotFound from "./components/PageNotFound";

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
    login: true
  };
  render() {
    const { login } = this.state;
    return (
      <BrowserRouter>
        {login ? (
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
                path="/project/:projectId/:scrumId"
                component={Scrum}
              />
              <Route exact path="/users" component={Users} />
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
