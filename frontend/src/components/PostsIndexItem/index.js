import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./PostsIndexItem.scss";

// Receieves a post from index
const PostsIndexItem = ({ post }) => {
  return (
    <>
      <Link className="post-index-item" to={`/posts/${post._id}`}>
        <Card sx={{ maxWidth: 340, height: 340 }}>
          <CardMedia component="img" height="170" image={post.imageUrl} alt="post" />
          <CardContent>
            <Typography sx={{ textDecoration: "none" }} className="card-text" gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.author_name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default PostsIndexItem;
