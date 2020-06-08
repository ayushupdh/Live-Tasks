import React, { Component } from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {addNote, getNotes,removeNote} from '../actions'
import {Link} from 'react-router-dom'
class NotesList extends Component {
    
    componentDidMount(){
        this.props.getNotes()
    }

    createNoteHelper=()=>{
        this.props.addNote()
    }
    removeNoteHelper = ()=>{
        return this.props.removeNote()
    }
    
    renderNotesList = ()=>{
        if(this.props.noteList.length===0){
            return(<div>Loading...</div>)
        }
        return(
            this.props.noteList.map((note)=>{

                return(
                    <div className="ui middle aligned divided list" key={note._id}>
                    <div className="item">
                      <div className="right floated content">
                        <div onClick={this.removeNoteHelper}className="ui button">Delete</div>
                      </div>
                      <Link to={`/notes/${note._id}`}className="header">{note.title}</Link>
                    </div>
                    </div>
                )
            })
        )

    }
    render() {
        return (
                <div className="ui two column centered grid">
                <div className="column">
                <Header></Header>

                <button onClick={this.createNoteHelper} className="positive ui button">Create a New Note</button>
                {this.renderNotesList()}
                </div>
            </div>
            
        )
    }
}

const mapStatetoProps = (state)=>{
    // console.log(state);
    return({
        noteList:state.noteList
    })
}

export default  connect(mapStatetoProps, {addNote, getNotes,removeNote})(NotesList);