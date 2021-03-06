import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../../../redux/actions/notesActions";
import { Field, reduxForm } from "redux-form";

class SearchBox extends Component {
  renderinputListItem = ({ input }) => {
    return (
      <div className="addItemContainer">
        <input
          className="form-control"
          value={input.value}
          onChange={input.onChange}
          placeholder="Add item"
        ></input>
      </div>
    );
  };

  onAddItemSubmit = (formValues) => {
    if (Object.keys(formValues).length !== 0) {
      this.props.addItem(this.props.noteId, formValues.inputListItem);
      this.props.reset();
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onAddItemSubmit)}>
          <Field
            name="inputListItem"
            component={this.renderinputListItem}
          ></Field>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    noteId: ownProps.match.params.id,
  };
};

const formWrapper = reduxForm({ form: "addItemForm" })(SearchBox);

export default connect(mapStateToProps, { addItem })(formWrapper);
