import React from 'react'
import './Header.css'
import { BiMenuAltRight } from "react-icons/bi";
import { useState } from 'react';
import OutSideClickHandler from "react-outside-click-handler";
import { getMenuStyles } from '../../utils/common' 
import useHeaderColor from "../../hooks/useHeaderColor";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0()

  const getMenuStyles = (menuOpened)=> { 
    if (document.documentElement.clientWidth <= 800)
       {
    return{right: !menuOpened && "-100%" };
  }
};
  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
        <img src="./logo.png" alt="logo" width={100} />
        </Link>

        {/* menu */}
      <OutSideClickHandler
        onOutsideClick={()=> {
          setMenuOpened(false)
        }}>
        <div className="flexCenter h-menu" 
        style={getMenuStyles(menuOpened)}>

          <NavLink to="/properties">Properties</NavLink>

          <a href="mailto:akhilsaji0031@gmail.com">Contact</a>

          {/* login button */}
          {isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
          ) : (
            <div>User profile</div>
          )
            }
        </div>
        </OutSideClickHandler>
        <div className="menu-icon" onClick={()=>setMenuOpened((prev)=>!prev)}>
          <BiMenuAltRight size={30}/>
        </div>
      </div>
    </section>
  )
}

export default Header