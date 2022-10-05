import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosts } from "../../store/reducers/posts_reducer";
import { PostItem } from "./PostItem"

const SearchIndex = () => {
    const posts = useSelector(getPosts);

    let searchResults;
    if (posts.length === 0) {
        searchResults = (
            <div className="search-error">no matching posts found...</div>
        )
    } else {
        searchResults = (
            <>
                <ul className="search-result-list">
                    {posts.map(post => 
                        <li><PostItem key={post.id} post={post}/></li>
                    )}
                </ul>
            </>
        )
    }

    return (
        <>  <h1 id="search-header">Matching Results</h1>
            {searchResults}
        </>
    )
}

export default SearchIndex;