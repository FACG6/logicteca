import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import Scrum from "./Scrums/index";
import "./style.css";
import axios from "axios";

class Scrums extends Component {
  state = {
    project: {
      id: "",
      projectName: "",
      projectTeam: [],
    },
    scrums: [],
    error: {
      status: false,
      msg: ""
    }
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
            if (!this.props.match.params.scrumId) {
              const scrumId = data[0].id;
              this.props.history.push(`/project/${projectId}/${scrumId}`);
            }
          }
          )
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
  handleAddScrum = () => {
    const previousScrums = this.state.scrums;
    const lastScrumId = previousScrums.length;

    axios
      .post("/api/v1/scrums/new", {
        projectId: this.state.project.id,
        scrumName: `scrum ${lastScrumId + 1}`
      })
      .then(res => {
        const {
          data: { data }
        } = res;
        const { id, name } = data;
        this.setState(prevState => {
          return {
            scrums: prevState.scrums.concat({
              id,
              scrumName: name
            })
          };
        });
      });
  };

  handleDeleteScrum = scrumId => {
    const { scrums } = this.state;
    const updatedScrums = scrums.filter(scrum => scrum.id !== scrumId);
    this.setState({ scrums: updatedScrums });
    //fetch to delete the scrum from database//
  };

  handleScrumName = scrumNewName => {
    const scrumValue = scrumNewName;
    const scrumId = this.props.match.params.scrumId;
    this.setState(prevState => {
      const updatedScrums = [...prevState.scrums];
      const scrumIndex = updatedScrums.findIndex(
        scrum => scrum.id === Number(scrumId)
      );
      updatedScrums[scrumIndex]["scrumName"] = scrumValue;
      return { scrums: updatedScrums };
      //Fetch//
    });
  };

  render() {
    const { projectId, scrumId } = this.props.match.params;
    const { project, scrums } = this.state;
    return (
      <React.Fragment>
        <section className="project__page--container">
          <div className="project__header">
            <h2 className="project__name"> {project.projectName} </h2>
          </div>
          <div className="project__tab-container">
            <div className="project__tab">
              {scrums.length !== 0 ? (
                scrums.map(index => (
                  <button
                    key={index.id}
                    id={index.id}
                    className="project__button"
                  >
                    <NavLink
                      to={`/project/${projectId}/${index.id}`}
                      className="project__scrum--link"
                    >
                      {" "}
                      {index.scrumName}
                    </NavLink>
                    <Icon
                      onClick={() => this.handleDeleteScrum(index.id)}
                      type="close"
                      className="scrums__close-icon"
                    />
                  </button>
                ))
              ) : (
                  <button />
                )}
              <Icon
                id={this.state.project.id}
                className="scrums__add-icon"
                type="plus-circle"
                onClick={this.handleAddScrum}
              />
            </div>
          </div>
          {this.props.match.params.scrumId ?
            <Scrum
              projectTeam={this.state.project.projectTeam}
              scrumName={this.handleScrumName}
              params={this.props.match.params}
              scrumId={scrumId}
            /> : null}

        </section>
      </React.Fragment>
    );
  }
}

export default Scrums;
