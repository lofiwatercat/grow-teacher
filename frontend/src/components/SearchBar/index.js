import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchedPosts } from "../../store/reducers/posts_reducer";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchedPosts(query));
    history.push(`/search/${query}`);
    setQuery("");
  };

  return (
    <>
      <div className="search-bar-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            id="search-input"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search by title and description`}
            autoFocus="autofocus"
          />
          <a href="#">
            <FaSearch />
          </a>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
