import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import './auth.css'

class SignUp extends Component {

    generateBoxes = ({ label, input }) => {
        console.log(this.props);
        return (
            <div className=" field">
                <label>{label}</label>
                <input {...input}></input>
            </div>
        )
    }


    render() {

        return (

            <div className="ui form-container">
                    <h1 className="title">Live Tasks</h1>
                        <form className="ui large form">
                            <h2> Sign Up</h2>
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
                            <button className="ui fluid button green">Sign Up</button>
                        </form>
                        <div className="sign-up-button">
                        <Link to="/" className="ui fluid  button teal">
                            Login
                        </Link>
                        </div>


            </div>

               
        )
    }
}

export default reduxForm({
    form: 'AuthForm'
})(SignUp)
