import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosts } from "../../store/reducers/posts_reducer";
import PostsIndexItem from "../PostsIndexItem";

const SearchIndex = () => {
  const posts = useSelector(getPosts);
  const { query } = useParams();

  let searchResults;
  if (posts.length === 0) {
    searchResults = (
      <div className="posts-index-page">
        <div className="posts-index-title">
          <h3>{`No matching posts found for "${query}"`}</h3>
        </div>
      </div>
    );
  } else {
    searchResults = (
      <>
        <div className="posts-index-page">
          <div className="posts-index-title">
            <h3>{`Matching posts found for "${query}"`}</h3>
          </div>
          <div className="posts-container">
            {posts && posts.map((post) => {
              return <PostsIndexItem post={post} key={post._id} />;
            })}
          </div>
        </div>
      </>
    );
  }

  return <>{searchResults}</>;
};

export default SearchIndex;
