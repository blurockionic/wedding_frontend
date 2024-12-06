import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarRoutesConfig from "../assets/NavabarRouteConfig";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle mobile menu visibility
  };

  return (
    <nav className="fixed top-0 w-full bg-transparent z-50 shadow-md">
      <div className="container max-w-full px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          <NavLink to="/">WEED</NavLink>
        </div>

        {/* Hamburger Icon for mobile (hidden on larger screens) */}
        <button
          className="block md:hidden text-gray-800"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col md:flex-row gap-4 md:gap-0 text-gray-600 font-medium absolute md:static bg-white md:bg-transparent w-full left-0 md:w-auto md:space-x-6 p-4 md:p-0 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "top-16" : "-top-80" // Toggle visibility of mobile menu
          }`}
        >
          {NavbarRoutesConfig.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-dustyRose-dark border-b-2 border-dustyRose-dark pb-1"
                    : "hover:text-dustyRose"
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}

          {!isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-dustyRose-dark border-b-2 border-dustyRose-dark pb-1"
                      : "hover:text-dustyRose"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-dustyRose-dark border-b-2 border-dustyRose-dark pb-1"
                      : "hover:text-dustyRose"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-dustyRose-dark hover:text-dustyRose"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
