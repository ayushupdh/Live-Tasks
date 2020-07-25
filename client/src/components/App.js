import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./Routing/privateRoute";
import Notes from "./Items/Notes";
import Login from "./Login";
import SignUp from "./SignUp";
import history from "../history";
import NotesList from "./NotesList";
import { store } from "../store";
import { connect } from "react-redux";
import "./App.css";
import { loadUser } from "../actions/userActions";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
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
