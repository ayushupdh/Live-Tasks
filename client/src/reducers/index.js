import {combineReducers} from 'redux';
import itemReducer from './ItemReducer'
import notesReducers from './NotesReducer'
import {reducer as formReducer} from 'redux-form'
export default combineReducers({
        listItems:itemReducer,
        form: formReducer,
        noteList: notesReducers
})