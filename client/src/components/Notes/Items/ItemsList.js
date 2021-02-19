import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, removeItem, editItem } from "../../../redux/actions/notesActions";

class ItemsList extends Component {
  onClickRemove = (id) => {
    this.props.removeItem(this.props.noteId, id);
  };

  onClickEdit = (itemId, item) => {
    this.props.editItem(this.props.noteId, itemId, item);
  };
  onCheck = (id, completed) => {
    const completedChange = !completed ? true : false;
    this.props.editItem(this.props.noteId, id, { completed: completedChange });
  };

  generateItem = () => {
    if (!this.props.listItemArray || this.props.listItemArray.length === 0) {
      return <div className="addItemMessage">Add an Item to the List</div>;
    }
    return this.props.listItemArray.map((itemObject) => {
      return (
        <div className="itemsListContainer " key={itemObject._id}>
          <div className="checkBox">
            <input
              type="checkbox"
              className="checkbox"
              checked={itemObject.completed}
              aria-label="Checkbox"
              onChange={() => {
                this.onCheck(itemObject._id, itemObject.completed);
              }}
            />
          </div>

          <div
            className={itemObject.completed ? "checked item" : "item"}
            suppressContentEditableWarning={true}
            contentEditable={true}
            onBlur={(e) =>
              this.onClickEdit(itemObject._id, {
                item: e.currentTarget.textContent,
              })
            }
          >
            {itemObject.item}
          </div>
          <div>
            <button
              onClick={() => this.onClickRemove(itemObject._id)}
              type="button"
              className="close mr-2 "
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
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
    listItemArray: state.note.itemsList,
    noteId: ownProps.match.params.id,
  };
};
export default connect(mapStateToProps, { removeItem, getItems, editItem })(
  ItemsList
);
