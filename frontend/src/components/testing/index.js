import { createPost, updatePost, deletePost } from '../../store/reducers/posts_reducer'
import { useState, useEffect } from 'react';
import { useParams, Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const TestingPost = () => {
  const dispatch = useDispatch();


  const handleSubmit = () => {
    dispatch(createPost(testPostData));
  }

  const testPostData = {
  author: "asldkjfljqwer",
  title: "Need Some lovin 2",
  body: "Long Foo Bar Long Foo Bar",
  items: [
         {
            "name": "pencils",
            "totalCost": 15,
            "amount": 30,
            "comments": "",
         },
         {
            "name": "markers",
            "totalCost": 25,
            "amount": 30,
            "details": "Black or dark colors"
         }
  ]
  }
  const testPostUpdata = {
  author: "asldkjfljqwer",
  title: "Need Some lovin 2",
  body: "Long Foo Bar Long Foo Bar",
  items: [
         {
            "name": "pencils",
            "totalCost": 15,
            "amount": 30,
            "comments": "",
         },
         {
            "name": "markers",
            "totalCost": 25,
            "amount": 30,
            "details": "Black or dark colors"
         }
  ]
  }

  const handleUpdate = () => {
    dispatch(updatePost(testPostUpdate))
  }



  return (
  <>
      <button onClick={handleSubmit}>Test post creation</button>
      <button onClick={handleUpdate}>Test post update</button>
  </>
  )
}

export default TestingPost;
