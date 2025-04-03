
import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../utils/api";
import  useFavourites  from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

const Layout = () => {
  useFavourites()
  useBookings()

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email], // Ensuring a unique key for user
    mutationFn: ({ email, token }) => createUser(email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://dev-gwh0h4gkyuwkf747.us.auth0.com/api/v2/", // ✅ API Identifier
            scope: "openid profile email",
          },
        });

        // Save token in local storage
        localStorage.setItem("access_token", token);
        setUserDetails((prev) => ({ ...prev, token }));

        console.log("Token received:", token);

        // Call API to create user
        if (user?.email) {
          mutate({ email: user.email, token });
        }
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user?.email]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
