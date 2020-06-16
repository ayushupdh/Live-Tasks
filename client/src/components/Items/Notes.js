import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import AddItemsBar from "./AddItemsBar";
import ItemsList from "./ItemsList";
import history from "../../history";
import { getNotes, editTitle } from "../../actions/notesActions";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.nextRef = React.createRef();
  }
  componentDidMount() {
    this.props.getNotes();
    this.divRef.current.focus();
  }

  // TODO ---- FIND  A BETTER SOLUTION
  focusHelper = () => {
    // document.execCommand("selectAll", false, "");

    const el = this.divRef.current;
    if (el.childNodes[0]) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(el.childNodes[0], el.childNodes[0].data.length);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    }
  };

  onEditHandler = (title) => {
    if (title === "") {
      return this.props.editTitle(this.props.noteId, "Title");
    }
    return this.props.editTitle(this.props.noteId, title);
  };
  titleHelper() {
    if (this.props.title === "") {
      return "Title";
    }

    return this.props.title;
  }
  render() {
    return ReactDOM.createPortal(
      <div
        onClick={() => history.push("/notes")}
        className="min-vh-100 d-inline-block w-100 bg-light"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" w-50 mx-auto border mt-5 p-3 rounded bg-white"
        >
          <div className="p-2">
            <div className="clearfix">
              <div
                style={{
                  outline: 0,
                }}
                onFocus={this.focusHelper}
                ref={this.divRef}
                suppressContentEditableWarning={true}
                className="h4 mb-4 float-left"
                contentEditable={true}
                onBlur={(e) => this.onEditHandler(e.target.innerHTML)}
                placeholder="Title"
              >
                {this.titleHelper()}
              </div>
              <button
                onClick={() => history.push("/notes")}
                type="button"
                className="close"
                aria-label="Close"
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
