import {
  GET_NOTES,
  ADD_NOTE,
  EDIT_TITLE,
  REMOVE_NOTES,
  SHARE_NOTES,
} from "../actions/types";
export default (notes = [], action) => {
  switch (action.type) {
    case EDIT_TITLE:
      return notes.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
    case GET_NOTES:
      return action.payload;
    case ADD_NOTE:
      return [...notes, action.payload];
    case REMOVE_NOTES:
      return notes.filter((note) => note._id !== action.payload);
    //TODO: Work on updating the notes later
    case SHARE_NOTES:
      return notes;
    default:
      return notes;
  }
};
