import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../store/reducers/comments_reducer";

const CommentsForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const payload = {
    body: "",
  };

  const [comment, setComment] = useState(payload);

  const handleChange = (e) => {
    setComment({ ...comment, body: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // debugger
    dispatch(createComment({...comment, post: postId}, postId));
    setComment(payload);
  };

  return (
    <>
      <div>
        <form>
          <textarea value={comment.body} onChange={handleChange}></textarea>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default CommentsForm;
