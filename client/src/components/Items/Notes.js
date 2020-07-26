import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import AddItemsBar from "./AddItemsBar";
import ItemsList from "./ItemsList";
import history from "../../history";
import { getNotes, editTitle } from "../../actions/notesActions";
import "./Notes.css";
class Notes extends Component {
  constructor() {
    super();

    this.state = { title: "" };
  }
  componentDidMount() {
    if (!this.props.noteList) {
      this.props.getNotes();
    }
    console.log(this.props.title);
    this.setState({ title: this.props.title });
  }
  com;
  onEditHandler = (title) => {
    if (title === "") {
      return this.props.editTitle(this.props.noteId, "Title");
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
          {console.log(this.props.title)}
          <div className="p-2">
            <div className="titleBar">
              <input
                className="titleContainer"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                onBlur={(e) => this.onEditHandler(e.target.value)}
                placeholder="Title"
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
  // TODO FIND A BETTER WAY TO GET THE NOTE TITLE
  let title = "";

  for (let i = 0; i < state.noteList.length; i++) {
    if (state.noteList[i]._id === ownProps.match.params.id) {
      title = state.noteList[i].title;
    }
  }
  return {
    title,
    noteId: ownProps.match.params.id,
  };
};
export default connect(mapStatetoProps, { getNotes, editTitle })(Notes);
