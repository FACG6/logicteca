import React, { Component } from 'react';
import TableMember from './../../commonComponents/TableMember';
import axios from 'axios';
import '../ProjectNew/style.css';

export default class index extends Component {
  state = {
    users: null,
    project: {},
    selection: {
      row: []
    },
    newProject: {
      name: '',
      description: null
    },
    error: '',
  };

  componentDidMount() {
    // fetch project information
    const { projectId } = this.props.match.params;
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then(result => {
        const {
          data: { data },
        } = result;
        if (!data.description) {
          data.description = ' ';
        }
        this.setState({
          project: data,
          newProject: {
            name: data.name,
            description: data.description
          }
        });
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({
              error: error.response.message,
          })
        } else {
          this.setState({
              error: 'ERROR'
          })
        }
      });

    //fetch all users
    axios
      .get('/api/v1/users')
      .then(result => {
        const {
          data: { data },
          status
        } = result;
        if (status === 200) {
          this.setState({ users: data });
        }
      })
      .catch(e =>
        this.setState({
            error: 'ERROR'
        })
      );
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
    let {
      selection: { row },
      newProject: { name, dsescription }
    } = this.state;
    if (!dsescription) {
      dsescription = ' ';
    }
    if (name.trim().length === 0) {
      //show error here for project name
      this.setState({
        error: 'Please enter the project name'
      });
    } else if (!Array.isArray(row) || row.length === 0) {
      //show error here for selection
      this.setState({
          error: 'Please select at least one team member'
      });
    } else {
      //fetch to edit project and redirect to projects page (/projects)
      const { projectId } = this.props.match.params;
      axios
        .put(`/api/v1/projects/${projectId}`, {
          name,
          dsescription,
          row
        })
        .then(result => {
          const { status } = result;
          if (status === 200) {
            this.props.history.push('/projects');
          }
        })
        .catch(e =>
          this.setState({
              error: 'ERROR'
          })
        );
    }
  };

  render() {
    const projectId = this.props.match.params.projectId;
    return (
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
                  name="dsescription"
                  onChange={this.handleOnChange}
                  className="main-input main-textArea"
                  defaultValue={this.state.project.description}
                />
              )}
            </label>
            <h3 className="main-h3">
              Assign Team <span className="main-required">*</span>
            </h3>
            <div className="main-member">
              <div className="main--titelMembers">
                <h3 className="main--h3">Memebrs</h3>
              </div>
              <div className="main-memberSelect">
                {this.state.project &&
                  this.state.project.userNames &&
                  this.state.users && (
                    <TableMember
                      projectId={projectId}
                      handleCheck={this.handleCheck}
                      teamMember={this.state.project.userNames}
                      member={this.state.users}
                    />
                  )}
              </div>
            </div>
            <div className="main-submit">
              {this.state.error && (
                <span className="error">{this.state.error}</span>
              )}
              <input className="main-add" type="submit" value="Save" />
            </div>
          </form>
        </div>
      </section>
    );
  }
}
