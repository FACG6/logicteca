import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import Swal from 'sweetalert2';
import {
  NotificationContainer,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import createNotification from '../../Users/notification/index';
import Editable from 'react-contenteditable';
import { ProjectTeam, StatusSelect, ActionTypeSelect } from './select/index';
import { Sort } from './utilis/sort';
import { Filter } from './utilis/filter.js'
import calculate from './utilis/calculate';

class Scrum extends Component {
  state = {
    tasks: [],
    html: '',
    newRow: {},
    saving: false,
    taskDescriptionErr: '',
    newTask: false,
    scrumName: '',
    projectTeam: [],
  }

  componentDidMount() {
    const { scrumId } = this.props;
    const scrums = require('./utilis/scrums.json');
    const projectTeam = [{ id: 1, name: 'Ahmed' }, { id: 2, name: 'Ameen' }, { id: 3, name: 'Angham' }, { id: 4, name: 'Ayman' }];
    const scrumObject = scrums.find(scrum => scrum.id === Number(scrumId));
    const scrumName = scrumObject.scrumName;
    //Fetch to get the scrum name and its task //
    this.setState({ projectTeam, scrumName, tasks: require('./utilis/tasks') })
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.scrumId !== this.props.scrumId) {
      const { scrumId } = this.props;
      const scrums = require('./utilis/scrums.json');
      const scrumObject = scrums.find(scrum => scrum.id === Number(scrumId));
      const scrumName = scrumObject.scrumName;
      //Fetch to get the scrum name and its task //
      this.setState({ scrumName, tasks: require('./utilis/tasks') })
    }
  }

  handleAddNewTask = () => {
    if (this.state.newTask) {
      createNotification('task exist');
      return;
    }
    if (this.state.tasks.length) {
      this.setState(prevState => {
        const newTask = [...prevState.tasks, {
          id: '1',
          task_name: '',
          task_description: '',
          action_type: 'testing',
          priority: '',
          est_time: '',
          remaining_time: '',
          status: 'in progress',
          assignee: '',
          ticket: '',
          scrumName: '',
        }];
        return { tasks: newTask, newTask: true }
      });
      return;
    }
    this.setState(prevState => {
      const newTask = [...prevState.tasks, {
        id: this.state.tasks.length + 1,
        task_name: '',
        task_description: '',
        action_type: 'testing',
        priority: '',
        est_time: '',
        remaining_time: '',
        status: 'in progress',
        assignee: '',
        ticket: '',
        scrumName: '',
      }];
      return { tasks: newTask, newTask: true }
    });
  };

  handleAddTask = (event, column) => {
    const newTask = event.target.value;
    this.setState(prevState => {
      const clonedTasks = [...prevState.tasks];
      clonedTasks[clonedTasks.length - 1][column] = newTask;
      return { saving: true, tasks: clonedTasks, newRow: clonedTasks[clonedTasks.length - 1] };
    });
  };

  handleSaveNewTask = (event) => {
    const { newRow } = this.state;
    const {
      task_description,
      action_type,
      assignee,
      ticket,
      status,
      spent_time,
      priority,
      est_time,
    } = this.state.newRow;

    if (this.validateTask(newRow)) {
      const addedTask = {
        task_description,
        action_type,
        status,
        priority,
        assigned_to: assignee,
        estimate_time: est_time,
        spent_time,
        ticket,
      }
      //Fetch
      this.setState({ newTask: false, error: false, saving: false });
      createNotification('success')
    }
  }

  handleEditTask = (event, record, column) => {
    const { tasks } = this.state;

    //Add a new task
    if (this.state.newTask || record.id === tasks[tasks.length - 1].id) {
      return this.handleAddTask(event, column);
    }

    //Edit Task
    const newTask = event.target.value;
    const taskId = record.id;
    const clonedTasks = [...tasks];
    const updateTask = clonedTasks.find(task => task.id === taskId);
    updateTask[column] = newTask;

    //No Validate this momemnt, will be edited later.
    this.updateTasks(clonedTasks);
  };

  updateTasks = tasks => {
    this.setState({ tasks });
  };

  validateTask = task => {
    this.setState({ taskDescriptionErr: '' });
    if (!task['task_description']) {
      this.setState({ error: "Task description can't be blank" });
      return false;
    }
    if (task.priority && !/\d/.test(task.priority)) {
      this.setState({ error: "Priority should be a number" });
      return false;
    }
    if (task.est_time && !/\d/.test(task.est_time)) {
      this.setState({ error: "Estimate time should be numbers" });
      return false;
    }
    if (task.spent_time && !/\d/.test(task.spent_time)) {
      this.setState({ error: "Spent time should be numbers" });
      return false;
    }
    return true;
  }

  handleDeleteTask = (id) => {
    const { tasks } = this.state;
    const { scrumId, projectId } = this.props.params;
    const deletedTask = tasks.find(task => task.id === id);
    const taskId = deletedTask.id;
    this.deleteSwal().then(response => {
      if (response.value) this.confirmDelete(taskId, Number(scrumId), Number(projectId));
    })
  };

  deleteSwal = () => {
    return Swal.fire({
      type: 'warning',
      text: 'Are you sure to delete this task?',
      showConfirmButton: true,
      showCancelButton: true,
      className: 'deletTaskSwal'
    })
  };

  confirmDelete = (taskId, scrumId, projectId) => {
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex(task => task.id === Number(taskId));
    tasks.splice(taskIndex, 1);
    this.setState({ tasks })
    //Fetch to delete task
  }

  handleChangeScrum = (event) => {
    const scrumNewName = event.target.value;
    this.setState({ scrumName: scrumNewName });
    this.props.scrumName(scrumNewName);
  }

  columns = [
    {
      title: 'Task',
      dataIndex: 'task_description',
      render: (value, record) => {
        return (
          <Editable
            html={value}
            onChange={event => this.handleEditTask(event, record, 'task_description')}
            tagName="span"
            className="tasks__cell description"
          />
        );
      },
    },
    {
      title: 'Action Type',
      dataIndex: 'action_type',
      render: (value, record) => {
        return (
          <ActionTypeSelect onChange={event => this.handleEditTask(event, record, 'action_type')} defaultValue={record.action_type} />
        );
      },
      onFilter: (value, record) => record['action_type'] === value
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (value, record) => {
        return (
          <Editable
            html={value}
            onChange={event => this.handleEditTask(event, record, 'priority')}
            tagName="span"
            className="tasks__cell priority"
          />
        );
      },
      onFilter: (value, record) => record['priority'] === value,
      sorter: (a, b) => b.priority - a.priority
    },
    {
      title: 'Estimate Time (hr)',
      dataIndex: 'est_time',
      render: (value, record) => {
        return (
          <Editable
            html={value}
            onChange={event => this.handleEditTask(event, record, 'est_time')}
            tagName="span"
            className="tasks__cell estimate_time"
          />
        );
      },
    },
    {
      title: 'Spent Time (hr)',
      dataIndex: 'spent_time',
      render: (value, record) => {
        return (
          <Editable
            html={value ? value : ''}
            onChange={event => this.handleEditTask(event, record, 'spent_time')}
            tagName="span"
            className="tasks__cell spent_time"
          />
        );
      },
    },
    {
      title: 'Remaining Time (hr)',
      dataIndex: 'remaining_time',
      render: (value, record) => {
        const remaining = calculate(record['est_time'], record['spent_time']);
        return (
          <span className="tasks__cell remaining_time" onChange={event => this.handleEditTask(event, record, 'remaining_time')}>{remaining !== 'notvalid' ? remaining : 0}</span>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value, record) => {
        return (
          <StatusSelect onChange={event => this.handleEditTask(event, record, 'status')} defaultValue={record.status} />
        );
      },
      onFilter: (value, record) => record['status'] === value
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      render: (value, record) => {
        return (
          <ProjectTeam team={this.state.projectTeam} defaultValue={this.state.projectTeam[0].name} onChange={event => this.handleEditTask(event, record, 'assignee')} />
        );
      },
      onFilter: (value, record) => record['assignee'] === value,
      sorter: (a, b) => Sort(a, b, 'assignee'),
    },
    {
      title: 'Ticket',
      dataIndex: 'ticket',
      render: (value, record) => {
        return (
          <Editable
            html={value}
            onChange={event => this.handleEditTask(event, record, 'ticket')}
            tagName="span"
            className="tasks__cell"
          />
        );
      },
    },
    {
      render: record => {
        return (
          <span className='tasks__delete-span'>
            <Icon className='tasks__delete-icon' type="delete" onClick={() => this.handleDeleteTask(record.id)} />
            <button onClick={this.handleSaveNewTask} className={
              this.state.newTask && record.id === this.state.tasks[this.state.tasks.length - 1].id && this.state.saving ? 'tasks__save-btn' : 'tasks__save-btn hidden'
            }>Save</button>
          </span>
        );
      },
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
        <div className='scrum__header'>
          <Editable
            html={this.state.scrumName}
            tagName='span'
            onChange={this.handleChangeScrum}
            className='scrum__name'
          />
          <Button icon="plus" className="scrum__addTask__btn" onClick={this.handleAddNewTask}> Task </Button>
        </div>
        <section className='scrum__page--container'>
          {this.state.error ? <span className='tasks__error'>{this.state.error}</span> : <span></span>}
          <Table columns={columns}
            rowKey={record => record.id}
            dataSource={this.state.tasks}
            pagination={false}
            rowClassName="tasks__row"
            className="tasks__table"
            scroll={{ x: true }}
          />
        </section>
      </React.Fragment>
    )
  }
}

export default Scrum;
