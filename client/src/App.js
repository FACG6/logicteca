import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faFilter, faPlus, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Login from "./components/Login";
import Header from "./components/Layout/Header";
import Projects from "./components/Projects";
import ProjectNew from "./components/Projects/ProjectNew";
import ProjectEdit from "./components/Projects/ProjectEdit";
import Members from "./components/Members";
import Scrum from "./components/scrum";
import { SearchIcon } from "./components/common components/search";

library.add(faTrash, faFilter, faPlus, faCaretDown);

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
              <Route exact path="/members" component={Members} />
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
