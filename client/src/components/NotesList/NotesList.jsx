import React, { PureComponent } from "react";
import axios from "axios";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import "./styles.css";

export class NoteList extends PureComponent {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  async getNotes() {
    const res = await axios.get("http://localhost:3001/api/notes");
    this.setState({ notes: res.data });
  }

  async componentDidMount() {
    this.getNotes();
  }

  deleteNote = async (id) => {
      await axios.delete('http://localhost:3001/api/notes/' + id);
      this.getNotes();
  }

  render() {
    return (
      <div className="row">
        {this.state.notes.map(note => (
          <div className="col-md-4 p-2" key={note._id} >
            <div className="card">
                <div className="card-header">
                    <h5>{note.title}</h5>
                </div>
              <div className="card-body">
                <p>{note.content}</p>
                <p>{note.author}</p>
                <p>{format(note.date)}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>Delete</button>
                  <Link className="btn btn-secondary" to={"/edit/" + note._id}>Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
