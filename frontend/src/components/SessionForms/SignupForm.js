import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.scss";
import {
  signup,
  clearSessionErrors,
  login,
} from "../../store/reducers/session_reducer";
import { useHistory } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user));
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo1@user.io", password: "password" }));
  };

  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={usernameSubmit}>
            <h1>Sign Up</h1>
            <div className="errors">{errors?.email}</div>
            <div className="infield">
              <input
                type="text"
                value={email}
                onChange={update("email")}
                placeholder="Email"
              />
              <label></label>
            </div>
            <div className="errors">{errors?.username}</div>
            <div className="infield">
              <input
                type="text"
                value={username}
                onChange={update("username")}
                placeholder="Username"
              />
              <label></label>
            </div>
            <div className="errors">{errors?.password}</div>
            <div className="infield">
              <input
                type="password"
                value={password}
                onChange={update("password")}
                placeholder="Password"
              />
              <label></label>
            </div>
            <div className="errors">
              {password !== password2 && "Confirm Password field must match"}
            </div>
            <div className="infield">
              <input
                type="password"
                value={password2}
                onChange={update("password2")}
                placeholder="Confirm Password"
              />
              <label></label>
            </div>
            <button
              className="sessionform-button"
              disabled={
                !email || !username || !password || password !== password2
              }
            >
              Sign Up
            </button>
            <button value="Demo Login" onClick={handleDemoLogin} />
          </form>
        </div>
        <div className="overlay-container" id="overlayCon">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button>Sign Up</button>
            </div>
          </div>
          <button id="overlayBtn"></button>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
