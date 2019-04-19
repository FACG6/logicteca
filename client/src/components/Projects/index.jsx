import React from "react";
import ProjectsTable from "./projectsTable";
import { Link } from "react-router-dom";
import { Button } from "antd";
// import Search from '../commonComponents/search';
import "./style.css";

const Projects = () => {
  return (
    <React.Fragment>
      <section className="projects__page--container">
        <div className="project__page--button-and-search-container">
          <Button type="primary" icon="plus" className="button">
            <Link to="/project/new">
              <span className="button--caption"> Project </span>
            </Link>
          </Button>
          {/* <Search className="search" /> */}
        </div>
        <ProjectsTable />
      </section>
    </React.Fragment>
  );
};

export default Projects;
