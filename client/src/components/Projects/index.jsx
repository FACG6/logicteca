import React from 'react';
import ProjectsTable from './projectsTable';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Search from '../commonComponents/search';
import './style.css';

const Projects = () => {
  return (
    <>
      <section className="project__page--container">
        <Button type="primary" icon="plus" className="button">
          <Link to="/project/new">
            <span className="button--caption"> Project </span>
          </Link>
        </Button>
        <Search />
        <ProjectsTable />
      </section>
    </>
  );
};

export default Projects;
