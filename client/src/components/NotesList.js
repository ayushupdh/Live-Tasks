import React, { Component } from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {addNote, getNotes} from '../actions'
class NotesList extends Component {
    
    componentDidMount(){
        this.props.getNotes()
    }

    renderCreateNote=()=>{
        this.props.addNote()
        console.log(this.props.notes);
    }

    render() {
        return (
                <div className="ui two column centered grid">
                <div className="column">
                <Header></Header>

                <button onClick={this.renderCreateNote} className="positive ui button">Create a New Note</button>

                </div>
            </div>
            
        )
    }
}

const mapStatetoProps = (state)=>{
    console.log(state);
    return({
        notes:state
    })
}

export default  connect(mapStatetoProps, {addNote, getNotes})(NotesList);