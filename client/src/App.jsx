import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navigation } from './components/Navigation';
import { CreateUser } from './components/CreateUser';
import { CreateNote } from './components/CreateNote';
import { NoteList } from './components/NotesList';


export const App = () => {
  return(
    <Router>
      <Navigation />

      <Route path="/" exact component={NoteList} />
      <Route path="/edit/:id" component={CreateNote} />
      <Route path="/create" component={CreateNote} />
      <Route path="/user" component={CreateUser} />
    </Router>
  )
}