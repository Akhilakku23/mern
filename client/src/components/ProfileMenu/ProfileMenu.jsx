
import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BiChevronDown, BiHeart, BiCalendar, BiLogOut, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css"; // ✅ Make sure this is correctly imported

const ProfileMenu = () => {
  const { user, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null; // Don't show if user isn't logged in

  return (
    <div className="profile-menu" ref={menuRef}>
      {/* Profile Button */}
      <button onClick={() => setIsOpen((prev) => !prev)} className="profile-button">
        <div className="profile-avatar">
          <BiUser size={20} />
        </div>
        <span>{user.name}</span>
        <BiChevronDown size={18} className={isOpen ? "rotate" : ""} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
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
            onClick={()=>{
              localStorage.clear();
              logout()}}
          >
            <BiLogOut size={18} />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
