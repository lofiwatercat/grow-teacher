import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteComment, updateComment } from "../../store/reducers/comments_reducer";
import { useParams } from "react-router-dom";

const CommentsIndexItem = ({ comment }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [body, setBody] = useState(comment.body);
  const { postId } = useParams();

  const handleClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleChange = (e) =>{
    e.preventDefault();
    setBody(e.target.value);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(comment._id, postId));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.length <= 1) {
      window.alert("body must be at least 2 characters")
    } else {
      dispatch(updateComment({...comment, body}, postId))
    }
    setShowForm(false);
  }

  return (
    <>
      <div className="comments-index-item">
        <p>{comment.body}</p>
        <div>
          {sessionUser && sessionUser._id === comment.author && (
            <>
            <button onClick={handleClick}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </>
          )}
          {showForm && <form onSubmit={handleSubmit}>
            <input type="text" value={body} onChange={handleChange} />
            <button>Submit</button>
            </form>}
        </div>
      </div>
    </>
  );
};

export default CommentsIndexItem;
