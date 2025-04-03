
// import React, { useState } from "react";
// import "./Header.css";
// import { BiMenuAltRight } from "react-icons/bi";
// import OutSideClickHandler from "react-outside-click-handler";
// import { getMenuStyles } from "../../utils/common";
// import useHeaderColor from "../../hooks/useHeaderColor";
// import { Link, NavLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import ProfileMenu from "../ProfileMenu/ProfileMenu"; // ✅ Import ProfileMenu


// const Header = () => {

//   const [menuOpened, setMenuOpened] = useState(false);
//   const headerColor = useHeaderColor();
//   const { loginWithRedirect, isAuthenticated } = useAuth0(); // ✅ Get auth state
 
  
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

                
//               {/* User Authentication UI */}
//             {isAuthenticated ? (
//               <ProfileMenu /> // ✅ Show ProfileMenu when logged in
//             ) : (
//               <button className="button" onClick={loginWithRedirect}>
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
import ProfileMenu from "../ProfileMenu/ProfileMenu"; 
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal"; // ✅ Import AddPropertyModal
import useAuthCheck from "../../hooks/useAuthCheck"; // ✅ Import auth check hook

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const headerColor = useHeaderColor();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      console.log("Opening Modal..."); // Debugging
      setModalOpened(true);
    }
  };

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

            {/* Add Property Button */}
            <div
              onClick={handleAddPropertyClick}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Property
            </div>

            {/* User Authentication UI */}
            {isAuthenticated ? (
              <ProfileMenu /> 
            ) : (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            )}
          </div>
        </OutSideClickHandler>

        {/* Add Property Modal */}
        <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
