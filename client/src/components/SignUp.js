import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signupUser } from "../actions/userActions";

class SignUp extends Component {
  generateBoxes = ({ label, input, type, meta: { touched, error } }) => {
    return (
      <div className="p-2">
        <label>{label}</label>
        <input
          {...input}
          type={type}
          className="form-control"
          autoComplete="on"
        />
        {error && touched && <p className="text-danger m-0">{error}</p>}
      </div>
    );
  };

  onSubmitHelper = (formValues) => {
    if (!formValues.name) {
      throw new SubmissionError({
        name: "Please enter name",
        _error: "No Input Provided",
      });
    } else if (!formValues.username) {
      throw new SubmissionError({
        username: "Please enter username",
        _error: "No Input Provided",
      });
    } else if (!formValues.email) {
      throw new SubmissionError({
        email: "Please enter email",
        _error: "No Input Provided",
      });
    } else if (!formValues.password) {
      throw new SubmissionError({
        password: "Please enter password",
        _error: "No Input Provided",
      });
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
            type="email"
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
            type="password"
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
            Login Instead...
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
