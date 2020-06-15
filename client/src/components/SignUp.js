import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signupUser } from "../actions/userActions";

class SignUp extends Component {
  generateBoxes = ({ label, input }) => {
    return (
      <div className="p-1">
        <label>{label}</label>
        <input {...input} className="form-control" autoComplete="on" />
      </div>
    );
  };

  handleError() {
    console.log("Handle input error");
  }
  onSubmitHelper = (formValues) => {
    if (
      !formValues.email ||
      !formValues.password ||
      !formValues.username ||
      !formValues.name
    ) {
      return this.handleError();
    } else {
      this.props.signupUser(formValues);
    }
  };

  render() {
    return (
      <div className="mx-auto  w-50  border mt-4 p-5">
        <h1 className="text-center pb-5">Live Tasks</h1>
        <form
          className="form-group"
          onSubmit={this.props.handleSubmit(this.onSubmitHelper)}
        >
          <h4> Sign Up</h4>
          <Field
            name="name"
            component={this.generateBoxes}
            label="Name"
          ></Field>
          <Field
            name="email"
            component={this.generateBoxes}
            label="Email"
          ></Field>
          <Field
            name="username"
            component={this.generateBoxes}
            label="UserName"
          ></Field>
          <Field
            name="password"
            component={this.generateBoxes}
            label="Password"
          ></Field>
          {/* <Field
            name="re-password"
            component={this.generateBoxes}
            label="Retype Password"
          ></Field> */}
          <button className="btn btn-info btn-block mt-4">Sign Up</button>
        </form>
        <div className="">
          <Link to="/" className="btn btn-success btn-block">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

const form = reduxForm({
  form: "AuthForm",
})(SignUp);

export default connect(null, { signupUser })(form);
