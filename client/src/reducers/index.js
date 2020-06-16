import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import itemReducer from "./itemReducer";
import notesReducers from "./notesReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
  listItems: itemReducer,
  form: formReducer,
  noteList: notesReducers,
  user: userReducer,
  error: errorReducer,
});
