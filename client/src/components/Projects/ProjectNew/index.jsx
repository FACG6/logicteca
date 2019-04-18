import React, { Component } from "react";
import "./style.css";
import TableMember from "./TableMember";

export default class index extends Component {
  render() {
    return (
      <section className="main">
        <div className="main--div">
          <h1 className="main--h1">Create Project: </h1>
          <form className="main--form">
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">
                Project Name <span className="main-required">*</span>:
              </h3>
              <input type="text" id="name" className="main-input" required />
            </label>
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">Description :</h3>
              <textarea className="main-input main-textArea" />
            </label>
            <h3 className="main-h3">Assign Team :</h3>
            <div className="main-member">
              <div className="main--titelMembers">
                <h3 className="main--h3">Memebrs</h3>
              </div>

              <div className="main-memberSelect">
                <TableMember />
              </div>
            </div>
            <div className="main-submit">
              <input className="main-add" type="submit" value="Add" />
            </div>
          </form>
        </div>
      </section>
    );
  }
}
