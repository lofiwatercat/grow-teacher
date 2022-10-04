import jwtFetch from "../jwt";
import { RECEIVE_POST } from "./posts_reducer";

export const RECEIVE_COMMENTS = "posts/RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "posts/RECEIVE_COMMENT";
export const UPDATE_COMMENT = "posts/UPDATE_COMMENT";
export const REMOVE_COMMENT = "posts/REMOVE_COMMENT";

// Actions
const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

const newComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

// Selectors
export const getComments = (state) => {
  if (!state || !state.entities) {
    return [];
  } else {
    return Object.values(state.entities.comments);
  }
};

export const getComment = (commentId) => (state) => {
  if (!state) {
    return null;
  } else if (!state.entities.comments) {
    return null;
  } else {
    return state.entities.comments[commentId];
  }
};

//create a comment
export const createComment = (comment, postId) => async (dispatch) => {
  // debugger
  const res = await jwtFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(comment, postId),
  });
  if (res.ok) {
    const newComment = await res.json();
    return dispatch(receiveComment(newComment));
  }
};

export const updateComment = (comment, postId) => async (dispatch) => {
  const res = await jwtFetch(
    `/api/posts/${postId}/comments/${comment._id}/edit`,
    {
      method: "PATCH",
      body: JSON.stringify(comment, postId),
    }
  );

  if (res.ok) {
    const comment = await res.json();
    return dispatch(newComment(comment));
  }
};

export const deleteComment = (commentId, postId) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(removeComment(commentId));
  }
};

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENT:
      nextState[action.comment._id] = action.comment;
      return nextState;
    case UPDATE_COMMENT:
      nextState[action.comment._id] = action.comment;
      return nextState;
    case REMOVE_COMMENT:
      delete nextState[action.commentId];
      return nextState;
    case RECEIVE_POST:
      nextState = {};
      if (action.post.comments) {
        action.post.comments.forEach((comment) => {
          return (nextState[comment._id] = comment);
        });
      }
      return nextState;
    default:
      return nextState;
  }
};

export default commentsReducer;
