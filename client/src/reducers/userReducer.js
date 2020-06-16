import { SIGN_IN, SIGN_UP, USER_ERROR } from "../actions/types";

const initialState = { user: null, error: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ERROR:
      return {
        error: action.payload,
        user: null,
      };
    case SIGN_IN:
      return {
        error: null,
        user: action.payload,
      };
    case SIGN_UP:
      return {
        error: null,
        user: action.payload,
      };
    default:
      return state;
  }
};
