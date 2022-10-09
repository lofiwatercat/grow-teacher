import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/reducers/comments_reducer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CommentsForm.scss";

const CommentsForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const payload = {
    body: "",
  };

  const [comment, setComment] = useState(payload);

  const handleChange = (e) => {
    let input = e.target.value;
    if (input.length >= 500) input = input.slice(0, 500);
    setComment({ ...comment, body: input });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.body.length >= 2 && comment.body.length <= 500) {
      dispatch(createComment({ ...comment, post: postId }, postId));
      setComment(payload);
    }
  };

  return (
    <>
      <div className="comments-form">
        <TextField
          className="comments-form-input"
          error={
            !(comment.body.length === 0) &&
            (comment.body.length < 2 || comment.body.length > 500)
          }
          id="outlined-basic"
          label="Have something to contribute?"
          variant="outlined"
          onChange={handleChange}
          required
          multiline
          minRows={4}
          helperText="Comment must be between 2 and 500 characters"
          placeholder="Contribute to the conversation"
          value={comment.body}
        />
        <div className="comments-form-button-container">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CommentsForm;
