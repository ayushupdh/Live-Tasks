import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isAuthenticated) {
        return <Redirect to="/" />;
      }
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.userToken !== null,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
