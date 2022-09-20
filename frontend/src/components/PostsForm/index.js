import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/reducers/posts_reducer";
import "./PostsForm.css";

const PostsForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let item = {
    name: "",
    totalCost: "",
    amount: "",
    comments: "",
  };
  const [newItem, setNewItem] = useState(item);

  let post = {
    title: "",
    body: "",
    items: [],
  };
  const [newPost, setNewPost] = useState(post);

  const handleItemChange = (e, field) => {
    setNewItem({ ...newItem, [field]: e.currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let itemInput = [newItem]

    setNewPost({
      ...newPost,
      items: itemInput,
    });

    // items field coming in as empty array on submit even though itemInput is not empty
    // thus, have to make a copy of newPost, and reassign the items field
    let copy = newPost;
    copy.items = itemInput;
    dispatch(createPost(copy));
  };

  return (
    <>
    {sessionUser && 
      <div className="posts-form-container">
        <form className="posts-form">
          <input
            placeholder="Title"
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <input
            placeholder="Body"
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            required
          />
          <div>
            <label>
              item
              <input
                placeholder="Name"
                onChange={(e) => handleItemChange(e, "name")}
                required
              />
              <input
                placeholder="Total Cost"
                onChange={(e) => handleItemChange(e, "totalCost")}
                required
              />
              <input
                placeholder="Amount"
                onChange={(e) => handleItemChange(e, "amount")}
                required
              />
              <input
                placeholder="Comments"
                onChange={(e) => handleItemChange(e, "comments")}
              />
            </label>
          </div>
          <button onClick={handleSubmit}>Create</button>
        </form>
      </div>
    }
    </>
  );
};

export default PostsForm;
