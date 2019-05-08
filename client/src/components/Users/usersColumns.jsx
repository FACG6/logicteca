import React from 'react';
import Editable from 'react-contenteditable';
import { Icon, Dropdown } from 'antd';

import { sort } from './helpers';
import Select from './select';
import UserMenu from './menu/menu';


function columns() {
  return [
    {
      title: 'Username',
      width: '30%',
      dataIndex: 'user_name',
      render: (value, record) => {
        return (
          <Editable
            innerRef={this._focused}
            html={value ? value : ''}
            onChange={event =>
              this.handleEditUserInfo(event, record, 'user_name')
            }
            tagName="span"
            className={
              this.state.rowAdded && record.id === this.state.users.length
                ? `users__cell focus--input`
                : 'users__cell '
            }
          />
        );
      },
      onFilter: (value, record) => record['user_name'] === value,
      sorter: (a, b) => sort(a, b, 'user_name')
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      width: '30%',
      render: (value, record) => {
        return (
          <Editable
            html={value ? value : ''}
            onChange={event =>
              this.handleEditUserInfo(event, record, 'full_name')
            }
            tagName="span"
            className="users__cell"
          />
        );
      },
      sorter: (a, b) => sort(a, b, 'full_name')
    },
    {
      title: 'Role',
      width: '20%',
      dataIndex: 'role',
      render: (value, record) => {
        return (
          <Select
            onChange={event => this.handleEditUserInfo(event, record, 'role')}
            defaultValue={record.role}
          />
        );
      },
      onFilter: (value, record) => record['role'] === value
    },
    {
      title: 'Action',
      width: '20%',
      render: record => {
        if (this.state.rowAdded) {
          if (record.id === this.state.users[this.state.users.length - 1].id) {
            return (
              <div className="users__last-cell">
                {!this.state.passwordAdded ? (
                  <button
                    onClick={() => this.handleForm('Add')}
                    className="users__btn users__btn--password"
                  >
                    Password
                  </button>
                ) : (
                    <button
                      className="users__btn users__btn--change-pass"
                      onClick={() => this.handleForm('Add')}
                    >
                      Change Pass
                  </button>
                  )}
                {this.state.saving ? (
                  <button
                    onClick={this.saveNewUser}
                    className="users__btn users__btn--save"
                  >
                    Save
                  </button>
                ) : (
                    <button className="users__btn users__btn--save hidden">
                      Save
                  </button>
                  )}
              </div>
            );
          }
        }
        return (
          <Dropdown
            key={record.id}
            trigger={['click']}
            rowId={record.id}
            overlay={
              <UserMenu
                rowId={record.id}
                users={this.state.users}
                handleDeleteUser={this.handleDeleteUser}
                changePassword={() => this.handleForm('Change')}
              />
            }
          >
            <Icon
              onClick={() => this.handleRow(record.id)}
              title="click"
              className="user__ellipsis"
              type="ellipsis"
            />
          </Dropdown>
        );
      }
    }
  ];
}

export default columns;
