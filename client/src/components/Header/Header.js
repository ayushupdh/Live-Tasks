import React, { Component } from "react";
import { connect } from "react-redux";
import { signoutUser } from "../../actions/userActions";
import ProfileDropDown from "./ProfileDropDown";

class Header extends Component {
  render() {
    return (
      <div className="p-1  clearfix text-center border shadow-sm  mb-5">
        <h1 className="float-left ml-3"> Live Tasks</h1>
        <div className="float-right mr-4 mt-2 ">
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
