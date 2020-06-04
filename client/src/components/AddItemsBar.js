import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addItem} from '../actions'
import {Field,reduxForm} from 'redux-form'

 class SearchBox extends Component {


   renderinputListItem=({input})=>{
       return(
            <div className="ui fluid action input">
                <input
                value ={input.value}
                onChange={input.onChange}
                ></input>
                <button className="ui button">Add</button>
             </div>
       )
   }
   onAddItemSubmit=(formValues)=>{
        if(Object.keys(formValues).length !==0){
            this.props.addItem(formValues.inputListItem);
            this.props.reset()
        }
       
   }
    render() {

        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onAddItemSubmit)}>
                <Field
                name="inputListItem"
                component={this.renderinputListItem}
                >
                </Field>
                </form>
            </div>  
        )
    }
}

const mapStateToProps = (state)=>{
    return({
        state
    })
}

const formWrapper = reduxForm({form: 'addItemForm'})(SearchBox)

export default connect(mapStateToProps,{addItem})(formWrapper)