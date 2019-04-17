import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ContentEditable from 'react-contenteditable';
import './style.css';
const data = require('../utils/projects');

class Projects extends Component {
  state = {
    data: data
  };

  render() {
    const comlums = [
      {
        Header: 'Id',
        accessor: 'id',
        maxWidth: 80,
        style: {
          textAlign: 'center'
        },
        headerClassName: 'projects__table--header'
      },
      {
        Header: 'Name',
        accessor: 'name',
        style: {
          textAlign: 'center'
        },
        headerClassName: 'projects__table--header'
      },
      {
        Header: 'Description',
        accessor: 'description',
        style: {
          textAlign: 'center'
        },
        headerClassName: 'projects__table--header'
      },
      {
        Header: 'Created At',
        accessor: 'created_at',
        style: {
          textAlign: 'center'
        },
        headerClassName: 'projects__table--header',
        Cell: rowInfo => {
          return (
            <div>
              <span>{rowInfo.value}</span>
              <span className="projects__table--edit">...</span>
            </div>
          );
        }
      }
    ];
    return (
      <section className="projects__table">
        <ReactTable
          columns={comlums}
          data={this.state.data}
          filterable
          showPagination={false}
          defaultPageSize={this.state.data.length}
          noDataText="....loading"
        />
      </section>
    );
  }
}

export default Projects;
