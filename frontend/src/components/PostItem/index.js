import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  updatePost,
  fetchPost,
  updatePostNoDispatch,
} from "../../store/reducers/posts_reducer";
import "./PostItem.scss";
import Switch from "@mui/material/Switch";

const PostItem = ({
  currentProgress,
  setCurrentProgress,
  post,
  item,
  authorId,
}) => {
  let currentUserId = useSelector((state) => state.session.user._id);
  let dispatch = useDispatch();
  const didMount = useRef(false);

  const [itemStatus, newItemStatus] = useState(item.status);

  useEffect(() => {
    // Don't send a request on first show
    if (didMount.current) {
      // Change the item in the post data
      for (let i = 0; i < post.items.length; i++) {
        let arrayItem = post.items[i];
        if (arrayItem._id === item._id) {
          post.items[i].status = itemStatus;
          // Update current progress
          if (itemStatus === true) {
            setCurrentProgress(currentProgress + arrayItem.totalCost);
          } else {
            setCurrentProgress(currentProgress - arrayItem.totalCost);
          }
        }
      }

      // Update the post in the backend, but don't need to update the store
      // because we did that in the for loop already
      dispatch(updatePostNoDispatch(post, post.imageUrl));
    } else {
      didMount.current = true;
    }
  }, [itemStatus]);

  let statusText = "needed";
  if (item.status) {
    statusText = "fufilled";
  }

  let statusColor = "red";
  if (item.status) {
    statusColor = "green";
  }

  // Switch the item's status
  const handleStatus = (e) => {
    e.preventDefault();
    newItemStatus(!itemStatus);
  };

  const itemLabels = () => {
    return (
      <div className="item-labels">
        <p>Item</p>
        <p>Quantity</p>
        <p>Cost</p>
        <p>Status</p>
      </div>
    );
  };

  return (
    <>
      <div className="post-item">
        <div>
          <p className="post-item-name">{item.name}</p>
        </div>
        <div>
          <p className="post-item-amount">{item.amount}</p>
        </div>
        <div className="post-item-total">
          <p>${item.totalCost}</p>
        </div>
        <div className="post-item-status-text">
          <p>{statusText}</p>
        </div>
        <div className="post-item-status">
          <span className={`status-circle ${statusColor}`}></span>
          {authorId === currentUserId && (
            <Switch onClick={handleStatus} checked={!item.status} />
          )}
        </div>
      </div>
      <div className="post-item-details">
        <div>
          <span className="post-item-details-span">{"Details: "}</span>
          {item.details ? item.details : "No details given"}
        </div>
      </div>
    </>
  );
};

export default PostItem;
