import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Notes from "./Items/Notes";
import Login from "./Login";
import SignUp from "./SignUp";
import history from "../history";
import NotesList from "./NotesList";
class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/signup" exact component={SignUp}></Route>
            <Route path="/notes" exact component={NotesList}></Route>
            <Route path="/notes/:id" exact component={Notes}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
