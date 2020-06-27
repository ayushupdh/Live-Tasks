import { SIGN_IN, SIGN_UP, SIGN_OUT, LOAD_USER } from "../actions/types";

const initialState = { userToken: localStorage.getItem("token"), user: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        userToken: localStorage.getItem("token"),
        user: action.payload,
      };
    case SIGN_IN:
      localStorage.setItem("token", action.payload.token);
      return {
        userToken: action.payload.token,
        user: action.payload.user,
      };
    case SIGN_UP:
      localStorage.setItem("token", action.payload.token);
      return {
        userToken: action.payload.token,
        user: action.payload.user,
      };
    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        userToken: null,
        user: null,
      };
    default:
      return state;
  }
};
