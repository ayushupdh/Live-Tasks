import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import "./auth.css";

class SignUp extends Component {
  generateBoxes = ({ label, input }) => {
    console.log(this.props);
    return (
      <div className="p-1">
        <label>{label}</label>
        <input {...input} className="form-control"></input>
      </div>
    );
  };

  render() {
    return (
      <div className="mx-auto  w-50  border mt-4 p-5">
        <h1 className="text-center pb-5">Live Tasks</h1>
        <form className="form-group">
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
          <Field
            name="re-password"
            component={this.generateBoxes}
            label="Retype Password"
          ></Field>
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

export default reduxForm({
  form: "AuthForm",
})(SignUp);
