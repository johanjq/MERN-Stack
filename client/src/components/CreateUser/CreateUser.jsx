import React, { PureComponent } from "react";
import axios from "axios";
import "./styles.css";

export class CreateUser extends PureComponent {
  constructor() {
    super();
    this.state = {
      users: [],
      username: ""
    };
  }

  getUsers = async () => {
    const res = await axios.get("http://localhost:3001/api/users");
    this.setState({ users: res.data });
  };

  async componentDidMount() {
    this.getUsers();
  }

  onChangeUsername = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async e => {
    //Doesn't restart the page with this
    e.preventDefault();
    await axios.post("http://localhost:3001/api/users", {
      username: this.state.username
    });
    this.setState({ username: "" });
    this.getUsers();
  };

  deleteUser = async (id) => {
      await axios.delete('http://localhost:3001/api/users/'+ id);
      this.getUsers();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  placeholder="Username"
                  type="text"
                  className="form-control"
                  onChange={this.onChangeUsername}
                  name="username"
                  value={this.state.username}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-grou">
            {this.state.users.map(user => (
              <li
                key={user._id}
                className="list-group-item list-group-item-action"
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
