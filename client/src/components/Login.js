import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signinUser } from "../actions/userActions";

class Login extends Component {
  generateBoxes = ({ label, input, type }) => {
    return (
      <div className=" ">
        <label>{label}</label>
        <input
          {...input}
          className="form-control"
          type={type}
          autoComplete="on"
        ></input>
      </div>
    );
  };
  handleError() {
    console.log("Handle input error");
  }
  onSubmitHelper = (formValues) => {
    if (!formValues.email || !formValues.password) {
      return this.handleError();
    } else {
      this.props.signinUser(formValues);
    }
  };
  render() {
    return (
      <div className=" mx-auto  w-50  border mt-4 p-5">
        <h1 className="text-center pb-5">Live Tasks</h1>
        <form
          className="form-group"
          onSubmit={this.props.handleSubmit(this.onSubmitHelper)}
        >
          <h4> Login</h4>
          <Field
            name="email"
            type="text"
            component={this.generateBoxes}
            label="Email"
          ></Field>
          <Field
            name="password"
            type="password"
            component={this.generateBoxes}
            label="Password"
          ></Field>
          <button className="btn btn-success btn-block mt-4">Login</button>
        </form>
        <div className="">
          <Link to="/signup" className="btn btn-info btn-block mt-4">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

const form = reduxForm({
  form: "AuthForm",
})(Login);

export default connect(null, { signinUser })(form);
