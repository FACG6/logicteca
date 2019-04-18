import React, { Component } from "react";
import { Table } from "antd";
import "./style.css";
import filterData from "./logic";

export default class TableMember extends Component {
  constructor(props) {
    super(props);
    this.state.member = require("./member.json");
    this.state.filterArray = filterData(this.state.member);
    this.columns[0].filters = this.state.filterArray[0];
    this.columns[1].filters = this.state.filterArray[1];
    this.columns[2].filters = this.state.filterArray[2];
  }

  state = {
    member: [],
    filterArray: [],
    pagination: false,
    rowSelection: {
      onChange: selectedRows => {
        this.props.handleCheck({
          row: selectedRows
        });
      }
    },
    scroll: { y: 400 }
  };

  columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 70,
      onFilter: (value, record) => record.id.indexOf(value) === 0
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      filters: this.state.filterArray[1],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
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
      filters: this.state.filterArray[2],
      onFilter: (value, record) => record.role.indexOf(value) === 0
    }
  ];

  render() {
    const { pagination, rowSelection, scroll } = this.state;
    return (
      <Table
        rowKey={record => record.id}
        pagination={pagination}
        rowSelection={rowSelection}
        scroll={scroll}
        columns={this.columns}
        dataSource={this.state.member}
        rowClassName="table-font-row"
        className="table-font-header"
      />
    );
  }
}
