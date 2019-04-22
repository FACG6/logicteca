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
    }

    componentDidMount() {
        this.setState({tasks: tasks})
    }

    handleAddNewTask = () => {
      return (
          this.setState({
          tasks: [...tasks, { 
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
          }],
        })
      )
    };

    handleAddTask = (event, column) => {
      const newTask = event.target.value;
      this.setState(prevState => {
        const clonedTasks = JSON.parse(JSON.stringify(prevState.tasks));
        clonedTasks[clonedTasks.length - 1][column] = newTask;
        return { tasks: clonedTasks, newRow: clonedTasks[clonedTasks.length - 1] };
      });
    };

    handleEditTask = (event, record, column) => {
      const { tasks } = this.state;

      //Add a new task
      if (record.id === tasks[tasks.length - 1].id) {
        this.setState({ saving: true, saved: false })
        return this.handleAddTask(event, column);
      }

      //Edit Task
      const newTask = event.target.value;
      const taskId = record.id;
      const clonedTasks = JSON.parse(JSON.stringify(tasks));
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
        return false;
      }
    }

    handleDeleteTask = (event) => {
      const { tasks, rowSelected } = this.state;
      const deletedTask = tasks.filter(task => task.id === rowSelected)[0];
      this.deleteSwal(deletedTask);
    }

    deleteSwal = () => {
      return Swal.fire({
        type: 'warning',
        text: 'Are you sure to delete this task?',
        showConfirmButton: true,
        showCancelButton: true,
        className:'deletTaskSwal'
      })
    }

    render(){
      const columns = [
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
            filters: Filter(this.state.tasks).actionsFilters,
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
            filters: Filter(this.state.tasks).prioritiesFilters,
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
            filters: Filter(this.state.tasks).statusFilters,
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
            filters: Filter(this.state.tasks).assigneesFilters,
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
            render: () => {
              return (
                  <Icon type="delete" onClick={this.handleDeleteTask}/>
              );
            },
          }
          ]
          return(
          <React.Fragment>
            <section className='Scrum__page--container'>
              {/* <h2> {this.state.scrumName} </h2> */}
              <div className='Scrum__header'>
                <h2 className='Scrum__name'> Scrum Name </h2>
                <Button type="primary" icon="plus" className="Scrum__addTask__btn" onClick={this.handleAddNewTask}> Task </Button>
              </div>
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
