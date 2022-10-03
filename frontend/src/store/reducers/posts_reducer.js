import jwtFetch from "../jwt";
import { jwtImageFetch } from "../jwt";
import { RECEIVE_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT } from "./comments_reducer";

export const RECEIVE_POST = "posts/RECEIVE_POST";
export const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
export const REMOVE_POST = "posts/REMOVE_POST";

// Actions
const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
});

const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});

// Selectors
export const getPosts = (state) => {
  if (!state || !state.entities) {
    return [];
  } else {
    return Object.values(state.entities.posts);
  }
};

export const getPost = (postId) => (state) => {
  if (!state) {
    return null;
  } else if (!state.entities.posts) {
    return null;
  } else {
    return state.entities.posts[postId];
  }
};

export const fetchPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts");

  if (res.ok) {
    const posts = await res.json();
    return dispatch(receivePosts(posts));
  }
};

export const fetchPost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`);

  if (res.ok) {
    const post = await res.json();
    return dispatch(receivePost(post));
  }
};

export const createPostWithImage = (post) => async (dispatch) => {
  // debugger;
  const res = await jwtImageFetch(`/api/posts`, {
    method: "POST",
    body: post,
  });

  if (res.ok) {
    const newPost = await res.json();
    return dispatch(receivePost(newPost));
  }
};

export const createPost = (post) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify(post),
  }).catch((res) => {
    return -1;
  });

  if (res.ok) {
    const newPost = await res.json();
    dispatch(receivePost(newPost));
    return newPost;
  } else {
    return -1;
  }
};

export const updatePost = (post) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts/${post._id}`, {
    method: "PATCH",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const newPost = await res.json();
    return dispatch(receivePost(newPost));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(removePost(postId));
  }
};

const postsReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState = { ...state };
  switch (action.type) {
    case RECEIVE_POSTS:
      action.posts.forEach((post) => (nextState[post._id] = post));
      return nextState;
    case RECEIVE_POST:
      nextState[action.post._id] = action.post;
      return nextState;
    case REMOVE_POST:
      delete nextState[action.postId];
      return nextState;
    case RECEIVE_COMMENT:
      let newComment = action.comment;
      nextState[action.comment.post._id].comments.push(newComment);
      return nextState;
    case UPDATE_COMMENT:
      let currentComment = action.comment;
      let comments = nextState[currentComment.post].comments;
      for (let i = 0; i < comments.length; i++) {
        if (currentComment._id === comments[i]._id) {
          console.log("old: ", comments[i].body);
          comments[i] = currentComment;
          console.log("new :", comments[i].body);
        }
      }
      return nextState;
    default:
      return nextState;
  }
};

export default postsReducer;
