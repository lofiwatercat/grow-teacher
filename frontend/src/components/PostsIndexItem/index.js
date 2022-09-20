import './PostsIndexItem.scss' 

// Receieves a post from index
const PostsIndexItem = ({ post }) => {
  return (
    <div class="posts-index-item">
      <div class="item-image">
        INSERT PICTURE HERE
      </div>
      <div class="item-text">
        <p>{post.title}</p>
        <p>{post.body}</p>
      </div>
    </div>
  )
}

export default PostsIndexItem;
