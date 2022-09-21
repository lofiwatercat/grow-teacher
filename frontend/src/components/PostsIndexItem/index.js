import { Link } from 'react-router-dom';
import './PostsIndexItem.scss' 

// Receieves a post from index
const PostsIndexItem = ({ post }) => {
  return (
    <div class="posts-index-item">
      <div class="item-image">
        INSERT PICTURE HERE
      </div>
      <div class="item-text">
        <Link to={`posts/${post._id}`}>{post.title}</Link>
        <p>{post.body}</p>
      </div>
    </div>
  )
}

export default PostsIndexItem;
