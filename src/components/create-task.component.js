import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      status: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status
    }

    console.log(task);

    axios.post('http://localhost:5000/tasks/add', task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New task</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group"> 
          <label>Status: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create task" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}