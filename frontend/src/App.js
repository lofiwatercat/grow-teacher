import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar"

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";

import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";

import { getCurrentUser } from "./store/reducers/session_reducer";
import SplashPage from "./views/SplashPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <Navbar />
        <Switch>
          <AuthRoute exact path="/" component={SplashPage}/>
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />

        </Switch>
      </>
    )
  );
}

export default App;
