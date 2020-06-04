import {combineReducers} from 'redux';
import listReducer from './ListReducer'
import {reducer as formReducer} from 'redux-form'
export default combineReducers({
        listItems:listReducer,
        form: formReducer
})