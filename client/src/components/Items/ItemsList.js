import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getItems,removeItem} from '../../actions'

class ItemsList extends Component {
    
    onClickRemove=(id)=>{
        this.props.removeItem(this.props.noteId,id)
    }
    componentDidMount(){
        this.props.getItems(this.props.noteId)
    }
    generateItem = ()=>{
        if(!this.props.listItemArray){
            return(<div>Add an Item to the List</div>)
        }
        return this.props.listItemArray.map((itemObject)=>{

            return(
                <div className=" item" key= {itemObject._id}>
                    <div className="right floated content">
                    <button onClick={()=>this.onClickRemove(itemObject._id)} className="ui button ">Clear</button>
                    </div>
                    <div className="ui header" >{itemObject.item}</div>
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
const mapStateToProps = (state, ownProps)=>{
    return({
        listItemArray: state.listItems,
        noteId: ownProps.match.params.id
    })
}
export default connect(mapStateToProps,{removeItem, getItems})(ItemsList)