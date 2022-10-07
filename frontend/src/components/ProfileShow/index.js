import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";

import { fetchUserPosts, getPosts } from "../../store/reducers/posts_reducer";

import ProfilePostItem from "../ProfilePostItem"

const ProfileShow = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector(getPosts);

  // I want to fetch all of the user's posts, useEffect here?
  useEffect(() => {
    dispatch(fetchUserPosts(user))
  }, [user])


  return (
  <>
      <div className="profile-show">
        <div className="user-info">
          <p>username: {user.username}</p>
          <p>email: {user.email}</p>
        </div>
        <div className="user-posts">
          {/* User posts go in here*/}
          {posts.map((post) => {
            return <ProfilePostItem post={post} key={post._id} />;
          })}
        </div>
      </div>
  </>
  )

}

export default ProfileShow;
