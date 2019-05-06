import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Editable from 'react-contenteditable';
import { ProjectTeam, StatusSelect, ActionTypeSelect } from '../select/index';
import { sort } from '../utilis/sort';
import { Filter } from '../utilis/filter.js';
import calculate from '../utilis/calculate';
import axios from 'axios';
import {
  handleAddNewTask,
  handleAddTask,
  handleSaveNewTask,
  handleEditTask,
  validateTask,
  deleteSwal,
  handleDeleteTask,
  confirmDelete,
  handleChangeScrum,
} from '../utilis/helpers';

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
    this.validateTask = validateTask.bind(this);
    this.handleAddNewTask = handleAddNewTask.bind(this);
    this.handleEditTask = handleEditTask.bind(this);
    this.confirmDelete = confirmDelete.bind(this);
    this.deleteSwal = deleteSwal.bind(this);
    this.handleDeleteTask = handleDeleteTask.bind(this);
    this.handlehandleSaveNewTask = handleSaveNewTask.bind(this);
    this.handleChangeScrum = handleChangeScrum.bind(this);
    this.handleAddTask = handleAddTask.bind(this);

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

  columns = [
    {
      title: 'Task',
      dataIndex: 'description',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? ' ' : value}
            onChange={event =>
              this.handleEditTask(event, record, 'description')
            }
            tagName="span"
            className="tasks__cell description"
          />
        );
      }
    },
    {
      title: 'Action Type',
      dataIndex: 'action_type',
      render: (value, record) => {
        return (
          <ActionTypeSelect
            onChange={event =>
              this.handleEditTask(event, record, 'action_type')
            }
            defaultValue={record.action_type}
          />
        );
      },
      onFilter: (value, record) => record.action_type === value
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? ' ' : value.toString()}
            onChange={event => this.handleEditTask(event, record, 'priority')}
            tagName="span"
            className="tasks__cell priority"
          />
        );
      },
      onFilter: (value, record) => record.priority === value,
      sorter: (a, b) => b.priority - a.priority
    },
    {
      title: 'Estimate Time (hr)',
      dataIndex: 'estimated_time',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? ' ' : value.toString()}
            onChange={event => this.handleEditTask(event, record, 'estimated_time')}
            tagName="span"
            className="tasks__cell estimate_time"
          />
        );
      }
    },
    {
      title: 'Spent Time (hr)',
      dataIndex: 'spent_time',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? ' ' : value.toString()}
            onChange={event => this.handleEditTask(event, record, 'spent_time')}
            tagName="span"
            className="tasks__cell spent_time"
          />
        );
      }
    },
    {
      title: 'Remaining Time (hr)',
      dataIndex: 'remaining_time',
      render: (value, record) => {
        const remaining = calculate(record.estimated_time, record.spent_time);
        return (
          <span
            className="tasks__cell remaining_time"
          >
            {remaining !== 'notvalid' ? remaining : 0}
          </span>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value, record) => {
        return (
          <StatusSelect
            onChange={event => this.handleEditTask(event, record, 'status')}
            defaultValue={record.status}
          />
        );
      },
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Assigned_to',
      dataIndex: 'assigned_to',
      render: (value, record) => {
        return (
          <ProjectTeam
            team={this.props.projectTeam}
            defaultValue={record.assigned_to}
            onChange={event => this.handleEditTask(event, record, 'assigned_to')}
          />
        );
      },
      onFilter: (value, record) => record['assigned_to'] === value,
      sorter: (a, b) => sort(a, b, 'assigned_to')
    },
    {
      title: 'Ticket',
      dataIndex: 'ticket',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? ' ' : value.toString()}
            onChange={event => this.handleEditTask(event, record, 'ticket')}
            tagName="span"
            className="tasks__cell"
          />
        );
      }
    },
    {
      render: record => {
        return (
          <Icon
            className="tasks__delete-icon"
            type="delete"
            onClick={() => this.handleDeleteTask(record.id)}
          />
        );
      }
    }
  ];

  render() {
    const columns = this.columns;
    const { tasks } = this.state;
    columns[1].filters = Filter(tasks).actionsFilters;
    columns[2].filters = Filter(tasks).prioritiesFilters;
    columns[6].filters = Filter(tasks).statusFilters;
    columns[7].filters = Filter(tasks).assigneesFilters;
    return (
      <React.Fragment>
        <NotificationContainer />
        <div className="scrum__header">
          <Editable
            html={this.state.scrumName}
            tagName="span"
            onChange={this.handleChangeScrum}
            className="scrum__name"
          />
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
            columns={columns}
            rowKey={record => record.id}
            dataSource={this.state.tasks}
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
