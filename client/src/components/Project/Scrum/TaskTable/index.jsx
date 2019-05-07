import React, { Component } from 'react';
import { Table, Button, Icon, DatePicker } from 'antd';
import Swal from 'sweetalert2';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import createNotification from '../../../Users/notification/index';
import Editable from 'react-contenteditable';
import { ProjectTeam, StatusSelect, ActionTypeSelect } from '../select/index';
import { Sort } from '../utilis/sort';
import { Filter } from '../utilis/filter.js';
import calculate from '../utilis/calculate';
import axios from 'axios';
import moment from 'moment'

const dateFormat = 'YYYY-MM-DD';

class TaskTable extends Component {
  state = {
    tasks: [],
    html: '',
    newRow: {},
    saving: false,
    newTask: false,
    scrumName: '',
    error: ''
  };

  componentDidMount() {
    const { scrumId } = this.props;
    axios
      .get(`/api/v1/scrums/${scrumId}`)
      .then(result => {
        this.setState({ tasks: result.data.data, error: '' });
      })
      .catch(error => this.setState({ error: 'Error' }));
  }

  handleAddNewTask = () => {
    if (this.state.newTask) {
      createNotification('task exist');
      return;
    }
    this.setState(prevState => {
      const newTask = [
        ...prevState.tasks,
        {
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
          scrumName: ''
        }
      ];
      return { tasks: newTask, newTask: true };
    });
  };

  handleAddTask = (event, column) => {
    const newTask = event.target.value;
    this.setState(prevState => {
      const clonedTasks = [...prevState.tasks];
      clonedTasks[clonedTasks.length - 1][column] = newTask;
      return {
        saving: true,
        tasks: clonedTasks,
        newRow: clonedTasks[clonedTasks.length - 1]
      };
    });
  };

  handleSaveNewTask = event => {
    const { newRow } = this.state;
    const { scrumId } = this.props;
    const {
      description: task_description,
      action_type,
      assigned_to: assignee,
      ticket,
      status,
      spent_time,
      priority,
      est_time
    } = this.state.newRow;

    if (this.validateTask(newRow)) {
      // console.log(this.props.scrumId, 55555);

      const addedTask = {
        action_type,
        status,
        task_description,
        priority,
        assigned_to: assignee,
        estimate_time: est_time,
        spent_time,
        ticket,
        scrum_id: this.props.scrumId
      };
      //Fetch
      axios
        .post('/api/v1/tasks/new', {
          addedTask
        })
        .then(result => {
          const {
            data: { data },
            status
          } = result;
          if (status === 200) {
            const newData = [...this.state.tasks];
            newData.push(data);
            this.setState({ tasks: newData });
          }
        })
        .catch(e => this.setState({ error: 'Task is not Added!!' }));
      this.setState({ newTask: false, error: false, saving: false });
      createNotification('success');
    }
  };

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
    if (task.priority && isNaN(task.priority)) {
      this.setState({ error: 'Priority should be a number' });
      return false;
    }
    if (task.est_time && isNaN(task.est_time)) {
      this.setState({ error: 'Estimate time should be numbers' });
      return false;
    }
    if (task.spent_time && isNaN(task.spent_time)) {
      this.setState({ error: 'Spent time should be numbers' });
      return false;
    }
    return true;
  };

  handleDeleteTask = id => {
    const { tasks } = this.state;
    const { scrumId, projectId } = this.props.params;
    const deletedTask = tasks.find(task => task.id === id);
    const taskId = deletedTask.id;
    this.deleteSwal().then(response => {
      if (response.value)
        this.confirmDelete(taskId, Number(scrumId), Number(projectId));
    });
  };

  deleteSwal = () => {
    return Swal.fire({
      type: 'warning',
      text: 'Are you sure to delete this task?',
      showConfirmButton: true,
      showCancelButton: true,
      className: 'deletTaskSwal'
    });
  };

  confirmDelete = (taskId, scrumId, projectId) => {
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex(task => task.id === Number(taskId));
    tasks.splice(taskIndex, 1);
    this.setState({ tasks });
    //Fetch to delete task
    axios
      .delete(`/api/v1/tasks/${taskId}`)
      .then(res => {
        if (res.status === 200) {
          Swal.fire('Deleted!', `Your task has been deleted.`, 'success');
        }
      })
      .catch(e => this.setState({ error: 'Task is not Deleted!!' }));
  };

  handleChangeScrum = event => {
    const scrumNewName = event.target.value;
    this.setState({ scrumName: scrumNewName });
    this.props.scrumName(scrumNewName);
  };

  columns = [
    {
      title: 'Task',
      dataIndex: 'description',
      render: (value, record) => {
        return (
          <Editable
            html={value}
            onChange={event =>
              this.handleEditTask(event, record, 'task_description')
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
      onFilter: (value, record) => record['action_type'] === value
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? '' : value}
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
            html={!value ? '' : value}
            onChange={event => this.handleEditTask(event, record, 'est_time')}
            tagName="span"
            className="tasks__cell estimate_time"
          />
        );
      }
    },
    {
      title: 'Modules',
      dataIndex: 'modules',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? '' : value}
            onChange={event => this.handleEditTask(event, record, 'modules')}
            tagName="span"
            className="tasks__cell modules"
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
            html={value ? value : ''}
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
        const remaining = calculate(record['est_time'], record['spent_time']);
        return (
          <span
            className="tasks__cell remaining_time"
            onChange={event =>
              this.handleEditTask(event, record, 'remaining_time')
            }
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
      onFilter: (value, record) => record['status'] === value
    },
    {
      title: 'Assigned_to',
      dataIndex: 'assigned_to',
      render: (value, record) => {
        return (
          <ProjectTeam
            team={this.props.projectTeam}
            defaultValue={value}
            onChange={event =>
              this.handleEditTask(event, record, 'assigned_to')
            }
          />
        );
      },
      onFilter: (value, record) => record['assigned_to'] === value,
      sorter: (a, b) => Sort(a, b, 'assigned_to')
    },
    {
      title: 'Initial test status',
      dataIndex: 'initial_test_status',
      render: (value, record) => {
        return (
          <Editable
            html={value ? value : ''}
            onChange={event => this.handleEditTask(event, record, 'initial_test_status')}
            tagName="span"
            className="tasks__cell initial_test_status"
          />
        );
      }
    },
    {
      title: 'Date to commit',
      dataIndex: 'date_to_commit',
      render: (value, record) => {
        return (
          <DatePicker defaultValue={moment(Date.now().split('T')[0], dateFormat)} />
        );
      }
    },
    {
      title: 'Review and test note',
      dataIndex: 'review_and_test_note',
      render: (value, record) => {
        return (
          <Editable
            html={value ? value : ''}
            onChange={event => this.handleEditTask(event, record, 'review_and_test_note')}
            tagName="span"
            className="tasks__cell"
          />
        );
      }
    },
    {
      title: 'Ticket',
      dataIndex: 'ticket',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? '' : value}
            onChange={event => this.handleEditTask(event, record, 'ticket')}
            tagName="span"
            className="tasks__cell"
          />
        );
      }
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? '' : value}
            onChange={event => this.handleEditTask(event, record, 'notes')}
            tagName="span"
            className="tasks__cell notes"
          />
        );
      }
    },
    {
      title: 'Total Efforts',
      dataIndex: 'total_efforts',
      render: (value, record) => {
        return (
          <Editable
            html={!value ? '' : value}
            onChange={event => this.handleEditTask(event, record, 'total_efforts')}
            tagName="span"
            className="tasks__cell total_efforts"
          />
        );
      }
    },
    {
      render: record => {
        return (
          <span className="tasks__delete-span">
            <Icon
              className="tasks__delete-icon"
              type="delete"
              onClick={() => this.handleDeleteTask(record.id)}
            />
            <button
              onClick={this.handleSaveNewTask}
              className={
                this.state.newTask &&
                record.id ===
                  this.state.tasks[this.state.tasks.length - 1].id &&
                this.state.saving
                  ? 'tasks__save-btn'
                  : 'tasks__save-btn hidden'
              }
            >
              Save
            </button>
          </span>
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
