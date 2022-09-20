import jwtFetch from "../jwt";

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
    console.log("in selector", `${postId}`)
    console.log(state.entities.posts)
    console.log(state.entities.posts[`${postId}`])
    return state.entities.posts[`${postId}`];
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

export const createPost = (post) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const newPost = await res.json();
    return dispatch(receivePost(newPost));
  }
};

export const updatePost = (post) => async (dispatch) => {
  const res = await jwtFetch(`/api/posts/${post.id}`, {
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
      return action.posts;
    case RECEIVE_POST:
      nextState[action.post._id] = action.post;
      return nextState;
    case REMOVE_POST:
      delete nextState[action.postId];
      return nextState;
    default:
      return nextState;
  }
};

export default postsReducer;
