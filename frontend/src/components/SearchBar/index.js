import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from "../../store/reducers/posts_reducer";
import { useHistory } from "react-router-dom";
import { getSearchedPosts } from "../../store/reducers/posts_reducer";
import "./SearchBar.css";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getSearchedPosts(query));
        history.push(`/search/${query}`);
        setQuery("");
    }

  return (
    <>
      <div className="search-bar-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            id="search-input"
            type="text"
            onChange={e => setQuery(e.target.value)}
            placeholder={`Search by title, body, and item`}
            autoFocus="autofocus"
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;