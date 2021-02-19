import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./Routing/privateRoute";
import Notes from "./Items/Notes";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import history from "../redux/history";
import NotesList from "./Notes/NotesList";
import { store } from "../redux/store";
import { connect } from "react-redux";
import "./App.css";
import { loadUser } from "../redux/actions/userActions";
import socket from "../redux/actions/socketHandler";
import { updateNotes, getItems, updateNote } from "../redux/actions/notesActions";

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());

       ////SOCKETIO//////

socket.on("sharedNote", (data) => {
  // console.log("Shared note" + data);
  store.dispatch(updateNotes());

  socket.emit("joinNote", { noteId: data, user: "id" }, (sent) => {
    // console.log("join note");
    
  });
});
socket.on("message", (data) => {
  // console.log(data);
});

socket.on("addedItemfromSomeone", (noteId) => {
  store.dispatch(getItems(noteId));
});
socket.on("removedItemfromSomeone", ({ noteId, itemId }) => {
  store.dispatch(getItems(noteId, itemId));
});

socket.on("editedItemfromSomeone", ({ noteId, itemId }) => {
  // console.log('someone edited');
  store.dispatch(getItems(noteId, itemId));
});
socket.on("editedTitlefromSomeone", (noteId) => {
  // console.log("edit");
  store.dispatch(updateNote(noteId));
});

socket.on("removedNote", () => {
  // console.log("removed");
  store.dispatch(updateNotes());
});
  }
  componentWillUnmount(){
    socket.removeAllListeners();
  }
  render() {
    return (
      <div
        className="container main-container"
        style={{ borderRadius: "100px" }}
      >
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              {this.props.isAuthenticated ? (
                <Redirect to="/notes"></Redirect>
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/signup">
              {this.props.isAuthenticated ? (
                <Redirect to="/notes"></Redirect>
              ) : (
                <SignUp />
              )}
            </Route>
            <PrivateRoute
              path="/notes"
              exact
              component={NotesList}
            ></PrivateRoute>
            <PrivateRoute
              path="/notes/:id"
              exact
              component={Notes}
            ></PrivateRoute>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.userToken !== null,
  };
};

export default connect(mapStateToProps)(App);
