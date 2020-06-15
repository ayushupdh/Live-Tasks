import { SIGN_IN, SIGN_UP } from "./types";
import db from "../apis/db";
// import history from "../history";

///     SIGNIN /////
export const signinUser = (userInfo) => {
  return async (dispatch) => {
    console.log(userInfo);
    try {
      const response = await db.post("/users/login", userInfo);

      dispatch({
        type: SIGN_IN,
        payload: response,
      });
    } catch (e) {
      // console.log(e);
    }
  };
};

///     SIGNUP /////
export const signupUser = (userInfo) => {
  return async (dispatch) => {
    console.log(userInfo);
    const response = await db.post("/users", userInfo);
    console.log(response);
    dispatch({
      type: SIGN_UP,
      payload: response,
    });
  };
};
