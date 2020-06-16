import React, { Component } from "react";
import { connect } from "react-redux";
import { signoutUser } from "../actions/userActions";
class Header extends Component {
  render() {
    return (
      <div className="p-1  clearfix text-center border shadow-sm  mb-5">
        <h1 className="float-left m-3"> Live Tasks</h1>
        <button
          onClick={() => this.props.signoutUser()}
          className="btn btn-danger m-4 float-right"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default connect(null, { signoutUser })(Header);
