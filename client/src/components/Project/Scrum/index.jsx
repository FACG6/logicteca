import React, { Component } from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import Editable from 'react-contenteditable';
import TaskTable from './TaskTable'
import axios from 'axios';

export default class Scrum extends Component {
  state = {
    scrums: [],
    error: '',
    scrumName: '',
  }

  componentDidMount() {
    const { scrumId, scrums } = this.props;
    if (!scrums.length) {
      return;
    }
    const activeScrum = scrums.find(scrum => scrum.id === Number(scrumId));
    this.setState({ scrums, scrumName: activeScrum.name });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.scrumId !== this.props.scrumId) {
      const { scrumId } = this.props;
      const { scrums } = this.state;
      const activeScrum = scrums.find(scrum => scrum.id === Number(scrumId));
      this.setState({ scrumName: activeScrum.name })
    }
  }

  //Redirect to new scrum//
  handleAddScrum = () => {
    const previousScrums = this.state.scrums;
    const lastScrumId = previousScrums.length;

    axios
      .post("/api/v1/scrums/new", {
        projectId: this.state.project.id,
        scrumName: `scrum ${lastScrumId + 1}`
      })
      .then(res => {
        const {
          data: { data }
        } = res;
        const { id, name } = data;
        this.setState(prevState => {
          return {
            scrums: prevState.scrums.concat({
              id,
              scrumName: name
            })
          };
        });
      });
  };

  //Not finished yet//
  handleDeleteScrum = scrumId => {
    const { scrums } = this.state;
    const updatedScrums = scrums.filter(scrum => scrum.id !== scrumId);
    this.setState({ scrums: updatedScrums });
    //fetch to delete the scrum from database//
  };

  handleScrumName = event => {
    const newValue = event.target.value;
    const scrumId = this.props.scrumId;
    axios.put(`/api/v1/scrums/${scrumId}`, { name: newValue })
      .then(({ data: { data } }) => {
        this.setState(prevState => {
          const clonedScrums = JSON.parse(JSON.stringify(prevState.scrums));
          const scrumIndex = clonedScrums.findIndex(
            scrum => scrum.id === Number(scrumId)
          );
          clonedScrums[scrumIndex] = data;
          return { scrums: clonedScrums, scrumName: newValue };
        })
      })
      .catch(error => this.setState({ error: 'Error' }))
  };

  render() {
    const { scrums } = this.state;
    const { projectId } = this.props;
    return (
      <section >
        <div className="project__tab-container">
          <div className="project__tab">
            {scrums.length ? (
              scrums.map(index => (
                <button
                  key={index.id}
                  id={index.id}
                  className="project__button"
                >
                  <NavLink
                    to={`/project/${projectId}/${index.id}`}
                    className="project__scrum--link"
                  >
                    {" "}
                    {index.name}
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
              id={projectId}
              className="scrums__add-icon"
              type="plus-circle"
              onClick={this.handleAddScrum}
            />
          </div>
        </div>
        <Editable
          html={this.state.scrumName || ''}
          tagName="span"
          onChange={this.handleScrumName}
          className="scrum__name"
        />
        {this.state.scrums.length ?
          <TaskTable
            projectTeam={this.props.projectTeam}
            params={this.props.match.params}
            scrumId={this.props.scrumId}
          /> : null}

      </section>
    )
  }
}

