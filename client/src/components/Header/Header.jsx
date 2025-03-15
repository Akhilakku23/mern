// import React, { useState } from "react";
// import "./Header.css";
// import { BiMenuAltRight } from "react-icons/bi";
// import OutSideClickHandler from "react-outside-click-handler";
// import { getMenuStyles } from "../../utils/common";
// import useHeaderColor from "../../hooks/useHeaderColor";
// import { Link, NavLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// const Header = () => {
//   const [menuOpened, setMenuOpened] = useState(false);
//   const headerColor = useHeaderColor();
//   const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

//   return (
//     <section className="h-wrapper">
//       <div className="flexCenter innerWidth paddings h-container">
//         {/* Logo */}
//         <Link to="/">
//           <img src="./logo.png" alt="logo" width={100} />
//         </Link>

//         {/* Menu */}
//         <OutSideClickHandler onOutsideClick={() => setMenuOpened(false)}>
//           <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
//             <NavLink to="/properties">Properties</NavLink>
//             <a href="mailto:akhilsaji0031@gmail.com">Contact</a>

//             {/* User Authentication UI */}
//             {isAuthenticated ? (
//               <>
//                 <span>Welcome, {user?.name}</span>
//                 <button className="button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <button className="button" onClick={() => loginWithRedirect()}>
//                 Login
//               </button>
//             )}
//           </div>
//         </OutSideClickHandler>

//         {/* Mobile Menu Icon */}
//         <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
//           <BiMenuAltRight size={30} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Header;
import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutSideClickHandler from "react-outside-click-handler";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu"; // ✅ Import ProfileMenu

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const { loginWithRedirect, isAuthenticated } = useAuth0(); // ✅ Get auth state

  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth paddings h-container">
        {/* Logo */}
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        {/* Menu */}
        <OutSideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:akhilsaji0031@gmail.com">Contact</a>

            {/* User Authentication UI */}
            {isAuthenticated ? (
              <ProfileMenu /> // ✅ Show ProfileMenu when logged in
            ) : (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            )}
          </div>
        </OutSideClickHandler>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
