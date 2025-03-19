import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'

export const api = axios.create({
    baseURL: "http://Localhost:8000/api"
})

export const getAllProperties = async() => {
    try{
        const response =await api.get("/residency/allresd", {
            timeout: 10*1000,
        });
        if(response.status ===400 || response.status ===500)
        {
            throw response.data
        }
        return response.data
    }catch(error){
        toast.error("Something went wrong")
        throw error
    }
}
export const getProperty = async (id) => {
    try {
      const response = await api.get(`/residency/${id}`, {
        timeout: 10 * 1000,
      });
  
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };


export const createUser = async (email, token) => {
  const response = await fetch("http://localhost:8000/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Send token properly
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${response.status} - ${errorData.message || response.statusText}`);
  }

  return response.json();
};
