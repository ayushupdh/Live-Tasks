import db from "../apis/db";
import history from "../history";
import socket from "./socketHandler";
import {
  GET_NOTES,
  ADD_NOTE,
  EDIT_TITLE,
  REMOVE_NOTES,
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
} from "./types";

///////////////    Notes ////////////////
export const getNotes = () => {
  return async (dispatch, getState) => {
    const response = await db.get("/notes/me", getAuthHeader(getState));
    dispatch({
      type: GET_NOTES,
      payload: response.data,
    });
  };
};

export const addNote = () => {
  return async (dispatch, getState) => {
    const response = await db.post("/notes", {}, getAuthHeader(getState));
    console.log(response);
    dispatch({
      type: ADD_NOTE,
      payload: response.data,
    });
    history.push(`/notes/${response.data._id}`);
  };
};

export const editTitle = (noteId, title) => {
  return async (dispatch, getState) => {
    const response = await db.patch(
      `/notes/${noteId}`,
      { title },
      getAuthHeader(getState)
    );
    console.log("work");
    socket.emit("editTitle", { noteId, title }, (error) => {
      if (error) {
        alert(error);
      }
    });

    dispatch({
      type: EDIT_TITLE,
      payload: response.data,
    });
    history.push(`/notes/${response.data._id}`);
  };
};

export const removeNote = (noteId) => {
  return async (dispatch, getState) => {
    await db.delete(`/notes/${noteId}`, getAuthHeader(getState));
    dispatch({
      type: REMOVE_NOTES,
      payload: noteId,
    });
  };
};

/////////////////// Items  ////////////////
export const getItems = (noteId) => {
  return async (dispatch, getState) => {
    const response = await db.get(`/notes/${noteId}`, getAuthHeader(getState));
    dispatch({
      type: GET_ITEMS,
      payload: response.data.itemsCollections,
    });
  };
};

export const addItem = (noteId, item) => {
  const noteItem = { item: item };
  return async (dispatch, getState) => {
    const response = await db.post(
      `/notes/${noteId}`,
      noteItem,
      getAuthHeader(getState)
    );
    dispatch({
      type: ADD_ITEM,
      payload: response.data,
    });
  };
};

export const editItem = (noteId, itemId, item) => {
  return async (dispatch, getState) => {
    const response = await db.patch(
      `/notes/${noteId}/${itemId}`,
      item,
      getAuthHeader(getState)
    );

    dispatch({
      type: EDIT_ITEM,
      payload: response.data,
    });
  };
};

export const removeItem = (noteId, itemId) => {
  return async (dispatch, getState) => {
    await db.delete(`/notes/${noteId}/${itemId}`, getAuthHeader(getState));
    dispatch({
      type: REMOVE_ITEM,
      payload: itemId,
    });
  };
};

export const getAuthHeader = (getState) => {
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
