import React from 'react';
import Editable from 'react-contenteditable';
import { ProjectTeam, StatusSelect, ActionTypeSelect } from '../select/index';
import { Icon, DatePicker } from 'antd';
import sort from '../utilis/sort';
import moment from 'moment';
import calculate from '../utilis/calculate';


function columns() {
  return [
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
          <DatePicker defaultValue={moment()} />
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
            html={!value ? ' ' : value.toString()}
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
            html={!value ? '' : value.toString()}
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
          <Icon
            className="tasks__delete-icon"
            type="delete"
            onClick={() => this.handleDeleteTask(record.id)}
          />
        );
      }
    }
  ];
}

export default columns;