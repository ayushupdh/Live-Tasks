import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, removeItem, editItem } from "../../actions";

class ItemsList extends Component {
  onClickRemove = (id) => {
    this.props.removeItem(this.props.noteId, id);
  };
  onClickEdit = (itemId, item) => {
    this.props.editItem(this.props.noteId, itemId, item);
  };
  componentDidMount() {
    this.props.getItems(this.props.noteId);
  }
  generateItem = () => {
    if (this.props.listItemArray.length === 0) {
      return <div>Add an Item to the List</div>;
    }
    return this.props.listItemArray.map((itemObject) => {
      return (
        <div
          className="mb-2 shadow-sm border clearfix p-3 rounded "
          key={itemObject._id}
        >
          <input
            className="form-check-input ml-1"
            type="checkbox"
            aria-label="Checkbox "
          />
          <div>
            <button
              onClick={() => this.onClickRemove(itemObject._id)}
              type="button"
              className="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div
            style={{
              outline: "0px solid transparent",
            }}
            suppressContentEditableWarning={true}
            className="ml-4"
            contentEditable={true}
            onBlur={(e) =>
              this.onClickEdit(itemObject._id, e.currentTarget.textContent)
            }
          >
            {itemObject.item}
          </div>
        </div>
      );
    });
  };
  render() {
    return <div className="">{this.generateItem()}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    listItemArray: state.listItems,
    noteId: ownProps.match.params.id,
  };
};
export default connect(mapStateToProps, { removeItem, getItems, editItem })(
  ItemsList
);
