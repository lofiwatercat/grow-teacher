import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import isEmail from "validator/lib/isEmail";
import "./SessionForm.scss";

import {
  signup,
  login,
  clearSessionErrors,
} from "../../store/reducers/session_reducer";

function LoginForm() {
  // LOGIN
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);

  // SIGNUP
  const [isValidEmailSignUp, setIsValidEmailSignUp] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState("");
  const [username, setUsername] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSessionErrors());
  }, [dispatch]);

  // LOGIN
  const update = (e, field) => {
    e.preventDefault();
    const setState = field === "email" ? setEmail : setPassword;
    if (field === "email") {
      if (isEmail(e.currentTarget.value)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    }
    return setState(e.currentTarget.value);
  };

  const updateSignUp = (e, field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmailSignUp;
        if (isEmail(e.currentTarget.value)) {
          setIsValidEmailSignUp(true);
        } else {
          setIsValidEmailSignUp(false);
        }
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

    return setState(e.currentTarget.value);
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo1@user.io", password: "password" }));
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    dispatch(clearSessionErrors());
    const user = {
      email: emailSignUp,
      username,
      password: passwordSignUp,
    };

    dispatch(signup(user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    const container = document.getElementById("outer-form-container");
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
    <div className="outer-form-container" id="outer-form-container">
      <div className="form-container sign-in-container">
        <form className="session-form" action="#" onSubmit={handleSubmit}>
          <h1>Sign in to Grow Teacher</h1>
          <div className="infield">
            <TextField
              className="input-auth-field"
              error={!isValidEmail && !(email.length === 0)}
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => update(e, "email")}
              placeholder="Email"
              required
              helperText="Please enter a valid email"
            />
          </div>
          <div className="infield">
            <TextField
              className="input-auth-field"
              error={
                !(password.length >= 6 && password.length <= 30) &&
                !(password.length === 0)
              }
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => update(e, "password")}
              placeholder="password"
              required
              helperText="Password must be between 6 and 30 characters"
              type="password"
            />
          </div>
          <div className="errors">{errors?.email}</div>
          <button>Log In</button>
          <button onClick={handleDemoLogin}>Demo Login</button>
        </form>
      </div>
      <div className="form-container sign-up-container">
        <form className="session-form" action="#" onSubmit={usernameSubmit}>
          <h1>Sign Up for Grow Teacher</h1>
          <div className="infield">
            <TextField
              className="input-auth-field"
              error={(!isValidEmailSignUp && !(emailSignUp.length === 0)) || errors?.email}
              label="Email"
              variant="outlined"
              value={emailSignUp}
              onChange={(e) => updateSignUp(e, "email")}
              placeholder="Email"
              required
              helperText="Please enter a valid email"
            />
          </div>
          <div className="infield">
            <TextField
              className="input-auth-field"
              error={errors?.username}
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => updateSignUp(e, "username")}
              placeholder="Username"
              required
              helperText="Please enter a valid username"
            />
          </div>
          <div className="infield">
            <TextField
              className="input-auth-field"
              error={
                !(passwordSignUp.length >= 6 && passwordSignUp.length <= 30) &&
                !(passwordSignUp.length === 0)
              }
              label="Password"
              variant="outlined"
              value={passwordSignUp}
              onChange={(e) => updateSignUp(e, "password")}
              placeholder="Password"
              required
              helperText="Password must be between 6 and 30 characters"
              type="password"
            />
          </div>
          <div className="infield">
            <TextField
              className="input-auth-field"
              error={passwordSignUp !== password2}
              label="Confirm Password"
              variant="outlined"
              value={password2}
              onChange={(e) => updateSignUp(e, "password2")}
              placeholder="Confirm Password"
              required
              helperText="Confirm Password field must match"
              type="password"
            />
          </div>
          <button className="sessionform-button" onClick={usernameSubmit}>Sign Up</button>
          <button onClick={handleDemoLogin}>Demo Login</button>
        </form>
      </div>
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us, please login with your personal info
            </p>
            <button>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start helping the community</p>
            <button>Sign Up</button>
          </div>
        </div>
        <button onClick={() => dispatch(clearSessionErrors())} id="overlayBtn"></button>
      </div>
    </div>
  );
}

export default LoginForm;
