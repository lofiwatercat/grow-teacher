import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/reducers/posts_reducer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./PostsForm.css";

const PostsForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [itemFields, setItemFields] = useState([
    { name: "", totalCost: "", amount: "", details: "", status: false },
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
      totalCost: "",
      amount: "",
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
  };

  return (
    <>
      {sessionUser && (
        <div className="posts-form-container">
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
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <TextField
              id="outlined-basic"
              label="Body"
              variant="outlined"
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              required
            />
            {itemFields.map((input, index) => {
              return (
                <div key={index}>
                  item
                  <TextField
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
                  />
                  <TextField
                    label="Amount"
                    name="amount"
                    variant="outlined"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.amount}
                    required
                  />
                  <TextField
                    label="Details"
                    name="details"
                    variant="outlined"
                    onChange={(e) => handleItemChange(e, index)}
                    value={input.details}
                    required
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
