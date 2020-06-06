import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import './auth.css'

class Login extends Component {

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
                            <h2> Login</h2>
                            <Field
                                name="username"
                                component={this.generateBoxes}
                                label="UserName"
                            >
                            </Field>
                            <Field
                                name="password"
                                component={this.generateBoxes}
                                label="Password"
                            >
                            </Field>
                            <button className="ui fluid button green">Login</button>
                        </form>
                        <div className="sign-up-button">
                        <Link to="/signup" className="ui fluid  button teal">
                            Sign Up
                        </Link>
                        </div>


            </div>

               
        )
    }
}

export default reduxForm({
    form: 'AuthForm'
})(Login)
