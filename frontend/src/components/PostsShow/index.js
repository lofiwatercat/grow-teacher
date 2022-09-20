import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from 'react-router-dom';
import "./PostsShow.scss"
import { fetchPost, getPost } from "../../store/reducers/posts_reducer"

const PostsShow = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { postId } = useParams()

  const post = useSelector(getPost(postId)) 

  useEffect(() => {
    dispatch(fetchPost(postId))
  }, [])

  // Exit out for first render
  if (!post) return null;
  console.log("in post show", post)

  return (
    <>
      <div id="post-show">
        {post && console.log(post.title)}
      </div>
    </>
  );
};

export default PostsShow;
