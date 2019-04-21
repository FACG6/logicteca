import React, { Component } from 'react';
import { Table } from 'antd';
import { Button } from "antd";
import Editable from 'react-contenteditable';
import {StatusSelect, ActionTypeSelect} from './select/index';
import { Sort } from './utilis/sort';
import { Filter } from './utilis/filter.js'
const tasks = require('./utilis/tasks');

class Scrum extends Component {
    state = {
        tasks: [],
        newTask:[],
        html: 'edit me'
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
    }

    handleChange = (event) => this.setState({html: event.target.value}) 

    render(){
      
        const columns = [
          {
            title: 'Task Name',
            dataIndex: 'task_name',
            render: (value, record) => {
              return (
                <Editable
                  html={value}
                  onChange={this.handleChange}
                  tagName="span"
                  className="tasks__cell"
                />
              );
            },
            sorter: (a, b) => Sort(a, b, 'task_name'),
            filters: Filter(this.state.tasks).namesFilters,
            onFilter: (value, record) => record['task_name'] === value
          },
          {
            title: 'Description',
            dataIndex: 'task_description',
            render: (value, record) => {
              return (
                <Editable
                  html={value}
                  onChange={this.handleChange}
                  tagName="span"
                  className="tasks__cell"
                />
              );
            },
          },
          {
            title: 'Action Type',
            dataIndex: 'action_type',
            render: (value, record) => {
              return (
                <ActionTypeSelect defaultValue={record.action_type} />
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
                  onChange={this.handleChange}
                  tagName="span"
                  className="tasks__cell"
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
                  onChange={this.handleChange}
                  tagName="span"
                  className="tasks__cell"
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
                  onChange={this.handleChange}
                  tagName="span"
                  className="tasks__cell"
                />
              );
            },
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (value, record) => {
              return (
                <StatusSelect defaultValue={record.status} />
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  tagName="span"
                  className="tasks__cell"
                />
              );
            },
          }
          ]
          return(
          <React.Fragment>
            <section>
              {/* <h2> {this.state.scrumName} </h2> */}
              <div>
                <h2> Scrum Name </h2>
                <Button type="primary" icon="plus" className="button" onClick={this.handleAddNewTask}> Task </Button>
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
