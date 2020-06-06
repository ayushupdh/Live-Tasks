import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getItems,removeItem} from '../actions'

class ItemsList extends Component {
    
    onClickRemove=(id)=>{
        this.props.removeItem(id)
    }
    componentDidMount(){
        this.props.getItems()
    }

    generateItem = ()=>{
        if(!this.props.listItemArray){
            return(<div>Add an Item to the List</div>)
        }
        return this.props.listItemArray.map((item)=>{
            return(
                <div className=" item" key= {item._id}>
                    <div className="right floated content">
                    <button onClick={()=>this.onClickRemove(item._id)} className="ui button ">Clear</button>
                    </div>
                    <div className="ui header" contentEditable="true">{item.note}</div>
                </div>

            )
        })
    }
    render() {
        return (
            <div className="ui middle aligned divided list">
                {this.generateItem()}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return({
        listItemArray: state.listItems
    })
}
export default connect(mapStateToProps,{removeItem, getItems})(ItemsList)