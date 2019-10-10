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

  async componentDidMount() {
    const res = await axios.get("http://localhost:3001/api/users");
    this.setState({ users: res.data });
    console.log(this.state.users);
  }

  onChangeUsername = e => {
      const { value, name } = e.target;
      this.setState({
          [name]: value
      })
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form>
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
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-grou">
            {this.state.users.map(user => (
              <li
                key={user._id}
                className="list-group-item list-group-item-action"
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
