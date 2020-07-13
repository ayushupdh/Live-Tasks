import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { shareNotes } from "../../actions/notesActions";
import "./ShareModal.css";

class ShareModal extends React.Component {
  state = { input: "", noteId: this.props.noteId };
  shareNoteHelper(e) {
    e.preventDefault();
    if (this.state.input) {
      // console.log(this.props);
      this.props.shareNotes(this.state.noteId, this.state.input);
      setTimeout(() => {
        if (this.props.error === null) {
          this.props.toggleModalOpen();
        }
      }, 100);
    }
  }

  render() {
    return ReactDOM.createPortal(
      <div className="outer-container ">
        <div className="share-container shadow">
          <form>
            <p> {this.props.content}</p>
            <input
              type="email"
              className="form-control"
              value={this.state.input}
              onChange={(e) => this.setState({ input: e.target.value })}
            />
            {this.props.error && (
              <div className="text-danger">{this.props.error}</div>
            )}
            <div className="mt-3 text-center">
              <button
                className="m-2 p-2 px-4 btn btn-success"
                onClick={(e) => this.shareNoteHelper(e)}
              >
                Share
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.props.toggleModalOpen();
                }}
                className=" m-2  p-2 px-4 btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.querySelector("#shareModal")
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.error };
};
export default connect(mapStateToProps, { shareNotes })(ShareModal);
