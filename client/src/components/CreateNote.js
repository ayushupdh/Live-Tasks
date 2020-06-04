import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form'

 class CreateNote extends Component {
    render() {
        return (
            <div className="ui three column grid">
                <div className="row">
                <div className="column"></div><div className="column">
                <div className="ui card">
                    <div className="content">
                            {/* <Field name="" */}
                    </div>
                    </div>
                </div>

                </div>
            </div>
        )
    }
}
export default reduxForm(
    {form: 'createNoteForm'}
)(CreateNote);