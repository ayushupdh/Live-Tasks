import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import AddItemsBar from "./AddItemsBar";
import ItemsList from "./ItemsList";
import history from "../../history";
import { getItems, editTitle } from "../../actions/notesActions";
import "./Notes.css";
import equal from 'fast-deep-equal'

class Notes extends Component {
  constructor() {
    super();

    this.state = { title: "" };
  }
  componentDidMount() {
    // this.props.getItems(this.props.noteId);
    this.setState({ title: "" });

  }
  componentDidUpdate(prevProps) {
    if(!equal(this.props.title, prevProps.title)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.setState({ title: this.props.title });
    }
  } 
 


  onEditHandler = (title) => {
    if (title === "") {
      return this.props.editTitle(this.props.noteId, "Note");
    }
    return this.props.editTitle(this.props.noteId, title);
  };

  closeNoteHelper = () => {
    history.push("/notes");
  };
  render() {
    
    return ReactDOM.createPortal(
      <div onClick={this.closeNoteHelper} className="noteMainContainer">
        <div
          onClick={(e) => e.stopPropagation()}
          className="notesInnerContainer"
        >
          <div className="p-2">
            <div className="titleBar">
              <input
                className="titleContainer"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                onBlur={(e) => this.onEditHandler(e.target.value)}
                placeholder="Note"
              ></input>
              <button
                onClick={this.closeNoteHelper}
                type="button"
                className="close"
                aria-label="Close"
                style={{ outline: "none" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <AddItemsBar match={this.props.match}></AddItemsBar>
            <ItemsList match={this.props.match}></ItemsList>
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
console.log('Inmap');
console.log(state.note.title);
  return {
    title:state.note.title,
    noteId: ownProps.match.params.id,
  };
};
export default connect(mapStatetoProps, { getItems, editTitle })(Notes);
