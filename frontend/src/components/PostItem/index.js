import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { updatePost } from "../../store/reducers/posts_reducer"

const PostItem = ({ post, item, authorId}) => {
  let currentUserId = useSelector(state => state.session.user._id)
  let dispatch = useDispatch()

  const [itemStatus, newItemStatus] = useState(item.status)


  useEffect(() => {
  }, [itemStatus])

  let statusText = "needed"
  if (item.status) {
    statusText = "fufilled"
  }


  // Switch the item's status
  console.log("First itemStatus", itemStatus)
  const handleStatus = (e) => {
    newItemStatus(!itemStatus);

    // Change the item in the post data
    console.log("ItemStatus", itemStatus)
    for (let i = 0; i < post.items.length; i++) {
      let arrayItem = post.items[i];
      if (arrayItem._id === item._id) {
        post.items[i].status = itemStatus;
        console.log(post.items[i].status)
      }
    }

    dispatch(updatePost(post))

  }


  return (
  <div className="post-item">
      <p>{item.name}</p>
      <p>{item.amount}</p>
      <p>${item.totalCost}</p>
      <p>{statusText}</p>
      <button onClick={handleStatus} >Toggle status</button>
  </div>
  )
}

export default PostItem;
