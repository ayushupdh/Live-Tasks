import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  SIGNIN_FAILED,
  SIGNUP_FAILED,
  LOAD_USER,
} from "./types";
import axios from "axios";
import history from "../history";
import socket from "./socketHandler";

//// LOAD USER /////
export const loadUser = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/users/me", getToken(getState));

    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
    const user = getState().user.user;
    if (user !== null) {
      socket.emit("userIdentify", { user }, (message) => {});

      getState().noteList.forEach((note) => {
        if (note.sharable === "true") {
          socket.emit(
            "joinNote",
            { noteId: note._id, user: user },
            (message) => {
              console.log(message);
            }
          );
        }
      });
    } else {
      console.log("User not found");
    }
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
      const response = await axios.post("/api/users/login", userInfo);
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
      const response = await axios.post("/api/users", userInfo);
      console.log(response.data);
      dispatch({
        type: SIGN_UP,
        payload: response.data,
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
      const header = getToken(getState);
      const response = await axios.post("/api/users/logout", {}, header);
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

export const getToken = (getState) => {
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
