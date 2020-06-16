import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signinUser } from "../actions/userActions";

class Login extends Component {
  generateBoxes = ({ label, input, meta, type }) => {
    return (
      <div className="p-2 ">
        <label>{label}</label>
        <input
          {...input}
          className="form-control"
          type={type}
          autoComplete="on"
        ></input>
        {meta.error && meta.touched && (
          <p className="text-danger m-0">{meta.error}</p>
        )}
      </div>
    );
  };

  onSubmitHelper = (formValues) => {
    if (!formValues.email) {
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
            type="email"
            component={this.generateBoxes}
            label="Email"
          ></Field>
          <Field
            name="password"
            type="password"
            component={this.generateBoxes}
            label="Password"
          ></Field>

          {this.props.authError && this.props.anyTouched && (
            <p className="text-danger">{this.props.authError}</p>
          )}
          <button className="btn btn-success btn-block mt-4">Login</button>
        </form>
        <div className="">
          <Link to="/signup" className="btn btn-info btn-block mt-4">
            Sign Up Instead...
          </Link>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    authError: state.error,
  };
};
const form = reduxForm({
  form: "AuthForm",
})(Login);

export default connect(mapStatetoProps, { signinUser })(form);
