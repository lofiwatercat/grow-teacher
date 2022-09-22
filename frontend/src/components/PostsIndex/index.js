import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "../../store/reducers/posts_reducer"
import PostsIndexItem from "../PostsIndexItem"
import "./PostIndex.scss";

const PostsIndex = () => {
  const dispatch = useDispatch()

  const posts = useSelector(getPosts)

  // Fetch all the posts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [])


  return (
    <>
      <div className="posts-container">
        {posts.map(post => {
          return <PostsIndexItem post={post} key={post._id} />
        })
      }
      </div>
    </>
  );
};

export default PostsIndex;
