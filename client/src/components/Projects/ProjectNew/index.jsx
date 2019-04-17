import React, { Component } from "react";
import "./style.css";

export default class index extends Component {
  state = {
    members: require("./member.json")
  };

  handleCheck = e => {
    const rightCheck = e.target
      .closest(".main--label")
      .querySelector(".check-right");
    rightCheck.classList.toggle("hidden");
  };
  render() {
    const { members } = this.state;
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
                {members.map(member => (
                  <label className="main--label" key={member.id}>
                    <span className="check-border">
                      <span className="check-right hidden"> &#10004;</span>
                    </span>
                    <input
                      onClick={this.handleCheck}
                      style={{ display: "none" }}
                      type="checkbox"
                      name={member.name}
                      value={member.name}
                      required
                    />{" "}
                    {member.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="main-input">
              <input type="submit" />
              <input type="submit" />
            </div>
          </form>
        </div>
      </section>
    );
  }
}
