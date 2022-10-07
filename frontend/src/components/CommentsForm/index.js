import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/reducers/comments_reducer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./CommentsForm.scss";

const CommentsForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const payload = {
    body: "",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#fdd250",
        contrastText: "#000",
      },
    },
  });

  const [comment, setComment] = useState(payload);

  const handleChange = (e) => {
    setComment({ ...comment, body: e.target.value });
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
        />
        <div className="comments-form-button">
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral" onClick={handleSubmit}>
              Submit
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default CommentsForm;
