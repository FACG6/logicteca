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

  render() {
    const columns = [
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
    const { pagination, rowSelection, scroll } = this.state;
    console.log(this.state.filterArray);
    return (
      <Table
        rowKey={record => record.id}
        pagination={pagination}
        rowSelection={rowSelection}
        scroll={scroll}
        columns={columns}
        dataSource={this.state.member}
        rowClassName="table-font-row"
        className="table-font-header"
      />
    );
  }
}
