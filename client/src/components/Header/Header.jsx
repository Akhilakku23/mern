import React from 'react'
import './Header.css'
import { BiMenuAltRight } from "react-icons/bi";
import { useState } from 'react';
import OutSideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false)

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

          
              <button className="button">
                Login
              </button>
       
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