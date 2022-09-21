import { useSelector } from "react-redux"

const PostItem = ({ item, authorId}) => {
  let currentUserId = useSelector(state => state.session.user._id)

  console.log("authorId", authorId)
  console.log("currentUser", currentUserId)
  return (
  <div className="post-item">
      <p>{item.name}</p>
      <p>{item.amount}</p>
      <p>${item.totalCost}</p>
  </div>
  )
}

export default PostItem;
