import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import Scrum from "./Scrums/index";
import './style.css';
const scrums = require('./Scrums/utilis/scrums.json')

class Scrums extends Component {
  state = {
    projectName: '',
    scrums: []
  }

  componentDidMount() {
    // fetch
    const projectName = 'Demo';
    this.setState({ scrums: scrums });
    this.setState({projectName: projectName})
  }

  render() {
    const { projectId, scrumId } = this.props.match.params;
    const { projectName, scrums } = this.state;
    return (
      <React.Fragment>
        <section className='project__page--container'>
          <div className='Project__header'>
            <h2 className='Project__name'> {projectName} </h2>
            <Button type="primary" icon="plus" className="Project__addScrum__btn"> Scrum </Button>
          </div>
          <ul className='Project__tabs'>
            { scrums.length !== 0 ? scrums.map(index => <li key={index.id} className='Project__tab'><NavLink to={`/project/${projectId}/${index.id}`} className='Project__scrum--link'> {index.scrumName} </NavLink></li>) : <li></li>}
          </ul>
          <div className='Project__scrum'>
            <Scrum scrumId={scrumId} />
          </div>
        </section>
      </React.Fragment>
      
    );
  }
}

export default Scrums;
