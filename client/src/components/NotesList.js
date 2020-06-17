import React, { Component } from "react";
import Header from "./Header/Header";
import { connect } from "react-redux";
import { addNote, getNotes, removeNote } from "../actions/notesActions";
import { Link } from "react-router-dom";
class NotesList extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  createNoteHelper = () => {
    this.props.addNote();
  };
  removeNoteHelper = (id) => {
    return this.props.removeNote(id);
  };

  renderNotesList = () => {
    if (this.props.noteList.length === 0) {
      return <div>Press Create Notes to start creating notes</div>;
    }
    return this.props.noteList.map((note) => {
      return (
        <div
          className="mb-2 shadow-sm border clearfix p-3 rounded"
          key={note._id}
        >
          <Link to={`/notes/${note._id}`} className="float-left h5 text-body">
            {note.title}
          </Link>
          <div className="float-right">
            <button
              onClick={() => this.removeNoteHelper(note._id)}
              type="button"
              className="close"
              aria-label="Close"
              style={{ outline: "none" }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <Header></Header>
        <div className="shadow-sm border p-5 rounded">
          <div className="mb-4 ">
            <button
              type="button"
              onClick={this.createNoteHelper}
              className="btn btn-success"
            >
              Create Notes
            </button>
          </div>

          <div className=" ">{this.renderNotesList()}</div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  // console.log(state);
  return {
    noteList: state.noteList,
  };
};

export default connect(mapStatetoProps, { addNote, getNotes, removeNote })(
  NotesList
);
