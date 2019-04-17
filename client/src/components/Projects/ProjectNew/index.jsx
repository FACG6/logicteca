import React, { Component } from "react";

export default class index extends Component {
  state = {
    member: require("./member.json")
  };
  render() {
    const { member } = this.state;
    return (
      <section className="main">
        <h1 className="main--h1">Create Project: </h1>
        <form className="main--form">
          <label className="main-label" htmlFor="name">
            <h3>
              Project Name <span className="main-required">*</span>:
            </h3>

            <input type="text" id="name" className="main-input" required />
          </label>
          <label className="main-label" htmlFor="name">
            <h3>Description :</h3>
            <input type="text" id="name" className="main-input" />
          </label>
          <h3>Assign Team :</h3>
          <div>
            <h3>Memebrs</h3>
            <form />
          </div>
        </form>
      </section>
    );
  }
}
