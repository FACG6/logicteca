import React, { Component } from "react";
import "./style.css";
import TableMember from "./TableMember";

export default class index extends Component {
  state = {
    selection: {
      rowKey: null,
      row: null
    },
    newProject: {
      name: "",
      dsescription: ""
    },
    error: {
      errorStatus: false,
      errorMsg: ""
    }
  };
  handleOnChange = e => {
    const targetValue = e.target.value;
    const inputName = e.target.name;
    this.setState(prevState => {
      const updatedState = { ...prevState.newProject };
      updatedState[inputName] = targetValue;
      return { newProject: updatedState };
    });
  };

  handleCheck = objSelection => {
    this.setState({ selection: objSelection });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      selection: { rowKey, row },
      newProject: { name }
    } = this.state;
    if (!Array.isArray(rowKey) || !Array.isArray(row)) {
      //show error here for selection
      this.setState({error:{errorStatus:true,errorMsg:"please "}})
    } else if (name.trim().length === 0) {
      //show error here for project name
    } else {
      //show error here
    }
  };

  render() {
    console.log(this.state.selection);
    return (
      <section className="main">
        <div className="main--div">
          <h1 className="main--h1">Create Project: </h1>
          <form onSubmit={this.handleSubmit} className="main--form">
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">
                Project Name <span className="main-required">*</span>:
              </h3>
              <input
                name="name"
                onChange={this.handleOnChange}
                type="text"
                id="name"
                className="main-input"
                required
              />
            </label>
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">Description :</h3>
              <textarea
                name="dsescription"
                onChange={this.handleOnChange}
                className="main-input main-textArea"
              />
            </label>
            <h3 className="main-h3">Assign Team :</h3>
            <div className="main-member">
              <div className="main--titelMembers">
                <h3 className="main--h3">Memebrs</h3>
              </div>
              <div className="main-memberSelect">
                <TableMember handleCheck={this.handleCheck} />
              </div>
            </div>
            {this.state.error.errorStatus && (
              <span className="error">{this.state.error.errorMsg}</span>
            )}
            <div className="main-submit">
              <input className="main-add" type="submit" value="Add" />
            </div>
          </form>
        </div>
      </section>
    );
  }
}
