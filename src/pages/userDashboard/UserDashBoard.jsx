import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const UserDashBoard = () => {
  const location = useLocation(); // Get the current location

  // Array of links and their paths
  const navItems = [
    { name: "Profile", path: "" }, // Use "/" for the default route
    { name: "History", path: "history" },
    { name: "FavoriteList", path: "favoriteList" },
    { name: "Settings", path: "settings" },
  ];

  return (
    <div className="bg-gradient-to-r h-screen from-pink-50 via-white to-pink-100">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4  py-6">
        {/* Sidebar */}
        <div className="w-full   lg:w-1/4 shadow-lg rounded-lg p-6 border border-pink-200 bg-white">
          <h2 className="text-2xl font-serif text-pink-600 mb-6 text-center lg:text-left">
            Dashboard
          </h2>
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    // Ensure active styling matches only for the exact path
                    isActive && location.pathname === item.path
                      ? "text-pink-500 font-semibold block rounded-md py-2 px-4 bg-pink-100"
                      : "text-pink-700 font-semibold block rounded-md py-2 px-4 hover:text-pink-500 hover:bg-pink-50"
                  }
                  end // Ensure exact match for root path "/"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Outlet for rendering child components */}
        <div className="w-full lg:w-3/4 shadow-lg rounded-lg p-8 bg-white border border-pink-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
