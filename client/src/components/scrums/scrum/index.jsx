
import React, { Component } from 'react';
import { Table } from 'antd';

class Scrum extends Component {

    state = {
        tasks: []
    }

    componentDidMount(){
         return fetch('https://jsonplaceholder.typicode.com/typicode/demo/posts', {
             method: 'GET'
         })
        .then(posts => posts.json())
        // .then(res => console.log(res))
        .then(result => this.setState({tasks: result}))
    }

    render() { 
        const tasks = this.state.tasks.slice(0, 30);
        let coulmns = [];
        // let data = []
        tasks.map(item => {
            return coulmns = [
                {
                    title: 'Name',
                    dataIndex: 'userId'
                },
                {
                    title: 'Task',
                    dataIndex: 'title'
                },
                {
                    title: 'Action Type',
                    dataIndex: 'userId'
                },
                {
                    title: 'Priority',
                    dataIndex: 'userId'
                },
                {
                    title: 'Est. Time (hr)',
                    dataIndex: 'userId'
                },
                {
                    title: 'Remaining Time (hr)',
                    dataIndex: 'userId'
                },
                {
                    title: 'Status',
                    dataIndex: 'userId'
                },
                {
                    title: 'Assignee',
                    dataIndex: 'id'
                },
                {
                    title: 'Ticket',
                    dataIndex: 'id'
                },

            ]
        })
        
        return ( 
            <div>
                <h2> Scrum name </h2>
                <Table columns={coulmns} dataSource={tasks}/>
            </div>
         );
    }
}
 
export default Scrum;