import React, { Component, Fragment } from "react";
import Header from "./Header/Header";
import { connect } from "react-redux";
import { addNote, getNotes, removeNote } from "../actions/notesActions";
import { Link } from "react-router-dom";
import ShareNote from "./ShareModal/ShareModal";
import { ReactComponent as Options } from "../icon/menu.svg";
import DeleteModal from "./DeleteModal/DeleteModal";
import "./NoteList.css";
import { store } from "../store";
import history from "../history";


class NotesList extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
      id: null,
      modalOpen: false,
      deleteModalOpen: false,
      content: null,
      btn1: null,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleOutsideMenuClick = this.handleOutsideMenuClick.bind(this);
  }

  componentDidMount() {
 
    this.props.getNotes();
  }

  handleMenuClick(id) {
    if (!this.state.menuOpen) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideMenuClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideMenuClick, false);
    }

    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
      id,
    }));
  }

  handleOutsideMenuClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleMenuClick();
  }

  createNoteHelper = () => {
    this.props.addNote();
  };

  handledeleteModal = () => {
    if (this.state.deleteModalOpen) {
      return (
        <Fragment>
          <DeleteModal
            content={this.state.content}
            btn1={this.state.btn1}
            id={this.state.id}
            toggleModal={this.toggledeleteModalOpen}
          />
        </Fragment>
      );
    }
  };

  handleShare = () => {
    if (this.state.modalOpen) {
      return (
        <div>
          <ShareNote
            content={"Enter the email of the user you want to share with:"}
            noteId={this.state.id}
            toggleModalOpen={this.toggleModalOpen}
          />
        </div>
      );
    }
  };

  toggledeleteModalOpen = () => {
    this.setState({ deleteModalOpen: false });
  };
  toggleModalOpen = () => {
    this.setState({ modalOpen: false });
    store.dispatch({ type: "NO_ERROR" });
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
          onClick={() => {
            this.setState({
              deleteModalOpen: true,
              content: "Are you sure you want to delete this note?",
              btn1: "Delete",
            });
          }}
        >
          Delete
        </div>
      </div>
    );
  }

  openNote = (noteID) => {
    history.push(`/notes/${noteID}`);
  };

  renderNotesList = () => {
    if (this.props.noteList.length === 0) {
      return <div>Press Create Notes to start creating notes</div>;
    }
    return this.props.noteList.map((note) => {
      return (
        <div
          className="mb-2 shadow-sm border  "
          key={note._id}
          style={{ borderRadius: "100px", backgroundColor: "#fff" }}
        >
          <div className="row " style={{ cursor: "pointer" }}>
            {/* Note title */}
            <div
              className="col-10 p-2 "
              onClick={() => this.openNote(note._id)}
            >
              <div className="h5 ml-5 pt-1 ">{note.title}</div>
            </div>
            {/* Note Options */}
            <div
              ref={(node) => {
                this.node = node;
              }}
              className="col-2 p-2"
            >
              <div
                className="menu-icon float-right mr-3"
                onClick={() => this.handleMenuClick(note._id)}
              >
                <Options />
              </div>

              {this.state.menuOpen &&
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
        <div
          className="shadow-lg border p-5 "
          style={{ borderRadius: "10px", backgroundColor: "#f8f8ff" }}
        >
          <div className="mb-4 ">
            <button
              type="button"
              onClick={this.createNoteHelper}
              className="btn "
              style={{
                borderRadius: "100px",
                backgroundColor: "#092532",
                color: "#99d8d0",
              }}
            >
              Create Notes
            </button>
          </div>
          <div className=" ">{this.renderNotesList()}</div>
        </div>
        {this.handleShare()}
        {this.handledeleteModal()}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    noteList: state.noteList,
  };
};

export default connect(mapStatetoProps, { addNote, getNotes, removeNote })(
  NotesList
);
