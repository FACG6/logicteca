import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Table, Dropdown, Icon, Menu, Button } from 'antd';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import './style.css';
import Search from '../commonComponents/search';
import searchLogic from '../commonComponents/search/logic';

class Projects extends Component {
  state = {
    projects: [],
    data: [],
    rowSelected: null,
    redirect: false,
    error: false
  };
  componentDidMount() {
    axios
      .get('/api/v1/projects')
      .then(result => {
        const {
          data: { data },
          status
        } = result;
        if (status === 200) {
          this.setState({ projects: data, data });
        }
      })
      .catch(e => this.setState({ error: true }));
  }

  handleSearch = e => {
    const { value } = e.target;
    const newData = searchLogic(value, this.state.projects);
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
    )['name'];
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Yes, ! delete "${name}"`
    }).then(result => {
      if (result.value) {
        // fetch database
        const projectId = this.state.rowSelected;
        axios
          .delete(`/api/v1/projects/${projectId}`)
          .then(res => {
            if (res.status === 200 && res.data.data === true) {
              let data = this.state.data.filter(
                ele => ele.id !== this.state.rowSelected
              );
              this.setState({ data, projects: data });
              Swal.fire(
                'Deleted!',
                `Your Project >> ${name} << has been deleted.`,
                'success'
              );
            }
          })
          .catch(e => this.setState({ error: true }));
      }
    });
  };
  columns = [
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
      },
      render: (text, record) => {
        return (
          <Link to={`/project/${record.id}`}>
            <span className="projects__table--row-link">{text}</span>
          </Link>
        );
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      className: 'projects__cell',
      render: record => (record === ' ' ? 'No Description' : record)
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
      },
      render: record => record.split('T')[0]
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
    this.columns[3] = {
      title: 'Action',
      render: props => {
        return (
          <Dropdown key={props.id} trigger={['click']} overlay={menu}>
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
          {this.state.error ? <span>Internal Server Error</span> : null}
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
