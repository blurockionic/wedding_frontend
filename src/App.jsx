import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OutletPage from "./pages/OutletPage";
import LandingPage from "./pages/LandingPage.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServicesPage from "./pages/ServicePage.jsx";
import ServiceDetail from "./pages/serviceDeatails.jsx";


// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <OutletPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {path:"/services", element: <ServicesPage />},
      {path:"/services/:id",element: <ServiceDetail/>},
      { path: "*", element: <>not found</> }
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
