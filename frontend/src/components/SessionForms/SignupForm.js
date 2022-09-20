import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.scss";
import { signup, clearSessionErrors } from "../../store/reducers/session_reducer";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

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

  return (
    <>
    <div id="signup-page">
    <div id="signup-text">
        <p>Filler Text</p>
        <p>Help your teachers</p>
        <p>Help your kids</p>
        <p>Filler image</p>
    </div>
    <div id="signup-form-container">
    <form className="session-form" onSubmit={usernameSubmit}>
      <h2>Sign Up</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <input
          type="text"
          value={email}
          onChange={update("email")}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.username}</div>
      <label>
        <input
          type="text"
          value={username}
          onChange={update("username")}
          placeholder="Username"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <input
          type="password"
          value={password}
          onChange={update("password")}
          placeholder="Password"
        />
      </label>
      <div className="errors">
        {password !== password2 && "Confirm Password field must match"}
      </div>
      <label>
        <input
          type="password"
          value={password2}
          onChange={update("password2")}
          placeholder="Confirm Password"
        />
      </label>
      <input
        id="sessionform-button"
        type="submit"
        value="Sign Up"
        disabled={!email || !username || !password || password !== password2}
      />
    </form>
    </div>
    </div>
    </>
  );
}

export default SignupForm;
