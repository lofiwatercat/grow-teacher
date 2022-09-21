import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import { logout } from "../../store/reducers/session_reducer";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={"/posts"}>All Posts</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/posts/create"}>Write a Post</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>
      );
    }
  };

  return (
    <>
      <div className="NavBar">
        <Link id="home-link" to={'/'}>Home</Link>
        {getLinks()}
      </div>
    </>
  );
}

export default NavBar;
