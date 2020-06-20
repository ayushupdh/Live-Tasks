import React, { Component } from "react";
import Header from "./Header/Header";
import { connect } from "react-redux";
import { addNote, getNotes, removeNote } from "../actions/notesActions";
import { Link } from "react-router-dom";
import ShareNote from "./ShareNote";
import { ReactComponent as Options } from "../icon/menu.svg";

import "./NoteList.css";
class NotesList extends Component {
  state = { open: false, id: null, modalOpen: false };
  componentDidMount() {
    this.props.getNotes();
  }

  createNoteHelper = () => {
    this.props.addNote();
  };
  removeNoteHelper = (id) => {
    return this.props.removeNote(id);
  };

  renderMenu() {
    return (
      <div className="menu-dropdown">
        <div
          className="menu-dropdown-item"
          onClick={() => this.setState({ modalOpen: true })}
        >
          Share
        </div>
        <div
          className="menu-dropdown-item"
          onClick={() => this.removeNoteHelper(this.state.id)}
        >
          Delete
        </div>
      </div>
    );
  }

  renderNotesList = () => {
    if (this.props.noteList.length === 0) {
      return <div>Press Create Notes to start creating notes</div>;
    }
    return this.props.noteList.map((note) => {
      return (
        <div
          className="mb-2 shadow-sm border container p-3 rounded"
          key={note._id}
        >
          <div className="row">
            {/* Note title */}
            <div className="col-9">
              <Link to={`/notes/${note._id}`} className=" h5 text-body  ">
                {note.title}
              </Link>
            </div>
            {/* Note Options */}
            <div className="col-3 ">
              <div
                className="menu-icon float-right"
                onClick={() => {
                  return this.setState({
                    open: !this.state.open,
                    id: note._id,
                  });
                }}
              >
                <Options />
              </div>

              {this.state.open &&
                this.state.id === note._id &&
                this.renderMenu()}
            </div>
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
        <ShareNote open={this.state.modalOpen} noteId={this.state.id} />
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
