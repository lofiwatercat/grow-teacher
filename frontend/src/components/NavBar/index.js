import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import { logout } from "../../store/reducers/session_reducer";
import logo from "../../assets/images/pencil.svg";
import SearchBar from "../SearchBar";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".navbar");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  const getLinks = () => {
    if (loggedIn) {
      return (
        <ul className="links-nav">
          <li>

          </li>
          <li>
            <Link to={"/posts"}>All Posts</Link>
          </li>
          <li>
            <Link to={"/posts/new"}>Write a Post</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link to="/login" onClick={logoutUser}>Logout</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="links-auth">
          <li>
            <Link className="login-button" to={"/login"}>
              Login/Signup
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <>
      <header className="navbar">
        <div>
          <p>
            <Link to="/posts" className="logo">
              <img
                className="logo-image"
                height={"24px"}
                width={"24px"}
                src={logo}
                alt="logo"
              />
              GrowTeacher
            </Link>
          </p>
            <div className="search-icon">
              <SearchBar/>
            </div>
        </div>
        <div>{getLinks()}</div>
      </header>
    </>
  );
}

export default NavBar;
