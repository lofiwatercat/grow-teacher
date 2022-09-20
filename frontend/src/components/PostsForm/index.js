import { useState } from "react";
import { useSelector } from "react-redux";

const PostsForm = () => {
  const sessionUser = useSelector(state => state.session.user)

  let post = {
    
  }
  const [newPost, setNewPost] = useState()
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div>
        <form></form>
      </div>
    </>
  );
};

export default PostsForm;
