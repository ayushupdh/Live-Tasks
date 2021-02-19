import {
  SIGNIN_FAILED,
  SIGNUP_FAILED,
  SHARE_FAILED,
  NO_ERROR,
} from "../actions/types";

const initialState = null;

export default (error = initialState, action) => {
  switch (action.type) {
    case SIGNIN_FAILED:
      return (error = action.payload);
    case SIGNUP_FAILED:
      return (error = action.payload);
    case SHARE_FAILED:
      return (error = action.payload);
    case NO_ERROR:
      return (error = null);
    default:
      return error;
  }
};
