import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../context/UserDetailContext'
import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllFav } from '../utils/api'

const useFavourites = () => {
  
    const {userDetails, setUserDetails} = useContext(UserDetailContext)
    const queryRef = useRef()
    const {user} = useAuth0()

   const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", user?.email], // ✅ Use an array
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) => setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: !!user, // ✅ Ensures it's only enabled when user exists
    staleTime: 30000, // ✅ Use "staleTime" instead of "startTime"
});
    queryRef.current = refetch;
    useEffect(()=> {
        queryRef.current &&   queryRef.current()
    }, [userDetails?.token])
    return{data, isLoading, isError, refetch};
 
};

export default useFavourites