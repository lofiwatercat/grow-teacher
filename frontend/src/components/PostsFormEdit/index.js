import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePost,
  fetchPost,
  getPost,
} from "../../store/reducers/posts_reducer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useHistory, useParams } from "react-router-dom";
import { Pane, Dialog } from "evergreen-ui";

const PostsFormEdit = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [itemFields, setItemFields] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();

  let post = useSelector(getPost(postId));

  useEffect(() => {
    // Fetch the post info
    dispatch(fetchPost(postId));
    let postItems = [];
    // populate the items
    if (post.title) {
      for (let i = 0; i < post.items.length; i++) {
        postItems.push(post.items[i]);
      }
      if (itemFields.length !== postItems.length) {
        setItemFields(postItems);
      }
    }
    setImagePreview(post.imageUrl);
  }, [postId]);

  if (!post) {
    post = {
      title: "",
      body: "",
      items: [],
    };
  }

  const [newPost, setNewPost] = useState(post);

  const handleTextChange = (e, field) => {
    let input = e.target.value;
    if (field === "title") {
      if (input.length >= 60) input = input.slice(0, 60);
      setNewPost({ ...newPost, title: input });
    } else {
      if (input.length >= 1000) input = input.slice(0, 1000);
      setNewPost({ ...newPost, body: input });
    }
  };

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

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    setImageUrl(file);

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImagePreview(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    let data = [...itemFields];
    data.splice(index, 1);
    setItemFields(data);
  };

  const handleErrors = async (updatedPost) => {
    let errorsArr = [];

    if (updatedPost.title.length <= 1) {
      errorsArr.push("Invalid title length");
    }
    if (updatedPost.body.length <= 1) {
      errorsArr.push("Invalid description length");
    }

    if (itemFields.length === 0) {
      errorsArr.push("Please include at least one item");
    }

    updatedPost.items.forEach((item, i) => {
      if (item.name.length === 0) {
        errorsArr.push(`Item ${i + 1}: Invalid name length`);
      }
      if (item.totalCost < 1) {
        errorsArr.push(`Item ${i + 1}: Invalid total cost`);
      }
      if (item.amount < 1) {
        errorsArr.push(`Item ${i + 1}: Invalid amount`);
      }
    });

    setErrors(errorsArr);
    return errorsArr;
  };

  const handleCloseErrors = () => {
    setShowErrors(false);
    setErrors([]);
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

    let postErrors = await handleErrors(copy);
    if (postErrors.length !== 0) {
      setShowErrors(true);
      return;
    } else {
      let postId = await dispatch(updatePost(copy, imageUrl));
      history.push(`/posts/${post._id}`);
    }
  };

  return (
    <>
      {sessionUser && (
        <div className="posts-form-container">
          <div className="posts-form-header">
            <h1>Update your post!</h1>
          </div>
          <div className="posts-form-topic-container">
            <div className="posts-form-topic">
              <div className="posts-form-title-container">
                <TextField
                  className="posts-form-title"
                  error={
                    !(newPost.title.length >= 2 && newPost.title.length <= 60)
                  }
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={newPost.title}
                  onChange={(e) => handleTextChange(e, "title")}
                  required
                  helperText="Title must be between 2 and 60 characters"
                />
              </div>

              <TextField
                className="posts-form-body"
                error={
                  !(newPost.body.length >= 2 && newPost.body.length <= 1000)
                }
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                value={newPost.body}
                onChange={(e) => handleTextChange(e, "body")}
                minRows={14}
                required
                helperText="Description must be between 2 and 1000 characters"
                placeholder="Description"
              />
            </div>
            <div
              className="posts-form-image-container"
              style={{
                backgroundImage: `url(${imagePreview})`,
              }}
            >
              {!imagePreview && <h1>Upload an image!</h1>}
            </div>
          </div>
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

                <div className="remove-item-button">
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={(e) => removeItem(e, index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="add-item-button">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addItems}
            >
              Add item
            </Button>
          </div>
          <div className="create-button">
            <Button variant="contained" onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </div>
      )}
      {showErrors && (
        <Pane>
          <Dialog
            isShown={showErrors}
            title="Please meet the requirements of all fields"
            onCloseComplete={() => handleCloseErrors()}
            preventBodyScrolling
            confirmLabel="Got it!"
            minHeightContent={0}
          >
            {errors.map((error, i) => (
              <p className="post-errors" key={i}>
                {error}
              </p>
            ))}
          </Dialog>
        </Pane>
      )}
    </>
  );
};

export default PostsFormEdit;
