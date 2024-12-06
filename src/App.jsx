import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavbarRoutesConfig from "./assets/NavabarRouteConfig";
import Navbar from "./components/Navbar";


// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="pt-16">
          {/* Adjust padding to avoid overlap with navbar */}
        </div>
      </>
    ),
    children: NavbarRoutesConfig.map((route) => ({
      path: route.path,
      element: <>{route.path}</>,
    })),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
