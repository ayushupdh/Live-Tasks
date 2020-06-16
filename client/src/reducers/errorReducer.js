import { SIGNIN_FAILED, SIGNUP_FAILED } from "../actions/types";

const initialState = null;

export default (error = initialState, action) => {
  switch (action.type) {
    case SIGNIN_FAILED:
      return (error = action.payload);
    case SIGNUP_FAILED:
      return (error = action.payload);
    default:
      return error;
  }
};
