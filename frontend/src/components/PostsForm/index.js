import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/reducers/posts_reducer";
import "./PostsForm.css";

const PostsForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [itemFields, setItemFields] = useState([
    { name: "", totalCost: "", amount: "", comments: "" },
  ]);
  const dispatch = useDispatch();

  let post = {
    title: "",
    body: "",
    items: [],
  };
  const [newPost, setNewPost] = useState(post);

  const handleItemChange = (e, index) => {
    let data = [...itemFields];
    data[index][e.target.name] = e.target.value;
    setItemFields(data);
  };

  const addItems = () => {
    let newItem = { name: "", totalCost: "", amount: "", comments: "" };
    setItemFields([...itemFields, newItem]);
  };

  const removeItem = (index) => {
    let data = [...itemFields];
    data.splice(index, 1);
    setItemFields(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewPost({
      ...newPost,
      items: itemFields,
    });

    // items field coming in as empty array on submit even though itemInput is not empty
    // thus, have to make a copy of newPost, and reassign the items field
    let copy = newPost;
    copy.items = itemFields;
    console.log(copy);
    dispatch(createPost(copy));
  };

  return (
    <>
      {sessionUser && (
        <div className="posts-form-container">
          <form className="posts-form">
            <input
              placeholder="Title"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <input
              placeholder="Body"
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              required
            />
            {itemFields.map((input, index) => {
              return (
                <div key={index}>
                  item
                  <input
                    name="name"
                    placeholder="Name"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.name}
                    required
                  />
                  <input
                    name="totalCost"
                    placeholder="Total Cost"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.name}
                    required
                  />
                  <input
                    name="amount"
                    placeholder="Amount"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.name}
                    required
                  />
                  <input
                    name="comments"
                    placeholder="Comments"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.name}
                  />
                  <button onClick={() => removeItem(index)}>Remove</button>
                </div>
              );
            })}
            <button onClick={addItems}>Add item</button>
            <button onClick={handleSubmit}>Create</button>
          </form>
        </div>
      )}
    </>
  );
};

export default PostsForm;
