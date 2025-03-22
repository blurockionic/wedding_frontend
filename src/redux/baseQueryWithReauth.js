import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  userlogout  from "../redux/authSlice";


const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
  credentials: "include", 
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the token has expired (401 response), log out the user
  if (result.error && result.error.status === 401) {
    api.dispatch(userlogout()); // Clear Redux user state
    window.location.reload(); // Refresh UI to show login
  }

  return result;
};

export default baseQueryWithReauth;
