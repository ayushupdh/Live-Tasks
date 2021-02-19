import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, REMOVE_ITEM } from "../actions/types";

const initialState = {title:'', itemslist:[]};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.payload;
    case ADD_ITEM:
      return {...state, itemsList: [...state.itemsList, action.payload]};
    case EDIT_ITEM:
      let itemsListArray= state.itemsList.map((item) =>
      item._id === action.payload._id ? (item = action.payload) : item
    );
      return {title:state.title, itemsList: itemsListArray};
    case REMOVE_ITEM:
      let itemsListArrayFiltered= state.itemsList.filter((item) => item._id !== action.payload);
      return {title:state.title, itemsList: itemsListArrayFiltered};
    default:
      return state;
  }
};
