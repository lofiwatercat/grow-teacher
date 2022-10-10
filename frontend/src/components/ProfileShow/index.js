import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchUserPosts, getPosts } from "../../store/reducers/posts_reducer";

import ProfilePostItem from "../ProfilePostItem";
import "./ProfileShow.scss";

const ProfileShow = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector(getPosts);
  const [body, setBody] = useState();

  useEffect(() => {
    dispatch(fetchUserPosts(user));
  }, [user]);

  return (
    <>
      <div className="posts-index-page">
        <div className="posts-index-title">
          <h3>Welcome to your profile!</h3>
        </div>
        <div className="user-info-container">
          <div className="user-info">
            <div className="user-info-details">
              <span>username:</span>
              <p>{user.username}</p>
            </div>
            <div className="user-info-details">
              <span>email:</span>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="posts-container">
          {posts.map((post) => {
            return <ProfilePostItem post={post} key={post._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileShow;
