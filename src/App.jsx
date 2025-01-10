import  {  Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/ErrorPage.jsx";
import UserProfile from "./pages/userDashboard/UserProfile.jsx";
import UserDashboard from "./pages/userDashboard/UserDashBoard.jsx";
import Success from "./pages/success/Success.jsx";
import VendorForgotPassword from "./pages/auth/vendor _auth/VendorForgotPassword.jsx";
import UserForgotPassword from "./pages/auth/UserForgotPassword.jsx";
import VendorChangePassword from "./pages/change-password/VendorChangePassword.jsx";
import ChangePassword from "./pages/auth/ChangePassword.jsx";

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
      { path: "/user-change-password", element: <ChangePassword/> },
      { path: "/success", element: <Success /> },
      { path: "/vendorSignup", element: <VendorRegistration /> },
      { path: "/vendorLogin", element: <VendorLogin /> },
      { path: "vendor-forgot-password", element: <VendorForgotPassword/> },
      { path: "vendor-change-password", element: <VendorChangePassword /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/service/:id", element: <ServiceDetail /> },
      {
        path: "/profile",
        element: <UserDashboard />,
        children: [
          { path: "", index: true, element: <UserProfile /> },
          { path: "favoriteList", element: <FavoriteListPage /> },
        ],
      },

      {
        path: "/VendorDashboard",
        element: <VendorDashboard/>,
        children: [
          { path: "settings", element: <Setting /> },
          { path: "analytics", index: true, element: <Analytics /> },
          {path:"bookings",element:<>bookings</>},

          {
            path: "services",
            children: [
              { path: "",  element: <VendorServicesPage /> },
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
