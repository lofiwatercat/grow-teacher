import { useState } from "react";
import { useSelector } from "react-redux";
import "./PostsForm.css";

const PostsForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  let item = {
    name: "",
    totalCost: "",
    amount: "",
    comments: "",
  };
  const [newItem, setNewItem] = useState(item);

  let post = {
    author: {},
    title: "",
    body: "",
    items: [],
  };
  const [newPost, setNewPost] = useState(post);
  const handleSubmit = (e) => {
    e.preventDefault();
    setNewPost({
      ...newPost,
      author: { username: sessionUser.username, email: sessionUser.email },
    });
  };

  return (
    <>
      <div className="posts-form-container">
        <form className="posts-form">
          <input
            placeholder="Title"
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <input
            placeholder="Body"
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <div>
            <label>
              item
              <input placeholder="Name" />
              <input placeholder="Total Cost"/>
              <input placeholder="Amount"/>
              <input placeholder="Comments"/>
            </label>
          </div>
          <button onClick={handleSubmit}>Create</button>
        </form>
      </div>
    </>
  );
};

export default PostsForm;
