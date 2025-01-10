import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const rolePermissions = {
  user: ["/profile", "/dashboard", "/services", "/service/:id"],
  vendor: [
    "/VendorDashboard",
    "/vendorDashboard/settings",
    "/vendorDashboard/profile",
    "/vendorDashboard/analytics",
    "/vendorDashboard/services",
    "/vendorDashboard/bookings",
    "/vendorDashboard/services/service-details/:serviceId",
  ],
  admin: ["/adminPanel", "/analytics", "/profile"],
};

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();

    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      toast.error("You are not logged in. Please login to access this page.");
      navigate("/", { replace: true });
      return;
    }

    const loggedInUserRole = user.role?.toLowerCase(); 

    if (loggedInUserRole && rolePermissions[loggedInUserRole]) {
      // Check if the user's role has access to the current route
      const allowedRoutes = rolePermissions[loggedInUserRole];
      const isAllowed = allowedRoutes.some((route) =>
        matchRoute(route.toLowerCase(), currentPath)
      );

      console.log("Route Allowed:", isAllowed);

      if (!isAllowed) {
        toast.error("You do not have permission to access this page.");
        navigate("/", { replace: true });
        return
      }
    } else {
      toast.error("Unauthorized access.");
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, user, location.pathname, navigate]);
};

// Helper function to check if a route matches the current path
const matchRoute = (route, path) => {
  console.log("Matching Route:", route, "with Path:", path);
  const routeRegex = new RegExp("^" + route.replace(/:\w+/g, "[^/]+") + "$"); // Convert route params (e.g., :id) to regex
  return routeRegex.test(path);
};

export default useAuthRedirect;
