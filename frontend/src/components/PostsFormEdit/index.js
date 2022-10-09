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
import "./PostsFormEdit.scss";
import { useHistory, useParams } from "react-router-dom";
import { Pane, Dialog } from "evergreen-ui";

const PostsFormEdit = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [itemFields, setItemFields] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
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
      setImagePreview(post.imageUrl);
    }
  }, [postId]);

  if (!post) {
    post = {
      title: "",
      body: "",
      items: [],
    };
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
    let postId = await dispatch(updatePost(copy, imageUrl));
    history.push(`/posts/${post._id}`);
  };

  return (
    <>
      {sessionUser && (
        <div className="posts-form-container">
          <div className="posts-form-header">
            <h1>Create a new post!</h1>
          </div>
          <div className="posts-form-topic-container">
            <div className="posts-form-topic">
              <div className="posts-form-title-container">
                <TextField
                  className="posts-form-title"
                  error={
                    !(
                      newPost.title.length === 0 ||
                      (newPost.title.length >= 2 && newPost.title.length <= 60)
                    )
                  }
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  required
                  helperText="Title must be between 2 and 60 characters"
                />
              </div>

              <TextField
                className="posts-form-body"
                error={
                  !(
                    newPost.body.length === 0 ||
                    (newPost.body.length >= 2 && newPost.body.length <= 1000)
                  )
                }
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
                minRows={14}
                required
                helperText="Description must be between 2 and 1000 characters"
                placeholder="Description"
              />
              <div className="posts-form-image-button-container">
                <div className="posts-form-image-button">
                  <Button variant="contained" component="label" disabled>
                    Upload Image
                    <input
                      type="file"
                      onChange={handleFile}
                      accept=".gif,.jpg,.jpeg,.png,.tiff,.raw"
                      required
                      hidden
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div className="posts-form-image-container">
              {!imagePreview && <h1>Upload an image!</h1>}
              {imagePreview && (
                <img
                  className="posts-form-image"
                  src={imagePreview}
                  alt="preview"
                />
              )}
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
              Create
            </Button>
          </div>
        </div>
      )}
      {showErrors && (
        <Pane>
          <Dialog
            isShown={showErrors}
            title="Please meet the requirements of all fields"
            onCloseComplete={() => setShowErrors(false)}
            preventBodyScrolling
            confirmLabel="Got it!"
            minHeightContent={0}
          ></Dialog>
        </Pane>
      )}
    </>
  );
};

export default PostsFormEdit;
