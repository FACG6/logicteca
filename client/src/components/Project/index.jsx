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
    // fetch project data
    const { projectId } = this.props.match.params;
    axios
      .get(`/api/v1/projects/${projectId}`)
      .then(result => {
        const project = {
          id: result.data.data.id,
          projectName: result.data.data.name,
          projectTeam: result.data.data.userNames
        };
        this.setState({ project });
        //fetch scrums
        axios
          .get(`/api/v1/projects/${projectId}/scrums`)
          .then(result => {
            const {
              data: { data },
            } = result;
            this.setState({ scrums: data });
          })
          .catch(e => {
            this.setState({
              error: {
                status: true,
                msg: "Error loading scrums !!!"
              }
            });
          });
      })
      .catch(e => {
        this.setState({
          error: {
            status: true,
            msg: "Error loading scrums !!!"
          }
        });
      });
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
