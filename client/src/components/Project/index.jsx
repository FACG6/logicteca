import React, { Component } from "react";
import Scrum from "./Scrum";
import "./style.css";
import axios from "axios";

class Scrums extends Component {
  state = {
    project: {},
    error: '',
    scrums: [],
  };

  componentDidMount() {
    const { projectId, scrumId } = this.props.match.params;

    // fetch project projectName and scrums//
    axios
      .get(`/api/v1/projects/${projectId}/scrums`)
      .then(({ data: { data: { project, scrums } } }) => {
        if (!scrums.length) {
          this.setState({ fetchScrums: true, project });
        }
        else if (!scrumId) {
          const scrumId = scrums[0].id;
          this.props.history.push(`/project/${projectId}/${scrumId}`)
        } else {
          const selectedScrum = scrums.find(scrum => scrum.id === Number(scrumId));
          if (!selectedScrum) {
            const firstScrumId = scrums[0].id;
            this.props.history.push(`/project/${projectId}/${firstScrumId}`)
            this.setState({ project, scrums, fetchScrums: true });
          } else this.setState({ project, scrums, fetchScrums: true });
        }
      })
      .catch(err => this.setState({ error: 'Error' }));
  }

  render() {
    const { projectId, scrumId } = this.props.match.params;
    const { project: { name, usernames }, scrums } = this.state;
    return (
      <section className="project__page--container">
        <div className="project__header">
          <h2 className="project__name"> {name} </h2>
        </div>
        <Scrum {...this.props} projectTeam={usernames}
          scrumId={scrumId} projectId={projectId} scrums={scrums} />
      </section>
    );
  }
}

export default Scrums;
