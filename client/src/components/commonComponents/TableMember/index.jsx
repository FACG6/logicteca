import React, { Component } from 'react';
import { Table } from 'antd';
import './style.css';
import { filterData } from './logic';

export default class TableMember extends Component {
  state = {
    member: this.props.member,
    filterArray: filterData(this.props.member),
    pagination: false,
    scroll: { y: 400 }
  };

  componentDidMount() {
    if (this.props.teamMember) {
      const selectedRowKeys = this.props.teamMember.map(user => user.userId);
      this.setState({ selectedRowKeys: selectedRowKeys });
      this.props.handleCheck({
        row: selectedRowKeys
      });
    }
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'name',
      width: 150,
      className: 'project__cell',
      filters: [],
      onFilter: (value, record) => record.full_name.indexOf(value) === 0,
      sorter: (a, b) => {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
        return 0;
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      className: 'project__cell',
      width: 150,
      filters: [],
      onFilter: (value, record) => record.role.indexOf(value) === 0
    }
  ];
  render() {
    const {
      pagination,
      selectedRowKeys,
      scroll,
      filterArray,
      member
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: selectedRows => {
        this.props.handleCheck({
          row: selectedRows
        });
        this.setState({ selectedRowKeys: selectedRows });
      }
    };
    const columns = this.columns;
    columns[0].filters = filterArray[2];
    columns[1].filters = filterArray[3];

    return (
      <Table
        rowKey={record => record.id}
        pagination={pagination}
        rowSelection={rowSelection}
        scroll={scroll}
        columns={columns}
        dataSource={member}
        rowClassName="table-font-row"
        className="table-font-header"
      />
    );
  }
}
