import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import notesReducers from "./notesReducer";
import userReducer from "./userReducer";
import { reducer as formReducer } from "redux-form";
export default combineReducers({
  listItems: itemReducer,
  form: formReducer,
  noteList: notesReducers,
  user: userReducer,
});
