import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scrum from "./Scrums/index";

class Scrums extends Component {
  state = {
    projectName: 'Abc1',
    scrums: []
  }

  componentDidMount() {
    // fetch
    const scrums = [
      {
        id: '1',
        scrumName: 'scrum one'
      },
      {
        id: '2',
        scrumName: 'scrum two'
      },
      {
        id: '3',
        scrumName: 'scrum three'
      }
    ];
    this.setState({ scrums: scrums })
  }

  render() {
    const { projectId, scrumId } = this.props.match.params;
    const { projectName, scrums } = this.state;
    return (
      <div>
        <h2> {projectName} </h2>
        <ul>
          { scrums.length !== 0 ? scrums.map(index => <li key={index.id}><Link to={`/project/${projectId}/${index.id}`}> {index.scrumName} </Link></li>) : <li></li>}
        </ul>
        <Scrum scrumId={scrumId} />
      </div>
    );
  }
}

export default Scrums;