import React, { Component } from "react";
import { Table } from "antd";
import "./style.css";
import filterData from "./logic";

export default class TableMember extends Component {
  state = {
    member: require("./member.json"),
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
  componentDidMount() {
    this.setState({ filterArray: filterData(this.state.member) });
  }

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      filters: [],
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
      filters: [],
      onFilter: (value, record) => record.role.indexOf(value) === 0
    }
  ];
  render() {
    const { pagination, rowSelection, scroll, filterArray } = this.state;
    const columns = this.columns
    columns[0].filters = filterArray[1];
    columns[1].filters = filterArray[2];

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
