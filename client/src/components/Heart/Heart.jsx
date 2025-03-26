// import React, { useContext, useState } from "react";
// import { AiFillHeart } from "react-icons/ai"; // ✅ Use the correct icon
// import useAuthCheck from "../../hooks/useAuthCheck";
// import { useMutation } from "@tanstack/react-query";
// import { toFav } from "../../utils/api";
// import { useAuth0 } from "@auth0/auth0-react";
// import UserDetailContext from "../../context/UserDetailContext";

// const Heart = ({id}) => {
//   const [heartColor, setHeartColor] = useState("white");
//   const { validateLogin } = useAuthCheck();
//     const {user} = useAuth0()
    
//     const {
//         userDetails: {favourites, token},
//         setUserDetails,
//     } = useContext(UserDetailContext);

//     const {mutate} = useMutation({
//         mutationFn: () => toFav(id, user?.email, token),
//         onSuccess: ()=> {
//             setUserDetails((prev) => (
//                 {
//                     ...prev,
//                     favourites: updateFavourites(id, prev.favourites)
//                 }
//             ))
//         }
//     })
//   const handleLike = () => {
//     if (validateLogin()) {
//       setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
//     }
//   };

//   return (
//     <AiFillHeart
//       size={24}
//       color={heartColor}
//       style={{ cursor: "pointer" }} // ✅ Makes it clickable
//       onClick={(e) => {
//         e.stopPropagation();
//         handleLike();
//       }}
//     />
//   );
// };

// export default Heart;
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useMutation } from "@tanstack/react-query";
import { toFav } from "../../utils/api";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { checkFavourites, updateFavourites } from "../../utils/common"
const Heart = ({ id }) => {
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { favourites, token },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(()=> {
    setHeartColor(()=> checkFavourites(id, favourites))
  },[favourites])

  // ✅ Check if the property is already in favourites
  const isFavourite = favourites?.includes(id);
  const [heartColor, setHeartColor] = useState(isFavourite ? "#fa3e5f" : "white");

  const updateFavourites = (propertyId, favouritesList) => {
    return favouritesList.includes(propertyId)
      ? favouritesList.filter((favId) => favId !== propertyId) // Remove if exists
      : [...favouritesList, propertyId]; // Add if not exists
  };

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async () => {
      const response = await toFav(id, user?.email, token);
      return response; // Ensure API response is handled
    },
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));

      // ✅ Toggle heart color after successful API call
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    },
    onError: (error) => {
      console.error("Failed to update favourite:", error);
    },
  });

  const handleLike = () => {
    if (validateLogin() && !isLoading) {
      mutate(); // ✅ Call API to update backend
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      style={{
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.5 : 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
