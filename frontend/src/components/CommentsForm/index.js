import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/reducers/comments_reducer";
import { TextareaField } from "evergreen-ui";
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
    if (comment.body.length >= 2 && comment.body.length <= 255) {
      dispatch(createComment({ ...comment, post: postId }, postId));
      setComment(payload);
    }
  };

  return (
    <>
      <div className="comments-form">
        <TextareaField
          validationMessage={
            comment.body.length < 2 || comment.body.length > 255
              ? "Body must be between 2 and 255 characters"
              : null
          }
          label="Have something to contribute?"
          onChange={handleChange}
          value={comment.body}
          required
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
