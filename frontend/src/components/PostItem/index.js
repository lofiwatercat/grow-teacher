import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { updatePost, fetchPost, updatePostNoDispatch } from "../../store/reducers/posts_reducer"

const PostItem = ({ currentProgress, setCurrentProgress, post, item, authorId}) => {
  let currentUserId = useSelector(state => state.session.user._id)
  let dispatch = useDispatch()
  const didMount = useRef(false)

  const [itemStatus, newItemStatus] = useState(item.status)


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
            setCurrentProgress(currentProgress + arrayItem.totalCost)
          } else {
            setCurrentProgress(currentProgress - arrayItem.totalCost)
          }
        }
      }

      // Update the post in the backend, but don't need to update the store
      // because we did that in the for loop already
      dispatch(updatePostNoDispatch(post, post.imageUrl))

    } else {
      didMount.current = true;
    }
  }, [itemStatus])

  let statusText = "needed"
  if (item.status) {
    statusText = "fufilled"
  }

  let statusColor = "red";
  if (item.status) {
    statusColor = "green";
  }


  // Switch the item's status
  const handleStatus = (e) => {
    e.preventDefault();
    newItemStatus(!itemStatus);
  }

  // If current user is post creator, allow them to edit item status
  if (authorId === currentUserId) {
  return (
  <div className="post-item">
      <p className="first-p">{item.name}</p>
      <p>{item.amount}</p>
      <p>${item.totalCost}</p>
      <p>{statusText}</p>
      <span className={`status-circle ${statusColor}`}></span>
      <button className="toggle-button" onClick={handleStatus} >Toggle</button>
  </div>
    )} else {
  return (
  <div className="post-item">
      <p>{item.name}</p>
      <p>{item.amount}</p>
      <p>${item.totalCost}</p>
      <span className={`status-circle ${statusColor}`}></span>
  </div>
    )}
}

export default PostItem;
