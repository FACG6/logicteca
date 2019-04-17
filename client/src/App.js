import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import Login from "./components/Login";
import Header from "./components/Layout/Header";
import Projects from "./components/Projects";
import ProjectsNew from "./components/Projects/ProjectsNew";
import ProjectsEdit from "./components/Projects/ProjectsEdit";
import Members from "./components/Members";
import Scrum from "./components/scrum";

library.add(faTrash, faFilter, faPlus);

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
              <Route exact path={"/"} Redirect={"/projects"} />
              <Route exact path={"/projects"} component={() => <Projects />} />
              <Route
                exact
                path={"/projects/new"}
                component={() => <ProjectsNew />}
              />
              <Route
                exact
                path={"/projects/:projectId/edit"}
                component={ProjectsEdit}
              />
              <Route
                exact
                path={"/projects/:projectId/:scrumId"}
                component={Scrum}
              />
              <Route exact path={"/members"} component={() => <Members />} />
            </Switch>
          </>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    );
  }
}

export default App;
