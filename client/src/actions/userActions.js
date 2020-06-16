import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  SIGNIN_FAILED,
  SIGNUP_FAILED,
  LOAD_USER,
} from "./types";
import db from "../apis/db";
import history from "../history";

//// LOAD USER /////
export const loadUser = () => async (dispatch, getState) => {
  try {
    const response = await db.get("/users/me", getToken(getState));
    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: SIGNUP_FAILED,
    //   payload: "User is Unauthenticated",
    // });
  }
};

///     SIGNIN    /////
export const signinUser = (userInfo) => {
  return async (dispatch) => {
    try {
      const response = await db.post("/users/login", userInfo);
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: SIGN_IN,
          payload: response.data,
        });
        history.push("/notes");
      } else {
        dispatch({
          type: SIGNIN_FAILED,
          payload: "Email / Password does not match",
        });
      }
    } catch (e) {
      dispatch({
        type: SIGNIN_FAILED,
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
        type: SIGNUP_FAILED,
        payload: "Failed to sign up",
      });
    }
  };
};

///     LOGOUT    /////
export const signoutUser = () => {
  return async (dispatch, getState) => {
    try {
      const response = await db.post("/users/logout", getToken(getState));
      console.log(response);
      dispatch({
        type: SIGN_OUT,
        payload: response.data.user,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: SIGNUP_FAILED,
      //   payload: "User is Unauthenticated",
      // });
    }
  };
};

const getToken = (getState) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const token = getState().user.userToken;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
