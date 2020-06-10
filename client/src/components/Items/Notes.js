import React, { Component } from 'react'
import AddItemsBar from './AddItemsBar'
import ItemsList from './ItemsList'
import history from '../../history'
 class Notes extends Component {
    render() {
        return (
            <div onClick={()=>history.push('/notes') }className="ui dimmer modals visible active">
            <div onClick={(e)=> e.stopPropagation()} className="ui standard modal visible active very padded text container segment ">
                <h2>Notes</h2>
              <AddItemsBar match= {this.props.match}></AddItemsBar>
              <ItemsList match= {this.props.match}></ItemsList>
            </div>
            </div>
        )
    }
}

export default Notes;