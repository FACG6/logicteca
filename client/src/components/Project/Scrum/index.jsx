import React, { Component } from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import Editable from 'react-contenteditable';
import TaskTable from './TaskTable';
import {
  handleAddScrum,
  deleteSwal,
  handleDeleteTask,
  confirmDelete,
  handleScrumName,
} from './utilis/scrumHelpers';

export default class Scrum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrums: [],
      error: '',
      scrumName: ''
    };
    this.handleAddScrum = handleAddScrum.bind(this);
    this.deleteSwal = deleteSwal.bind(this);
    this.handleDeleteTask = handleDeleteTask.bind(this);
    this.confirmDelete = confirmDelete.bind(this);
    this.handleScrumName = handleScrumName.bind(this);
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
      if (activeScrum) {
        this.setState({ scrumName: activeScrum.name });
      } else {
        this.setState({ scrumName: '' });
      }
    }
  }

  render() {
    const { scrums } = this.state;
    const { projectId } = this.props;
    return (
      <section>
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
                    {' '}
                    {index.name}
                  </NavLink>
                  <Icon
                    onClick={() => this.handleDeleteTask(index.id)}
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
        {this.state.scrumName ? (
          <Editable
            html={this.state.scrumName}
            tagName="span"
            onChange={this.handleScrumName}
            className="scrum__name"
          />
        ) : null}
        {this.state.scrums.length ? (
          <TaskTable
            projectTeam={this.props.projectTeam}
            params={this.props.match.params}
            scrumId={this.props.scrumId}
          />
        ) : null}
      </section>
    );
  }
}
