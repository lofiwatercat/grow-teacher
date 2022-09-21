import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.scss";

import {
  signup,
  login,
  clearSessionErrors,
} from "../../store/reducers/session_reducer";

function LoginForm() {
  // LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP
  const [emailSignUp, setEmailSignUp] = useState("");
  const [username, setUsername] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [password2, setPassword2] = useState("");

  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  // LOGIN
  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const updateSignUp = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmailSignUp;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPasswordSignUp;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo1@user.io", password: "password" }));
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    dispatch(clearSessionErrors());
    const user = {
      emailSignUp,
      username,
      passwordSignUp,
    };

    dispatch(signup(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearSessionErrors());
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    const container = document.getElementById("container");
    const overlayCon = document.getElementById("overlayCon");
    const overlayBtn = document.getElementById("overlayBtn");

    overlayBtn.addEventListener("click", () => {
      container.classList.toggle("right-panel-active");
      overlayBtn.classList.remove("btnScaled");
      window.requestAnimationFrame(() => {
        overlayBtn.classList.add("btnScaled");
      });
    });
  }, []);

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleSubmit}>
          <h1>Sign in to Grow Teacher</h1>
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
          <button disabled={!email || !password}>Log In</button>
          <button onClick={handleDemoLogin}>Demo Login</button>
        </form>
      </div>
      <div className="form-container sign-up-container">
          <form action="#" onSubmit={usernameSubmit}>
            <h1>Sign Up</h1>
            <div className="errors">{errors?.email}</div>
            <div className="infield">
              <input
                type="text"
                value={emailSignUp}
                onChange={updateSignUp("email")}
                placeholder="Email"
              />
              <label></label>
            </div>
            <div className="errors">{errors?.username}</div>
            <div className="infield">
              <input
                type="text"
                value={username}
                onChange={updateSignUp("username")}
                placeholder="Username"
              />
              <label></label>
            </div>
            <div className="errors">{errors?.password}</div>
            <div className="infield">
              <input
                type="password"
                value={passwordSignUp}
                onChange={updateSignUp("password")}
                placeholder="Password"
              />
              <label></label>
            </div>
            <div className="errors">
              {passwordSignUp !== password2 && "Confirm Password field must match"}
            </div>
            <div className="infield">
              <input
                type="password"
                value={password2}
                onChange={updateSignUp("password2")}
                placeholder="Confirm Password"
              />
              <label></label>
            </div>
            <button
              className="sessionform-button"
              disabled={
                !emailSignUp || !username || !passwordSignUp || passwordSignUp !== password2
              }
            >
              Sign Up
            </button>
            <button onClick={handleDemoLogin}>Demo Login</button>
          </form>
        </div>
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button onClick={() => dispatch(clearSessionErrors())}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button onClick={() => dispatch(clearSessionErrors())}>Sign Up</button>
          </div>
        </div>
        <button id="overlayBtn"></button>
      </div>
    </div>
  );
}

export default LoginForm;
