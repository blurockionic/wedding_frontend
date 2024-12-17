import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OutletPage from "./pages/OutletPage";
import LandingPage from "./pages/LandingPage.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesPage from "./pages/ServicePage.jsx";
import ServiceDetail from "./pages/serviceDeatails.jsx";
import { useGetCartQuery } from "./redux/serviceSlice.js";
import { hydrateFavorites } from "./redux/favoriteSlice.js";
import { useDispatch } from "react-redux";
import ErrorBoundary from "./pages/ErrorPage.jsx";
import FullErrorPage from "./pages/FullErrorPage.jsx";
import VendorRegistration from "./pages/auth/vendor _auth/VendorSignup.jsx";

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {path: "/vendorSignup", element:<VendorRegistration/>},
      { path: "/services", element: <ServicesPage /> },
      { path: "/service/:id", element: <ServiceDetail /> },
      { path: "*", element: <FullErrorPage/> },
    ],
  },
]);

function App() {
  const { data: favoriteList, isLoading, error } = useGetCartQuery(); // Automatically fetch data
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoriteList && favoriteList.cartItems && favoriteList.cartItems.length > 0) {
      console.log(favoriteList.cartItems); // Debug fetched data
      dispatch(hydrateFavorites(favoriteList)); // Dispatch to update Redux state
    }
  }, [favoriteList, dispatch]); 
  return (
    <>
      <ErrorBoundary>
        <ToastContainer />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}

export default App;
