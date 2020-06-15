import { SIGN_IN, SIGN_UP } from "../actions/types";

export default (user = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return user;
    case SIGN_UP:
      return user;
    default:
      return user;
  }
};
