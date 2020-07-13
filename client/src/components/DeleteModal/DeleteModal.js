import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { removeNote } from "../../actions/notesActions";
class DeleteModal extends React.Component {
  state = { noteId: this.props.id };
  deleteNoteHelper() {
    this.props.removeNote(this.state.noteId);
    this.props.toggleModal();
  }
  render() {
    return ReactDOM.createPortal(
      <div className="outer-container ">
        <div className="share-container shadow">
          <div className="mt-3 text-center">
            <p>{this.props.content}</p>
            <button
              onClick={() => {
                this.deleteNoteHelper();
              }}
              className="m-2 btn btn-success"
            >
              {this.props.btn1}
            </button>
            <button
              onClick={() => {
                this.props.toggleModal();
              }}
              className=" m-2 btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
}

export default connect(null, { removeNote })(DeleteModal);
