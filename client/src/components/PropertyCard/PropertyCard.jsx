
import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";  // Ensure lodash is installed
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ card = {} }) => {
  const navigate = useNavigate();

  if (!card.id) return null; // Prevents rendering if card data is missing

  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      <AiFillHeart size={24} color="white" className="favorite-icon" />
      
      {card.image ? (
        <img src={card.image} alt={card.title || "Property"} />
      ) : (
        <div className="image-placeholder">No Image Available</div>
      )}

      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>
         $
        </span>
        <span>{card.price || "N/A"}</span>
      </span>

      <span className="primaryText">{truncate(card.title || "No Title", { length: 15 })}</span>
      <span className="secondaryText">{truncate(card.description || "No description available", { length: 80 })}</span>
    </div>
  );
};

export default PropertyCard;
