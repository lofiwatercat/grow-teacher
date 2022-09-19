import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.scss";

import { login, clearSessionErrors } from "../../store/reducers/session_reducer";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="form-container">
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Sign in to Grow Teacher</h2>
        {/* <div className="errors">{errors?.email}</div> */}
          <input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
        {/* <div className="errors">{errors?.password}</div> */}
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        <input type="submit" value="Log In" disabled={!email || !password} />
      </form>
    </div>
  );
}

export default LoginForm;
