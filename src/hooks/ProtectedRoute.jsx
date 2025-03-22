import { Outlet, useLocation, matchPath, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// Permissions mapping for roles
const rolePermissions = {
  user: [
    "/profile",
    "/profile/favoriteList",
    "/user-forgot-password",
    "/user-change-password",
    "/services",
    "/service/:id",
  ],
  vendor: [
    "/vendorSignup",
    "/vendorLogin",
    "/vendor-forgot-password",
    "/vendor-change-password",
    "/VendorDashboard",
    "/VendorDashboard/settings",
    "/VendorDashboard/analytics",
    "/VendorDashboard/bookings",
    "/VendorDashboard/services",
    "/VendorDashboard/services/service-details/:serviceId",
  ],
  admin: ["admin", "/adminPanel", "/analytics", "/profile"],
  super_admin: ["admin", "/adminPanel", "/analytics", "/profile"],
};

const ProtectedRoute = ({ allowedRoles, component: Component }) => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();


  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();

    // If user is logged out and trying to access a protected route
    if (!isLoggedIn) {
      // If the user is on a public page, do not show the toast or navigate
      const publicPages = [
        "/login",
        "/signup",
        "/vendorLogin",
        "/vendorSignup",
        "/user-forgot-password",
        "/vendor-forgot-password",
        "/"
      ];

      if (publicPages.includes(currentPath)) {
        return;
      }

      if (!isLoggedIn) {
        navigate("/", { replace: true });
        toast.error("You are not logged in. Please login to access this page.");
        
        
      }
      return;
    }

    // Validate user's role if logged in
    const userRole = user?.role?.toLowerCase();
    if (!allowedRoles.includes(userRole)) {
      toast.error("You do not have permission to access this page.");
      navigate("/", { replace: true });
      return;
    }

    // Get the allowed routes for the user's role
    const allowedRoutes = rolePermissions[userRole] || [];

    // Check if the current path matches any of the allowed routes
    const isAllowed = allowedRoutes.some((route) => matchRoute(route, currentPath));

    if (!isAllowed) {
      toast.error("Unauthorized access.");
      navigate("/", { replace: true });
      return
    }
  }, [isLoggedIn, user, allowedRoles, location.pathname, navigate]);

  return <Component /> || <Outlet />;
};

// Helper function to match dynamic routes using matchPath
const matchRoute = (route, path) => {
  const match = matchPath({ path: route, end: false }, path);
  return match !== null; // Return true if there's a match
};

export default ProtectedRoute;


