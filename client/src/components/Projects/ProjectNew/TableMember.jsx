import React, { Component } from "react";

import { Table } from "antd";

const member = require("./member.json");
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
    filters: [
      {
        text: "amin",
        value: "amin"
      }
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0
  },
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 70,
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
    title: "role",
    dataIndex: "role",
    key: "role",
    width: 150,
    filters: [
      {
        text: "developer",
        value: "developer"
      },
      {
        text: "scrum",
        value: "scrum"
      }
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0
  }
];

export default class TableMember extends Component {
  state = {
    selection: {
      rowKey: null,
      row: null
    },
    pagination: false,
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selection: { rowKey: selectedRowKeys, row: selectedRows }
        });
      }
    },
    scroll: { y: 400 }
  };
  render() {
    const { pagination, rowSelection, scroll } = this.state;
    return (
      <Table
        rowKey={record => record.id}
        pagination={pagination}
        rowSelection={rowSelection}
        scroll={scroll}
        columns={columns}
        dataSource={member}
      />
    );
  }
}
