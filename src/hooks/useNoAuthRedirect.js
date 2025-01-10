import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useNoAuthRedirect = (requiredRole = null, redirectPath = "/") => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      return; 
    }

    // If no specific role is required, grant access
    if (!requiredRole) {
      return;
    }

    // Check if the user's role matches the required role
    if (user.role !== requiredRole) {
      navigate(redirectPath, { replace: true }); // Redirect if role doesn't match
    }
  }, [isLoggedIn, user, requiredRole, navigate, redirectPath]);
};

export default useNoAuthRedirect;
