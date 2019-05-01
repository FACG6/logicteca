import React, { Component } from "react";
import "./../ProjectNew/style.css";
import TableMember from "./../../commonComponents/TableMember";

export default class index extends Component {
  state = {
    loading: true,
    project: [],
    selection: {
      row: []
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

  componentDidMount() {
    // fetch project information by take project id from this.props.match.projectId
    const projectId = this.props.match.params.projectId;
    if (Number.isInteger(parseInt(projectId))) {
      const projectInf = require("./../../commonComponents/TableMember/projects.json")[0];
      this.setState({
        loading: false,
        project: projectInf,
        newProject: {
          name: projectInf.name,
          dsescription: projectInf.dsescription
        }
      });
    } else {
      this.props.history.push('/projects')
    }
  }
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
      selection: { row },
      newProject: { name }
    } = this.state;
    if (name.trim().length === 0) {
      //show error here for project name
      this.setState({
        error: {
          errorStatus: true,
          errorMsg: "Please enter the project name"
        }
      });
    } else if (!Array.isArray(row) || row.length === 0) {
      //show error here for selection
      this.setState({
        error: {
          errorStatus: true,
          errorMsg: "Please select at least one team member"
        }
      });
    } else {
      //fetch to edit project and redirect to projects page (/projects)
      this.setState({
        error: {
          errorStatus: false
        }
      });
    }
  };

  render() {
    const { loading } = this.state
    return (loading ? <h1>loading ...</h1> :
      <section className="main">
        <div className="main--div">
          <h1 className="main--h1">Edit Project</h1>
          <form onSubmit={this.handleSubmit} className="main--form">
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">
                Project Name <span className="main-required">*</span>
              </h3>
              {this.state.project.name && (
                <input
                  name="name"
                  onChange={this.handleOnChange}
                  type="text"
                  id="name"
                  className="main-input"
                  defaultValue={this.state.project.name}
                />
              )}
            </label>
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">Description</h3>
              {this.state.project.description && (
                <textarea
                  name="description"
                  onChange={this.handleOnChange}
                  className="main-input main-textArea"
                  defaultValue={this.state.project.description}
                />
              )}
            </label>
            <h3 className="main-h3">Assign Team <span className="main-required">*</span></h3>
            <div className="main-member">
              <div className="main--titelMembers">
                <h3 className="main--h3">Memebrs</h3>
              </div>
              <div className="main-memberSelect">
                {this.state.project.teamMember && (
                  <TableMember
                    handleCheck={this.handleCheck}
                    teamMember={this.state.project.teamMember}
                    member={require("./../../commonComponents/TableMember/member.json")}
                  />
                )}
              </div>
            </div>
            <div className="main-submit">
              {this.state.error.errorStatus && (
                <span className="error">{this.state.error.errorMsg}</span>
              )}
              <input className="main-add" type="submit" value="Save" />
            </div>
          </form>
        </div>
      </section>
    );
  }
}
