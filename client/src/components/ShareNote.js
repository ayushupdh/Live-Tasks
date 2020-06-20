import React from "react";
import ReactDOM from "react-dom";
import "./ShareNote.css";

class ShareNote extends React.Component {
  state = { input: "" };
  callSubmit(email) {}

  render() {
    if (this.props.open) {
      return ReactDOM.createPortal(
        <div className="outer-container ">
          <div className="share-container shadow">
            <form onSubmit={() => this.callSubmit(this.state.input)}>
              <p> Enter the email of the user you want to share with:</p>
              <input
                className="form-control"
                value={this.state.input}
                onChange={(e) => this.setState({ input: e.target.value })}
              />
              <div className="mt-3">
                <button className="m-2 btn btn-success">Share</button>
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

export default ShareNote;
