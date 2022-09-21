import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar"

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";

import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";

import { getCurrentUser } from "./store/reducers/session_reducer";
import SplashPage from "./views/SplashPage";
import PostsFormPage from "./views/PostsFormPage";
import PostsShowPage from "./views/PostsShowPage";
import PostsIndexPage from "./views/PostsIndexPage";

import Testing from './components/testing'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={SplashPage}/>
          <AuthRoute exact path="/login" component={LoginForm} />
<<<<<<< HEAD
          <AuthRoute exact path="/signup" component={LoginForm} />
=======
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute exact path="/posts" component={PostsIndexPage} />
>>>>>>> origin/post-backend
          <ProtectedRoute exact path="/testing" component={Testing} />
          <ProtectedRoute exact path="/posts/create" component={PostsFormPage} />
          <ProtectedRoute exact path="/posts/:postId" component={PostsShowPage} />
          <Redirect to="/" />
        </Switch>
      </>
    )
  );
}

export default App;
