import db from "../apis/db";
import history from "../history";
import socket from "./socketHandler";
import { store } from "../store";

import {
  GET_NOTES,
  ADD_NOTE,
  EDIT_TITLE,
  REMOVE_NOTES,
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  SHARE_NOTES,
  SHARE_FAILED,
  NO_ERROR,
} from "./types";

////SOCKETIO//////

socket.on("sharedNote", (data) => {
  console.log("Shared note" + data);
  store.dispatch(updateNotes());

  socket.emit("joinNote", { noteId: data, user: "id" }, (sent) => {
    console.log("join note");
    console.log(sent);
  });
});
socket.on("message", (data) => {
  console.log(data);
});

socket.on("addedItemfromSomeone", (noteId) => {
  store.dispatch(getItems(noteId));
});
socket.on("removedItemfromSomeone", ({ noteId, itemId }) => {
  store.dispatch(removeItem(noteId, itemId));
});

socket.on("removedNote", () => {
  console.log("removed");
  store.dispatch(updateNotes());
});
///////////////    Notes ////////////////
export const getNotes = () => {
  return async (dispatch, getState) => {
    const response = await db.get("/notes/me", getAuthHeader(getState));
    dispatch({
      type: GET_NOTES,
      payload: response.data,
    });
    if (getState().user.user !== null) {
      socket.emit("userIdentify", { user: getState().user.user }, (message) => {
        console.log(message);
      });

      getState().noteList.forEach((note) => {
        if (note.sharable === "true") {
          socket.emit(
            "joinNote",
            { noteId: note._id, user: getState().user.user },
            (message) => {
              console.log(message);
            }
          );
        }
      });
    } else {
      store.dispatch(getNotes());
    }
  };
};

export const updateNotes = () => {
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

    socket.emit("removeNote", noteId, (message) => {
      console.log(message);
    });
  };
};
export const shareNotes = (noteId, userEmail) => {
  return async (dispatch, getState) => {
    const body = {
      sharable: "true",
      userEmail,
    };
    try {
      const response = await db.patch(
        `/notes/share/${noteId}`,
        body,
        getAuthHeader(getState)
      );

      //TODO: Work on updating the notes later
      dispatch({
        type: SHARE_NOTES,
        payload: response.data,
      });
      dispatch({
        type: NO_ERROR,
      });

      socket.emit("shareNotes", { noteId, userEmail }, (data) => {
        console.log(data);
      });
    } catch (error) {
      if (error.response.status === 404)
        dispatch({
          type: SHARE_FAILED,
          payload: error.response.data.error,
        });
    }
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

    socket.emit(
      "addedItem",
      { noteId, userEmail: getState().user.user.email },
      (data) => {
        console.log(data);
      }
    );
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
    socket.emit(
      "addedItem",
      { noteId, itemId, userEmail: getState().user.user.email },
      (data) => {
        console.log(data);
      }
    );
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
