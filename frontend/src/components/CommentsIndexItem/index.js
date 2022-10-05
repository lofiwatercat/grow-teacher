import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteComment,
  updateComment,
} from "../../store/reducers/comments_reducer";
import { useParams } from "react-router-dom";
import { Pane, Dialog } from "evergreen-ui";
import { TextareaField } from "evergreen-ui";
import { CgProfile } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./CommentsIndexItem.scss";
import { cuteTimeAgo } from "../../utils/dateUtil";

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
      if (!(body.length < 2 || body.length > 255)) {
        dispatch(updateComment({ ...comment, body }, postId));
        setShowEdit(false);
        setShowDelete(false);
      }
    } else {
      dispatch(deleteComment(comment._id, postId));
      setShowEdit(false);
      setShowDelete(false);
    }
  };

  const handleClose = () => {
    setShowEdit(false);
    setShowDelete(false);
    setBody(comment.body);
  };

  return (
    <>
      <div className="comments-index-item">
        <div className="comments-item-header">
          <div className="comments-item-pic">
            <CgProfile width={"100%"} fontSize={"2.25rem"} />
          </div>
          <div className="comments-author">
            <div className="comments-author-inner">
              <p>{comment.username}</p>
              <p className="comments-time">{cuteTimeAgo(comment.updatedAt)}</p>
            </div>
            <div className="comments-item-buttons">
              {sessionUser && sessionUser._id === comment.author && (
                <>
                  <button onClick={() => setShowEdit(true)}>
                    <FiEdit fontSize={"1.2rem"} />
                  </button>
                  <button onClick={() => setShowDelete(true)}>
                    <RiDeleteBin6Line fontSize={"1.2rem"} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="comments-item-body">
          <p>{comment.body}</p>
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
                <TextareaField
                  className="comment-edit-form"
                  validationMessage={
                    body.length < 2 || body.length > 255
                      ? "Body must be between 2 and 255 characters"
                      : null
                  }
                  label="Please type your new comment"
                  onChange={handleChange}
                  value={body}
                  required
                />
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
