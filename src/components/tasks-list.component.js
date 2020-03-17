import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
    <tr>
    <td>{props.task.name}</td>
    <td>{props.task.description}</td>
    <td>{props.task.status}</td>
    <td>
      <Link to={"/edit/"+props.task._id}>edit</Link> | <a href="/" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
    </td>
  </tr>
)

export default class TasksList extends Component {
    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this)

        this.state = {tasks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/')
            .then(response => {
                this.setState({ tasks: response.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    deleteTask(id) {
        axios.delete('http://localhost:5000/tasks/'+id)
            .then(response => { console.log(response.data) });
        
        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    taskList() {
        return this.state.tasks.map(currentTask => {
            return <Task task={currentTask} deleteTask={this.deleteTask} key={currentTask._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Tasks</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.taskList() }
                    </tbody>
                </table>
            </div>
        )
    }
}