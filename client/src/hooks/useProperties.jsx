
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["allProperties"], 
    queryFn: getAllProperties,
    refetchOnWindowFocus: false
  });

  if (isError) console.error("Error fetching properties:", error);

  return { data, isError, isLoading, refetch };
};

export default useProperties;
