import { useState } from "react";
import { useSelector } from "react-redux";

const PostsShow = () => {
  const sessionUser = useSelector(state => state.session.user)

  let post = {
    author: {},
    title: "",
    body: "",
    items: [],
  }
  const [newPost, setNewPost] = useState(post)
  const handleSubmit = (e) => {
    // setNewPost({...newPost, newPost.author: {}})
    e.preventDefault();
  }

  return (
    <>
      <div>
      </div>
    </>
  );
};

export default PostsShow;
