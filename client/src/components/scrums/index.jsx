import React, { Component } from "react";
import { Tabs } from 'antd';
import Scrum from "./scrum/index";
const TabPane = Tabs.TabPane;

export default class Scrums extends Component {
  state = {
    projectName: 'Abc1',
    scrumsId: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,]
  }

  componentDidMount() {

  }

  render() {
    const { projectId } = this.props.match.params;
    const { projectName, scrumsId } = this.state;
    return (
      <div>
        <h2> {projectName} </h2>
        <Tabs defaultActiveKey={scrumsId[0]}>
          {this.state.scrumsId.map(item => {
            return (
                <TabPane tab={item} key={item} onClick={() => this.props.history.push(`/project/${projectId}/$     {item}`)}>
                  <Scrum item={item}/>
                </TabPane>
            )
          })}
        </Tabs>
      </div>
    );
  }
}
