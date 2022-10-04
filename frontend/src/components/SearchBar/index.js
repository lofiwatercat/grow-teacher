import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  return (
    <>
      <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
          <input
            className="search-bar"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search by title, body, and item`}
          />
        </form>
        <button onClick={handleSubmit} className="search-bar-icon">
          {<FaSearch fontSize={"24px"} />}
        </button>
      </div>
    </>
  );
};

export default SearchBar;