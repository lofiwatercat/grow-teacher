import jwtFetch from "../jwt"

export const RECEIVE_POST = "posts/RECEIVE_POST"
export const RECEIVE_POSTS = "posts/RECEIVE_POSTS"

// Selectors
export const getPosts = state => {
  if (!state || !state.entities) {
    return []
  } else {
    return state.entities.posts
  }
}

export const getPost = postId => state => {
  if (!state) {
    return null;
  } else if (!state.entities.posts) {
    return null;
  } else {
    return state.entities.posts[postId];
  }
}

