import React, { Component } from "react";
import { connect } from "react-redux";
import { signoutUser } from "../../actions/userActions";
import ProfileDropDown from "./ProfileDropDown";

class Header extends Component {
  render() {
    return (
      <div
        className="p-3  clearfix text-center  shadow-sm  mb-5"
        style={{
          backgroundColor: "#092532",
          borderRadius: "10px",
          margin: "-5px",
        }}
      >
        <h1 className="float-left h2 ml-4" style={{ color: "#99d8d0" }}>
          Live Tasks
        </h1>
        <div className="float-right mr-5 mt-0 ">
          <ProfileDropDown
            signoutUser={this.props.signoutUser}
            user={this.props.user}
          ></ProfileDropDown>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, { signoutUser })(Header);
