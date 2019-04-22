import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import Swal from 'sweetalert2';
import Editable from 'react-contenteditable';
import {StatusSelect, ActionTypeSelect} from './select/index';
import { Sort } from './utilis/sort';
import { Filter } from './utilis/filter.js'
const tasks = require('./utilis/tasks');

class Scrum extends Component {
  state = {
    tasks: [],
    html: '',
    newRow: {},
    saving: false,
    saved: false,
    taskDescriptionErr: false,
    rowSelected: null,
    newTask: false,
  }

  componentDidMount() {
    this.setState({tasks: tasks});
  }

  handleAddNewTask = () => {
    this.setState( prevState => {
      const newTask = [...prevState.tasks, {
        id: tasks.length + 1, 
        task_name: '', 
        task_description: '', 
        action_type: 'testing' ,
        priority:'',
        est_time:'',
        remaining_time:'',
        status:'in progress',
        assignee:'',
        ticket:''
      }];
      return { tasks: newTask, newTask: true }
    });
  };

  handleAddTask = (event, column) => {
    const newTask = event.target.value;
    this.setState(prevState => {
      const clonedTasks = [...tasks];
      clonedTasks[clonedTasks.length - 1][column] = newTask;
      return { tasks: clonedTasks, newRow: clonedTasks[clonedTasks.length - 1] };
    });
  };

  handleEditTask = (event, record, column) => {
    const { tasks } = this.state;

    //Add a new task
    if (this.state.newTask || record.id === tasks[tasks.length - 1].id) {
      this.setState({ saving: true, saved: false });
      return this.handleAddTask(event, column);
    }

     //Edit Task
    const newTask = event.target.value;
    const taskId = record.id;
    const clonedTasks = [...tasks];
    const updateTask = clonedTasks.find(task => task.id === taskId);
    updateTask[column] = newTask;
    
    //Validate
    if (this.validateTask(updateTask)) {
      this.updateTasks(updateTask, clonedTasks);
    }
  };

  updateTasks = (task, tasks) => {
    this.setState({ tasks, saved: true });
  };

  validateTask = (task) => {
    this.setState({ taskDescriptionErr: false });
    if (task['task_description'].length < 1) {
      this.setState({ taskDescriptionErr: true });
    }
  };

  handleDeleteTask = (event) => {
    const { tasks, rowSelected } = this.state;
    const deletedTask = tasks.filter(task => task.id === rowSelected);
    this.deleteSwal(deletedTask);
    //fetch witth deletedTask
  };

  deleteSwal = () => {
    return Swal.fire({
      type: 'warning',
      text: 'Are you sure to delete this task?',
      showConfirmButton: true,
      showCancelButton: true,
      className:'deletTaskSwal'
    })
  };

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
      onFilter: (value, record) => record['priority'] === value
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
      title: 'Remaining Time (hr)',
      dataIndex: 'remaining_time',
      render: (value, record) => {
        return (
          <Editable
            html={value}
            onChange={event => this.handleEditTask(event, record, 'remaining_time')}
            tagName="span"
            className="tasks__cell remaining_time"
          />
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
          <Editable
            html={value}
            onChange={event => this.handleEditTask(event, record, 'assignee')}
            tagName="span"
            className="tasks__cell"
          />
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
        <Icon type="delete" onClick={this.handleDeleteTask}/>
        );
      },
    }
  ];
  render(){
    const columns = this.columns;
    const { tasks } = this.state;
    columns[1].filters = Filter(tasks).actionsFilters; 
    columns[2].filters = Filter(tasks).prioritiesFilters;
    columns[5].filters = Filter(tasks).statusFilters;
    columns[6].filters = Filter(tasks).assigneesFilters;
    if (this.state.saved) {
      setTimeout(() => {
        this.setState({ saved: false})
      }, 4000);
    }
    return(
      <React.Fragment>
        <section className='Scrum__page--container'>
        <div className='Scrum__header'>
          <Button type="primary" icon="plus" className="Scrum__addTask__btn" onClick={this.handleAddNewTask}> Task </Button>
        </div>
        {/* notification */}
        {/* {this.state.taskDescriptionErr ? <li>error, description should be at least 1 char</li> : <li>saved</li> } */}
        <Table columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.tasks}
          pagination={false}
          rowClassName="tasks__row"
          className="tasks__table"
        />
        </section>
      </React.Fragment>
    )
  }
}

export default Scrum;
