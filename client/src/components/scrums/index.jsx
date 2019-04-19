import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Scrum extends Component {
  render() {
    const id = this.props.match.params.scrumId;
    return (
      <>
      <Link to={'/project/1/1'}>scrum 1</Link>
      <Link to={'/project/1/2'}>scrum 2</Link>
        <div>scrum {id}</div>
      </>
    );
  }
}
