import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Projects extends Component {
  render() {
    return (
      <div>
        Projects
        <Link to={"/project/1/1"}>project 1</Link>
        <Link to={"/project/2/1"}>project 2</Link>
      </div>
    );
  }
}
