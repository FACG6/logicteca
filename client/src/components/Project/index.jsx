import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import Scrum from './Scrums/index';
import './style.css';
import axios from 'axios';

class Scrums extends Component {
  state = {
    project: {
      id: '',
      projectName: ''
    },
    scrums: [],
    scrumName: '',
    error: {
      status: false,
      msg: ''
    }
  };

  componentDidMount() {
    // fetch project data
    const { projectId } = this.props.match.params;
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then(result => {
        const {
          data: { data },
          status
        } = result;
        if (status === 200) {
          const project = {
            id: data.id,
            projectName: data.name
          };
          this.setState({ project });
        }
      })
      .catch(e => {
        this.setState({
          error: {
            status: true,
            msg: 'Error loading scrums !!!'
          }
        });
      });

    //fetch scrums
    axios
      .get(`/api/v1/projects/${projectId}/scrums`)
      .then(result => {
        const {
          data: { data },
          status
        } = result;
        if (status === 200) {
          this.setState({ scrums: data });
        }
      })
      .catch(e => {
        this.setState({
          error: {
            status: true,
            msg: 'Error loading scrums !!!'
          }
        });
      });
  }

  handleAddScrum = () => {
    this.setState(prevState => {
      const previousScrums = prevState.scrums;
      if (!previousScrums.length) {
        return {
          scrums: previousScrums.concat({
            id: 1,
            scrumName: `scrum 1`
          })
        };
      } else {
        const lastScrumId = previousScrums[previousScrums.length - 1].id;
        return {
          scrums: previousScrums.concat({
            id: lastScrumId + 1,
            scrumName: `scrum ${lastScrumId + 1}`
          })
        };
      }
    });
  };

  handleDeleteScrum = scrumId => {
    const { scrums } = this.state;
    const updatedScrums = scrums.filter(scrum => scrum.id !== scrumId);
    this.setState({ scrums: updatedScrums });
    //fetch to delete the scrum from database//
  };

  handleScrumName = scrumNewName => {
    const scrumValue = scrumNewName;
    const scrumId = this.props.match.params.scrumId;
    this.setState(prevState => {
      const updatedScrums = [...prevState.scrums];
      const scrumIndex = updatedScrums.findIndex(
        scrum => scrum.id === Number(scrumId)
      );
      updatedScrums[scrumIndex]['scrumName'] = scrumValue;
      return { scrums: updatedScrums };
      //Fetch//
    });
  };

  render() {
    const { projectId, scrumId } = this.props.match.params;
    const { project, scrums } = this.state;
    return (
      <React.Fragment>
        <section className="project__page--container">
          <div className="Project__header">
            <h2 className="Project__name"> {project.projectName} </h2>
          </div>
          <div className="project__tab-container">
            <div className="Project__tab">
              {scrums.length !== 0 ? (
                scrums.map(index => (
                  <button key={index.id} className="Project__button">
                    <NavLink
                      to={`/project/${projectId}/${index.id}`}
                      className="Project__scrum--link"
                    >
                      {' '}
                      {index.scrumName}
                    </NavLink>
                    <Icon
                      onClick={() => this.handleDeleteScrum(index.id)}
                      type="close"
                      className="scrums__close-icon"
                    />
                  </button>
                ))
              ) : (
                <button />
              )}
              <Icon
                className="scrums__add-icon"
                type="plus-circle"
                onClick={this.handleAddScrum}
              />
            </div>
          </div>
          <Scrum
            scrumName={this.handleScrumName}
            params={this.props.match.params}
            scrumId={scrumId}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default Scrums;
