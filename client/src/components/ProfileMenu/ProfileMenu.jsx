import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BiChevronDown, BiHeart, BiCalendar, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css"; // ✅ Import CSS file

const ProfileMenu = () => {
  const { user, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null; // Don't show if user isn't logged in

  return (
    <div className={`profile-menu ${isOpen ? "open" : ""}`}>
      {/* Profile Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="profile-button">
        <img src={user.picture} alt="Profile" className="profile-avatar" />
        <span>{user.name}</span>
        <BiChevronDown size={18} />
      </button>

      {/* Dropdown Menu */}
      <div className="profile-dropdown">
        <div className="profile-dropdown-item" onClick={() => navigate("/favourites")}>
          <BiHeart size={18} />
          Favourites
        </div>

        <div className="profile-dropdown-item" onClick={() => navigate("/bookings")}>
          <BiCalendar size={18} />
          Bookings
        </div>

        <div className="profile-divider"></div>

        <div
          className="profile-dropdown-item logout"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <BiLogOut size={18} />
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
