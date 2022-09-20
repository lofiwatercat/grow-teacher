import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "../../store/reducers/posts_reducer"
import PostsIndexItem from "../PostsIndexItem"

const PostsIndex = () => {
  const dispatch = useDispatch()

  const posts = useSelector(getPosts)

  // Fetch all the posts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [])


  return (
    <>
      <div>
        {posts.map(post => {
          return <PostsIndexItem post={post} />
        })
      }
      </div>
    </>
  );
};

export default PostsIndex;
