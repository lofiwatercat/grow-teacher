import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, getPosts } from "../../store/reducers/posts_reducer";
import { useHistory } from "react-router-dom";
import { getSearchedPosts } from "../../store/reducers/posts_reducer";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    // const [searchField, setSearchField] = useState("");
    const history = useHistory();

    const posts = useSelector(getPosts);

    // useEffect(()=>{
    //     dispatch(getSearchedPosts())
    // },[])

    // const handleChange = (e) => {
    //     setSearchField(e.target.value);

    //     if (e.target.value === "") {
    //         return setResults([]);
    //     }

    //     const filteredPosts = [];
    //     posts.map(post=>{
    //         if(post.title.toLowerCase().includes(e.target.value.toLowerCase())){
    //             filteredPosts.push(post)
    //         }
    //         if(post.body.toLowerCase().includes(e.target.value.toLowerCase())){
    //             filteredPosts.push(post)
    //         }
    //         if(post.item.name.toLowerCase().includes(e.target.value.toLowerCase())){
    //             filteredPosts.push(post)
    //         }
    //     })
    //     setResults(filteredPosts)
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getSearchedPosts(query));
        history.push("/search");
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
        {/* <button onClick={handleSubmit} className="search-bar-icon">
          {<FaSearch fontSize={"24px"} />}
        </button> */}
      </div>
    </>
  );
};

export default SearchBar;