import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteComment,
  updateComment,
} from "../../store/reducers/comments_reducer";
import { useParams } from "react-router-dom";
import { Pane, Dialog } from "evergreen-ui";
import "./CommentsIndexItem.scss";

const CommentsIndexItem = ({ comment }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [body, setBody] = useState(comment.body);
  const { postId } = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  };

  const handleSubmit = () => {
    if (showEdit) {
      if (body.length <= 1) {
        window.alert("body must be at least 2 characters");
      } else {
        dispatch(updateComment({ ...comment, body }, postId));
      }
    } else {
      dispatch(deleteComment(comment._id, postId));
    }
    setShowEdit(false);
    setShowDelete(false);
  };

  const handleClose = () => {
    setShowEdit(false);
    setShowDelete(false);
    setBody(comment.body);
  };

  return (
    <>
      <div className="comments-index-item">
        <p>{comment.body}</p>
        <div>
          {sessionUser && sessionUser._id === comment.author && (
            <>
              <button onClick={() => setShowEdit(true)}>Edit</button>
              <button onClick={() => setShowDelete(true)}>Delete</button>
            </>
          )}
        </div>
      </div>
      {(showEdit || showDelete) && (
        <Pane>
          <Dialog
            isShown={showEdit || showDelete}
            title={showEdit ? "Edit Comment" : "Delete Comment"}
            intent={showDelete ? "danger" : ""}
            preventBodyScrolling
            onCloseComplete={() => handleClose()}
            confirmLabel={showEdit ? "Edit" : "Delete"}
            onConfirm={() => handleSubmit()}
          >
            {showEdit ? (
              <div className="comment-modal">
                <form onSubmit={handleSubmit}>
                  <input type="text" value={body} onChange={handleChange} />
                </form>
              </div>
            ) : (
              <div className="comment-modal">
                Are you sure you want to delete this comment?
              </div>
            )}
          </Dialog>
        </Pane>
      )}
    </>
  );
};

export default CommentsIndexItem;
