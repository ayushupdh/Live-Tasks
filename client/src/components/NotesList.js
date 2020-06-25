import React, { Component, Fragment } from "react";
import Header from "./Header/Header";
import { connect } from "react-redux";
import { addNote, getNotes, removeNote } from "../actions/notesActions";
import { Link } from "react-router-dom";
import ShareNote from "./ShareModal/ShareModal";
import { ReactComponent as Options } from "../icon/menu.svg";
import DeleteModal from "./DeleteModal/DeleteModal";
import "./NoteList.css";
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
            <div
              ref={(node) => {
                this.node = node;
              }}
              className="col-3 "
            >
              <div
                className="menu-icon float-right"
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
