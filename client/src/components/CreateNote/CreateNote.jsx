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
      date: new Date()
    };
  }

  async componentDidMount() {
    const res = await axios.get("http://localhost:3001/api/users");
    this.setState({ users: res.data.map(user => user.username) });
    console.log(this.state.users);
  }

  onSubmit = e => {
    e.preventDefault();
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
          <h4>Create a Note</h4>
          {/* SELECT USER */}
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
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
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="content"
              onChange={this.onInputChange}
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
