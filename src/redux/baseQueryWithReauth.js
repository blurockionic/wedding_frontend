import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userlogout } from "../redux/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the token has expired (401 response), log out the user
  if (result.error && result.error.status === 401) {
    await api.dispatch(userlogout());
    window.location.reload();
  }

  return result;
};

export default baseQueryWithReauth;
