import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar"

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";

import LoginForm from "./components/SessionForms/LoginForm";
import SplashPage from "./views/SplashPage";
import PostsFormPage from "./views/PostsFormPage";
import PostsShowPage from "./views/PostsShowPage";
import PostsIndexPage from "./views/PostsIndexPage";
import PostsFormEditPage from "./views/PostsFormEditPage";
import AboutPage from "./views/AboutPage/AboutPage";

import Testing from './components/testing'

function App() {
  const [loaded, setLoaded] = useState(true);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCurrentUser()).then(() => setLoaded(true));
  // }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={SplashPage}/>
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={LoginForm} />
          <ProtectedRoute exact path="/posts" component={PostsIndexPage} />
          <ProtectedRoute exact path="/testing" component={Testing} />
          <ProtectedRoute exact path="/posts/new" component={PostsFormPage} />
          <ProtectedRoute exact path="/posts/:postId" component={PostsShowPage} />
          <ProtectedRoute exact path="/posts/:postId/edit" component={PostsFormEditPage} />
          <Route exact path="/about" component={AboutPage}/>
          <Redirect to="/" />
        </Switch>
      </>
    )
  );
}

export default App;
