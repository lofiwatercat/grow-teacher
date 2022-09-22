import jwtFetch from "../jwt";

export const RECEIVE_COMMENT = "posts/RECEIVE_COMMENT ";
export const RECEIVE_COMMENTS = "posts/RECEIVE_COMMENTS";
export const REMOVE_COMMENT  = "posts/REMOVE_COMMENT ";

// Actions
const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

const removeComment = (comment) => ({
  type: REMOVE_COMMENT,
  comment,
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

// export const fetchcomments = () => async (dispatch) => {
//   const res = await fetch("/api/comments");

//   if (res.ok) {
//     const comments = await res.json();
//     return dispatch(receiveComments(comments));
//   }
// };

// export const fetchComment = (id) => async (dispatch) => {
//   const res = await fetch(`/api/comments/${id}`);

//   if (res.ok) {
//     const comment = await res.json();
//     return dispatch(receiveComment(comment));
//   }
// };

//create a comment
export const createComment = (comment, postId) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts/${postId}/comment`, {
    method: "POST",
    body: JSON.stringify(comment, postId),
  });

  if (res.ok) {
    const newComment = await res.json();
    return dispatch(receiveComment(newComment));
  }
};

export const updatePost = (comment, postId) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts/${postId}/comment/${comment.id}/edit`, {
    method: "PATCH",
    body: JSON.stringify(comment, postId),
  });

  if (res.ok) {
    const comment = await res.json();
    return dispatch(receiveComment(comment));
  }
};

export const deleteComment = (comment, postId) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts/${postId}/comment/${comment.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(removeComment(comment));
  }
};

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  
  let nextState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    case RECEIVE_COMMENT:
      nextState[action.comment._id] = action.comment;
      return nextState;
    case REMOVE_COMMENT:
      delete nextState[action.comment.id];
      return nextState;
    default:
      return nextState;
  }
};

export default commentsReducer;
