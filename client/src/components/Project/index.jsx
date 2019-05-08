import React, { Component } from "react";
import Scrum from "./Scrum";
import InternalServerError from '../InternalServerErr/index';
import "./style.css";
import axios from "axios";
class Scrums extends Component {
  state = {
    project: {},
    error: '',
    scrums: [],
    fetchScrums: false,
  };

  componentDidMount() {
    const { projectId, scrumId } = this.props.match.params;

    // fetch project projectName and scrums//
    axios
      .get(`/api/v1/projects/${projectId}/scrums`)
      .then(({ data: { data: { project, scrums } } }) => {
        if (scrums.length) {
          if (!scrumId) {
            const scrumId = scrums[0].id;
            this.props.history.push(`/project/${projectId}/${scrumId}`);
            this.setState({ project, scrums, fetchScrums: true });
          } else {
            const selectedScrum = scrums.find(scrum => scrum.id === Number(scrumId));
            if (!selectedScrum) {
              const firstScrumId = scrums[0].id;
              this.props.history.push(`/project/${projectId}/${firstScrumId}`)
              this.setState({ project, scrums, fetchScrums: true });
            } else {
              this.setState({ project, scrums, fetchScrums: true });
            }
          }
        } else {
          this.setState({ project, fetchScrums: true });
        }
      })
      .catch(err => this.setState({ error: 'Internal Server Error' }));
  }

  render() {
    const { projectId, scrumId } = this.props.match.params;
    const { project: { name, userNames }, scrums, fetchScrums, error } = this.state;
    return (
      <section className="project__page--container">
        <div className="project__header">
          {error ?  <InternalServerError /> : ''}
          <h2 className="project__name"> {name} </h2>
        </div>
        {fetchScrums && name ?
          (<>
            <Scrum {...this.props} projectTeam={userNames}
              scrumId={scrumId} projectId={projectId} scrums={scrums} />
          </>)
          : null}
      </section>
    );
  }
}

export default Scrums;
