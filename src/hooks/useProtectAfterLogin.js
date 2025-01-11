import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useProtectAfterLogin = (requiredRoles = [], redirectPath = "/") => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const role = user?.role?.toLowerCase(); // Ensure safe access to role

  useEffect(() => {
    if (isLoggedIn && requiredRoles.includes(role)) {
      navigate(redirectPath, { replace: true });
    }
  }, [isLoggedIn, role, requiredRoles, navigate, redirectPath]);
};

export default useProtectAfterLogin;
