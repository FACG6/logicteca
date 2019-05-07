import React, { Component } from 'react';
import './style.css';
import TableMember from './../../commonComponents/TableMember';
import axios from 'axios';

export default class index extends Component {
  state = {
    users: null,
    selection: {
      row: null
    },
    newProject: {
      name: '',
      dsescription: ''
    },
    error: {
      errorStatus: false,
      errorMsg: ''
    }
  };
  componentDidMount() {
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
          error: {
            errorStatus: true,
            errorMsg: 'Error loading users!!'
          }
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
    const {
      selection: { row },
      newProject: { name, dsescription }
    } = this.state;
    if (name.trim().length === 0) {
      //show error here for project name
      this.setState({
        error: {
          errorStatus: true,
          errorMsg: 'Please enter the project name'
        }
      });
    } else if (!Array.isArray(row) || row.length === 0) {
      //show error here for selection
      this.setState({
        error: {
          errorStatus: true,
          errorMsg: 'Please select at least one team member'
        }
      });
    } else {
      //fetch to add new project and redirect to projects page (/projects)
      axios
        .post('/api/v1/projects/new', {
          name,
          dsescription,
          row
        })
        .then(result => {
          result.status === 200
            ? this.props.history.push('/projects')
            : this.setState({
                error: {
                  errorStatus: true,
                  errorMsg: 'Project is not added!!'
                }
              });
        })
        .catch(e =>
          this.setState({
            error: {
              errorStatus: true,
              errorMsg: 'Server Error'
            }
          })
        );
      this.setState({
        error: {
          errorStatus: false
        }
      });
    }
  };

  render() {
    return (
      <section className="main">
        <div className="main--div">
          <h1 className="main--h1">Create Project</h1>
          <form onSubmit={this.handleSubmit} className="main--form">
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">
                Project Name <span className="main-required">*</span>
              </h3>
              <input
                name="name"
                onChange={this.handleOnChange}
                type="text"
                id="name"
                className="main-input"
              />
            </label>
            <label className="main-label" htmlFor="name">
              <h3 className="main-h3">Description</h3>
              <textarea
                name="dsescription"
                onChange={this.handleOnChange}
                className="main-input main-textArea"
              />
            </label>
            <h3 className="main-h3">
              Assign Team <span className="main-required">*</span>
            </h3>
            <div className="main-member">
              <div className="main--titelMembers">
                <h3 className="main--h3">Memebrs</h3>
              </div>
              <div className="main-memberSelect">
                {this.state.users ? (
                  <TableMember
                    member={this.state.users}
                    handleCheck={this.handleCheck}
                  />
                ) : null}
              </div>
            </div>
            <div className="main-submit">
              {this.state.error.errorStatus && (
                <span className="error">{this.state.error.errorMsg}</span>
              )}
              <input className="main-add" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </section>
    );
  }
}
