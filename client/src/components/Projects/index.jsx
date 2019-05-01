import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Table, Dropdown, Icon, Menu, Button } from "antd";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import "./style.css";
import Search from "../commonComponents/search";
import searchLogic from "../commonComponents/search/logic";
const data = require("../utils/projects");

class Projects extends Component {
  state = {
    data: [],
    rowSelected: null,
    redirect: false
  };
  componentDidMount() {
    //Todo: Fetch to get projects data from database//
    // fetch('/api/v1/projects')
    //   .then(response=>response.json())
    //   .then(results=>results.data)
    //   .then(**...........**)

    this.setState({ data });
  }

  handleSearch = e => {
    const { value } = e.target;
    const newData = searchLogic(value, data);
    this.setState({ data: newData });
  };
  handleRow = id => {
    this.setState({ rowSelected: id });
  };
  deleteProject = () => {
    if (!this.state.rowSelected) {
      return;
    }
    const name = this.state.data.find(
      project => project.id === this.state.rowSelected
    )["name"];
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ! delete "${name}"`
    }).then(result => {
      if (result.value) {
        // fetch database
        let data = this.state.data.filter(
          ele => ele.id !== this.state.rowSelected
        );
        this.setState({ data });
        Swal.fire(
          "Deleted!",
          `Your Project >> ${name} << has been deleted.`,
          "success"
        );
      }
    });
  };
  columns = [
    {
      title: "ID",
      dataIndex: "id",
      defaultSort: "descend",
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
      title: "Name",
      dataIndex: "name",
      defaultSort: "descend",
      sorter: (a, b) => {
        if (a["name"] > b["name"]) {
          return -1;
        }
        if (a["name"] < b["name"]) {
          return 1;
        }
        return 0;
      },
      render: (text, record) => {
        return (
          <Link to={`/project/${record.id}/1`}>
            <span className="projects__table--row-link">{text}</span>
          </Link>
        );
      }
    },
    {
      title: "Description",
      dataIndex: "description", 
      className: 'projects__cell',
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      defaultSort: "descend",
      sorter: (a, b) => {
        if (a["created_at"] > b["created_at"]) {
          return -1;
        }
        if (a["created_at"] < b["created_at"]) {
          return 1;
        }
        return 0;
      }
    }
  ];
  render() {
    const { data } = this.state;
    if (this.state.redirect) {
      return (
        <Redirect to={`/project/${this.state.rowSelected}/1`} push={true} />
      );
    }
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to={`/project/${this.state.rowSelected}/edit`}>
            <Icon type="form" />
            <span className="table__menu--item-span">Edit</span>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.deleteProject}>
          <Icon type="delete" />
          Delete
        </Menu.Item>
      </Menu>
    );
    this.columns[4] = {
      title: 'Action',
      render: props => {
        return (
          <Dropdown key={props.id} trigger={["click"]} overlay={menu}>
            <Icon
              onMouseOver={() => this.handleRow(props.id)}
              title="click"
              className="projects__table--edit"
              type="ellipsis"
            />
          </Dropdown>
        );
      }
    };
    return (
      <section className="projects__main">
        <div className="projects__button-and-search-container">
          <Link to="/project/new">
            <Button type="primary" icon="plus" className="projects__new-button">
              Projects
            </Button>
          </Link>
          <Search onChange={e => this.handleSearch(e)} />
        </div>
        <div className="projects__table">
          <Table
            dataSource={data}
            columns={this.columns}
            pagination={false}
            rowKey={record => record.id}
            rowClassName="projects__row"
            className="projects__table"
            onRow={(record, index) => {
              return {
                onDoubleClick: () => {
                  return this.setState({
                    redirect: true,
                    rowSelected: record.id
                  });
                }
              };
            }}
          />
        </div>
      </section>
    );
  }
}

export default Projects;
