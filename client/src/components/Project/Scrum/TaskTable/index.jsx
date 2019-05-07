import React, { Component } from 'react';
import { Table, Button, Icon, DatePicker } from 'antd';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Filter } from '../utilis/filter.js';
import axios from 'axios';
import {
  handleAddNewTask,
  handleEditTask,
  validateTask,
  deleteSwal,
  handleDeleteTask,
  confirmDelete,
} from '../utilis/helpers';
import columns from './TaskColumns';

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      html: '',
      newRow: {},
      saving: false,
      taskDescriptionErr: '',
      newTask: false,
      scrumName: '',
      error: '',
    }
    this._focused = React.createRef();
    this.validateTask = validateTask.bind(this);
    this.handleAddNewTask = handleAddNewTask.bind(this);
    this.handleEditTask = handleEditTask.bind(this);
    this.confirmDelete = confirmDelete.bind(this);
    this.deleteSwal = deleteSwal.bind(this);
    this.handleDeleteTask = handleDeleteTask.bind(this);
    this.columns = columns.bind(this);
  }

  componentDidMount() {
    const { scrumId } = this.props;
    axios
      .get(`/api/v1/scrums/${scrumId}`)
      .then(result => {
        this.setState({ tasks: result.data.data, error: '' });
      })
      .catch(error => this.setState({ error: 'Error' }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.scrumId !== this.props.scrumId) {
      const { scrumId } = this.props;
      axios.get(`/api/v1/scrums/${scrumId}`)
        .then(result => {
          this.setState({ tasks: result.data.data, error: '' })
        })
        .catch(error => this.setState({ error: 'Error' }));
    }
  }

  render() {
    const columns = this.columns();
    const { tasks } = this.state;
    columns[1].filters = Filter(tasks).actionsFilters;
    columns[2].filters = Filter(tasks).prioritiesFilters;
    columns[7].filters = Filter(tasks).statusFilters;
    columns[8].filters = Filter(tasks).assigneesFilters;
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="scrum__header">
          <Button
            icon="plus"
            className="scrum__addTask__btn"
            onClick={this.handleAddNewTask}
          >
            {' '}
            Task{' '}
          </Button>
        </div>
        <section className="scrum__page--container">
          {this.state.error ? (
            <span className="tasks__error">{this.state.error}</span>
          ) : (
              <span />
            )}
          <Table
            rowKey={record => record.id}
            dataSource={this.state.tasks}
            columns={columns}
            pagination={false}
            rowClassName="tasks__row"
            className="tasks__table"
            scroll={{ x: true }}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default TaskTable;
