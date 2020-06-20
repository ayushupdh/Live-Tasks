import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { shareNotes } from "../actions/notesActions";
import "./ShareNote.css";

class ShareNote extends React.Component {
  state = { input: "" };
  callSubmit(e) {
    e.preventDefault();

    if (this.state.input) {
      this.props.shareNotes(this.props.noteId, this.state.input);
    }
  }

  render() {
    if (this.props.open) {
      return ReactDOM.createPortal(
        <div className="outer-container ">
          <div className="share-container shadow">
            <form>
              <p> Enter the email of the user you want to share with:</p>
              <input
                type="email"
                className="form-control"
                value={this.state.input}
                onChange={(e) => this.setState({ input: e.target.value })}
              />
              {this.props.error && (
                <div className="text-danger">{this.props.error}</div>
              )}
              <div className="mt-3">
                <button
                  className="m-2 btn btn-success"
                  onClick={(e) => this.callSubmit(e)}
                >
                  Share
                </button>
                <button className=" m-2 btn btn-danger">Cancel</button>
              </div>
            </form>
          </div>
        </div>,
        document.querySelector("#shareModal")
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return { error: state.error };
};
export default connect(mapStateToProps, { shareNotes })(ShareNote);
