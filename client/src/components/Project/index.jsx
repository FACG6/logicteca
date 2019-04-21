import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import Scrum from "./Scrums/index";
import './style.css'

class Scrums extends Component {
  state = {
    projectName: '',
    scrums: []
  }

  componentDidMount() {
    // fetch
    const projectName = 'Demo';
    const scrums = [
      {
        id: '1',
        scrumName: 'scrum 1'
      },
      {
        id: '2',
        scrumName: 'scrum 2'
      },
      {
        id: '3',
        scrumName: 'scrum 3'
      },
      {
        id: '4',
        scrumName: 'scrum 4'
      },
      {
        id: '5',
        scrumName: 'scrum 5'
      },
      {
        id: '6',
        scrumName: 'scrum 6'
      },
      {
        id: '7',
        scrumName: 'scrum 7'
      },
      {
        id: '8',
        scrumName: 'scrum 8'
      },
      {
        id: '9',
        scrumName: 'scrum 9'
      },
      {
        id: '10',
        scrumName: 'scrum 10'
      },
      {
        id: '11',
        scrumName: 'scrum 11'
      },
      {
        id: '12',
        scrumName: 'scrum 12'
      }
    ];
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
