import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/reducers/posts_reducer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./PostsForm.scss";
import { useHistory } from "react-router-dom"

const PostsForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [itemFields, setItemFields] = useState([
    { name: "", totalCost: 1.0, amount: 1, details: "", status: false },
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

  const addItems = (e) => {
    e.preventDefault();
    let newItem = {
      name: "",
      totalCost: 1,
      amount: 1,
      details: "",
      status: false,
    };
    setItemFields([...itemFields, newItem]);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    let data = [...itemFields];
    data.splice(index, 1);
    setItemFields(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewPost({
      ...newPost,
      items: itemFields,
      status: false,
    });

    // items field coming in as empty array on submit even though itemInput is not empty
    // thus, have to make a copy of newPost, and reassign the items field
    let copy = newPost;
    copy.items = itemFields;
    dispatch(createPost(copy));
    // history.push(`/posts/${postId}`)
  };

  return (
    <>
      {sessionUser && (
        <div className="posts-form-container">
          <h1>Create a new post!</h1>
          <Box
            className="posts-form"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={
                !(
                  newPost.title.length === 0 ||
                  newPost.title.length >= 2 &&
                  newPost.title.length <= 60
                )
              }
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
              helperText="Title must be between 2 and 60 characters"
            />
            <TextField
            error={
                !(
                  newPost.body.length === 0 ||
                  newPost.body.length >= 2 &&
                  newPost.body.length <= 255
                )
              }
              helperText="Body must be between 2 and 255 characters"
              id="outlined-basic"
              label="Body"
              variant="outlined"
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              required
            />
            <h3>Items:</h3>
            {itemFields.map((input, index) => {
              return (
                <div key={index}>
                  <TextField
                    error={!(input.name.length === 0 || input.name.length >= 1)}
                    label="Name"
                    name="name"
                    variant="outlined"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.name}
                    required
                  />
                  <TextField
                    label="Total Cost"
                    name="totalCost"
                    variant="outlined"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.totalCost}
                    required
                    type="number"
                    error={input.totalCost <= 0}
                    helperText={
                      input.totalCost <= 0
                        ? "Invalid amount"
                        : "Please enter a number in dollars"
                    }
                  />
                  <TextField
                    error={input.amount <= 0}
                    label="Amount"
                    name="amount"
                    variant="outlined"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.amount}
                    required
                    type="number"
                    helperText={
                      input.amount <= 0 ? "Amount cannot be less than 1" : ""
                    }
                  />
                  <TextField
                    label="Details"
                    name="details"
                    variant="outlined"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.details}
                  />
                  <button onClick={(e) => removeItem(e, index)}>Remove</button>
                </div>
              );
            })}
            <button onClick={addItems}>Add item</button>
            <button onClick={handleSubmit}>Create</button>
          </Box>
        </div>
      )}
    </>
  );
};

export default PostsForm;
