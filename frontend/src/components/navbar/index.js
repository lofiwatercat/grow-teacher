import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

const Navbar = () => {
   // const sessionUser = useSelector(state => state.session.user);
   let history = useHistory();
  
   let sessionLinks;
  
   // Replace boolean with session user
   if (false) {
     sessionLinks = (
       // <ProfileButton user={sessionUser} />
       <>
       </>
     );
   } else {
     sessionLinks = (
       <>
         <ul className='sessionLinks'>
           <button id="loginButton" onClick={() => history.push('/login')} >Log In</button>
           <button id="signupButton" onClick={() => history.push('/signup')}>Sign Up</button>
         </ul>
       </>
     );
   }


  return (
    <>
      <div id="navBar">
        <NavLink id='home' exact to="/"><p>grow<span>teacher</span></p></NavLink>
        sessionLinks
      </div>
    </>
  )
}

export default Navbar;
