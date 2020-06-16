import { SIGN_IN, SIGN_UP, USER_ERROR } from "./types";
import db from "../apis/db";
import history from "../history";

///     SIGNIN    /////
export const signinUser = (userInfo) => {
  return async (dispatch) => {
    try {
      const response = await db.post("/users/login", userInfo);
      console.log(response);
      dispatch({
        type: SIGN_IN,
        payload: response.data.user,
      });
      history.push("/notes");
    } catch (e) {
      dispatch({
        type: USER_ERROR,
        payload: "Email / Password does not match",
      });
    }
  };
};

///     SIGNUP    /////
export const signupUser = (userInfo) => {
  return async (dispatch) => {
    try {
      const response = await db.post("/users", userInfo);
      console.log(response.data);
      dispatch({
        type: SIGN_UP,
        payload: response.data.user,
      });
      history.push("/notes");
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: "Failed to sign up",
      });
    }
  };
};
