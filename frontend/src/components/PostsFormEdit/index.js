import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, fetchPost, getPost } from "../../store/reducers/posts_reducer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./PostsFormEdit.scss";
import { useHistory, useParams } from "react-router-dom"

const PostsForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [itemFields, setItemFields] = useState([
  ]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams()

  // Function that we call in the use effect to populate the items
  const populateItems = (i) => {
    let newItem = post.items[i] 
    setItemFields([...itemFields, newItem]);
  };

  let post = useSelector(getPost(postId))

  useEffect( () => {
    // Fetch the post info
    dispatch(fetchPost(postId))
    let postItems = []
    console.log(post)
    if (post.title) {
      for (let i = 0; i < post.items.length; i++) {
        postItems.push(post.items[i])
      }
      if (itemFields.length !== postItems.length) {
        setItemFields(postItems)
      }
    }
  }, [])

  if (!post) {
    post = {
      title: "",
      body: "",
      items: []
    }
  }

  // Make an array of the post items, and set the itemFields to it

  const [newPost, setNewPost] = useState(post);

  const handleItemChange = (e, index) => {
    let data = [...itemFields];
    data[index][e.target.name] = e.target.value;
    setItemFields(data);
  };

  // Loop through the item array and populate their fields
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

  const handleSubmit = async (e) => {
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
    let postId = await dispatch(updatePost(copy));
    history.push(`/posts/${post._id}`)
  };

  return (
    <>
      {sessionUser && (
        <div className="posts-form-container">
          <h1>Edit your post</h1>
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
                  (newPost.title.length >= 2 && newPost.title.length <= 60)
                )
              }
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              value={newPost.title}
              required
              helperText="Title must be between 2 and 60 characters"
            />
            <TextField
              error={
                !(
                  newPost.body.length === 0 ||
                  (newPost.body.length >= 2 && newPost.body.length <= 255)
                )
              }
              helperText="Body must be between 2 and 255 characters"
              id="outlined-basic"
              label="Body"
              variant="outlined"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              required
            />
            <h3>Items:</h3>
            {itemFields.map((input, index) => {
              return (
                <div className="item-container" key={index}>
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
                    helperText={input.totalCost <= 0 ? "Invalid amount" : ""}
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
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={(e) => removeItem(e, index)}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addItems}
            >
              Add item
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Update
            </Button>
          </Box>
        </div>
      )}
    </>
  );
};

export default PostsForm;
