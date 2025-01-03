import React, { useEffect, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "./redux/serviceSlice.js";
import { hydrateFavorites } from "./redux/favoriteSlice.js";
import ErrorBoundary from "./pages/ErrorPage.jsx";
import UserProfile from "./pages/userDashboard/UserProfile.jsx";
import UserDashBoard from "./pages/userDashboard/UserDashBoard.jsx";
import ForgotPassword from "./pages/forgot-password/ForgotPassword.jsx";
import ChangePassword from "./pages/change-password/ChangePassword.jsx";
import Success from "./pages/success/Success.jsx";

// Lazy load components
const OutletPage = lazy(() => import("./pages/OutletPage"));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const Signup = lazy(() => import("./pages/auth/Signup.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicePage.jsx"));
const ServiceDetail = lazy(() => import("./pages/serviceDeatails.jsx"));
const VendorRegistration = lazy(() =>
  import("./pages/auth/vendor _auth/VendorSignup.jsx")
);
const VendorDashboard = lazy(() =>
  import("./pages/vendorDashboard/Dashboard.jsx")
);
const Setting = lazy(() => import("./pages/vendorDashboard/Setting.jsx"));
const Profile = lazy(() => import("./pages/vendorDashboard/Profile.jsx"));
const Analytics = lazy(() => import("./pages/vendorDashboard/Analytics.jsx"));
const VendorServicesPage = lazy(() =>
  import("./pages/vendorDashboard/VendorServicePage.jsx")
);
const VendorLogin = lazy(() =>
  import("./pages/auth/vendor _auth/VendorLogin.jsx")
);
const DashBoardDetailPage = lazy(() =>
  import("./pages/vendorDashboard/component/DashBoardDetailPage.jsx")
);
const FullErrorPage = lazy(() => import("./pages/FullErrorPage.jsx"));
const FavoriteListPage = lazy(() =>
  import("./pages/userDashboard/favoriteList.jsx")
);

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/success", element: <Success /> },
      { path: "/vendorSignup", element: <VendorRegistration /> },
      { path: "/vendorLogin", element: <VendorLogin /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/service/:id", element: <ServiceDetail /> },
      {
        path: "/profile",
        element: <UserDashBoard />,
        children: [
          { path: "", index: true, element: <UserProfile /> },
          { path: "favoriteList", element: <FavoriteListPage /> },
        ],
      },

      {
        path: "/VendorDashboard",
        element: <VendorDashboard />,
        children: [
          { path: "settings", element: <Setting /> },
          { path: "profile", element: <Profile /> },
          { path: "analytics", element: <Analytics /> },
          {
            path: "services",
            children: [
              { path: "", index: true, element: <VendorServicesPage /> },
              {
                path: "service-details/:serviceId",
                element: <DashBoardDetailPage />,
              },
            ],
          },
        ],
      },
      { path: "*", element: <FullErrorPage /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  // Access the user object from the authSlice
  const user = useSelector((state) => state.auth.user);

  // Check if the user is logged in and has a role of 'user'
  const isUserLoggedIn = user && user.role === "user";

  // Use the query conditionally
  const {
    data: favoriteList,
    isLoading,
    error,
  } = useGetCartQuery(undefined, {
    skip: !isUserLoggedIn,
  });

  useEffect(() => {
    if (
      favoriteList &&
      favoriteList.cartItems &&
      favoriteList.cartItems.length > 0
    ) {
      console.log(favoriteList.cartItems);
      dispatch(hydrateFavorites(favoriteList));
    }
  }, [favoriteList, dispatch]);

  return (
    <>
      <ErrorBoundary>
        <ToastContainer position="bottom-right" />
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
