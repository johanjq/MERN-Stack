import React, { PureComponent } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

export class CreateNote extends PureComponent {
  constructor() {
    super();
    this.state = {
      users: [],
      userSelected: "",
      title: "",
      content: "",
      date: new Date(),
      editing: false,
      _id: '',
    };
  }

  async componentDidMount() {
    const res = await axios.get("http://localhost:3001/api/users");
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0].username
    });
    if (this.props.match.params.id) {
      const res = await axios.get('http://localhost:3001/api/notes/' + this.props.match.params.id);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        editing: true,
        _id: this.props.match.params.id
      });
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected
    };
    if (this.state.editing) {
      await axios.put('http://localhost:3001/api/notes/' + this.state._id, newNote)
    } else {
      await axios.post("http://localhost:3001/api/notes", newNote);
    }
    window.location.href = "/";
  };

  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onChangeDate = date => {
    this.setState({ date: date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>{this.props.match.params.id ? 'Edit Note' : 'Create Note'}</h4>
          {/* SELECT USER */}
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              onChange={this.onInputChange}
              value={this.state.title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="content"
              onChange={this.onInputChange}
              value={this.state.content}
            ></textarea>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button className="btn btn-dark" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
