import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "../../store/reducers/posts_reducer";
import PostsIndexItem from "../PostsIndexItem";
import "./PostIndex.scss";

const PostsIndex = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getPosts);

  // Fetch all the posts
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <div className="posts-index-page">
        <div className="posts-index-title">
          <h3>All Posts</h3>
        </div>
        <div className="posts-container">
          {posts &&
            posts.map((post) => {
              return <PostsIndexItem post={post} key={post._id} />;
            })}
        </div>
      </div>
    </>
  );
};

export default PostsIndex;
