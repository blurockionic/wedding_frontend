import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import OutletPage from "./pages/OutletPage.jsx";

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const Signup = lazy(() => import("./pages/auth/Signup.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicePage.jsx"));
const ServiceDetail = lazy(() => import("./pages/serviceDeatails.jsx"));
const VendorRegistration = lazy(() =>
  import("./pages/auth/vendor _auth/VendorSignup.jsx")
);
// const VendorDashboard = lazy(() =>
//   import("./pages/vendorDashboard/Dashboard.jsx")
// );

import VendorDashboard from "./pages/vendorDashboard/Dashboard.jsx";

const Setting = lazy(() => import("./pages/vendorDashboard/Setting.jsx"));
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
const UserProfile = lazy(() => import("./pages/userDashboard/UserProfile.jsx"));
const UserDashboard = lazy(() =>
  import("./pages/userDashboard/UserDashBoard.jsx")
);
const Success = lazy(() => import("./pages/success/Success.jsx"));
const VendorForgotPassword = lazy(() =>
  import("./pages/auth/vendor _auth/VendorForgotPassword.jsx")
);
const UserForgotPassword = lazy(() =>
  import("./pages/auth/UserForgotPassword.jsx")
);
const VendorChangePassword = lazy(() =>
  import("./pages/change-password/VendorChangePassword.jsx")
);
const ChangePassword = lazy(() => import("./pages/auth/ChangePassword.jsx"));
const FavoriteListPage = lazy(() =>
  import("./pages/userDashboard/FavoriteList.jsx")
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
      { path: "/user-forgot-password", element: <UserForgotPassword /> },
      { path: "/user-change-password", element: <ChangePassword /> },
      { path: "/success", element: <Success /> },
      { path: "/vendorSignup", element: <VendorRegistration /> },
      { path: "/vendorLogin", element: <VendorLogin /> },
      { path: "vendor-forgot-password", element: <VendorForgotPassword /> },
      { path: "vendor-change-password", element: <VendorChangePassword /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/service/:id", element: <ServiceDetail /> },

      {
        path: "/profile",
        element: (
          <ProtectedRoute
            component={UserDashboard}
            allowedRoles={["user", "admin"]}
          />
        ), // Protected route
        children: [
          { path: "userProfile", index: true, element: <UserProfile /> },
          { path: "favoriteList", element: <FavoriteListPage /> },
        ],
      },

      // Protect vendor dashboard routes
      {
        path: "/VendorDashboard",
        element: (
          <ProtectedRoute
            component={VendorDashboard}
            allowedRoles={["vendor", "admin"]}
          />
        ), // Protected route
        children: [
          { path: "", index: true, element: <VendorServicesPage /> },
          { path: "analytics", element: <Analytics /> },
          { path: "settings", element: <Setting /> },
          { path: "bookings", element: <>bookings</> },

          {
            path: "service-details/:serviceId",
            element: <DashBoardDetailPage />,
          },
        ],
      },

      { path: "*", element: <FullErrorPage /> },
    ],
  },
]);

function App() {
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
