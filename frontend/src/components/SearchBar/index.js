import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
    setQuery("");
  };

  useEffect(() => {
    const search = document.querySelector("#search-input");
    search.addEventListener("mouseleave", () => {
      if (search.value) {
        search.style.width = "350px";
        search.style.paddingLeft = "10px";
      } else {
        search.style.width = "0px";
        search.style.paddingLeft = "0px";
      }
    });

    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("mouseover", () => {
      search.style.width = "350px";
      search.style.paddingLeft = "10px";
    });
    searchButton.addEventListener("mouseleave", () => {
      if (!search.value) {
        search.style.width = "0px";
        search.style.paddingLeft = "0px";
      }
    });
  }, []);

  return (
    <>
      <div className="search-bar-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            id="search-input"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search by title of posts!`}
            autoFocus="autofocus"
            value={query}
          />
          <a className="search-button" href="#" onClick={handleSubmit}>
            <FaSearch />
          </a>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
