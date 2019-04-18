import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Dropdown, Icon, Menu } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
const data = require('../utils/projects');

class Projects extends Component {
  state = {
    data: [],
    rowSelected: null
  };
  componentDidMount() {
    //Todo: Fetch to get projects data from database//
    // fetch('/api/v1/projects')
    //   .then(response=>response.json())
    //   .then(results=>results.data)
    //   .then(**...........**)

    this.setState({ data });
  }
  handleRow = id => {
    console.log(id);
    this.setState({ rowSelected: id });
  };
  render() {
    const { data } = this.state;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to={`/project/${this.state.rowSelected}/edit`}>
            <Icon type="form" />
            <span className="table__menu--item-span">Edit</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Icon type="delete" />
          Delete
        </Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        defaultSort: 'descend',
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
        title: 'Name',
        dataIndex: 'name',
        defaultSort: 'descend',
        sorter: (a, b) => {
          if (a['name'] > b['name']) {
            return -1;
          }
          if (a['name'] < b['name']) {
            return 1;
          }
          return 0;
        }
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        defaultSort: 'descend',
        sorter: (a, b) => {
          if (a['created_at'] > b['created_at']) {
            return -1;
          }
          if (a['created_at'] < b['created_at']) {
            return 1;
          }
          return 0;
        }
      },
      {
        render: props => {
          return (
            <Dropdown key={props.id} overlay={menu}>
              <Icon
                onClick={() => this.handleRow(props.id)}
                title="click"
                className="projects__table--edit"
                type="ellipsis"
              />
            </Dropdown>
          );
        }
      }
    ];
    return (
      <section className="projects__table">
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey={record => record.id}
          rowClassName="projects__row"
          className="projects__table"
        />
      </section>
    );
  }
}

export default Projects;
