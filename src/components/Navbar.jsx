import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarRoutesConfig from "../assets/NavabarRouteConfig";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useLogoutMutation } from "../redux/apiSlice.auth";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      logoutMutation();
      dispatch(logout());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  // Toggle menu function
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="w-full bg-transparent sm:bg-white top-0 px-16 py-2 z-50">
      <div className="w-full flex justify-between items-center py-4">
        {/* Logo */}
        <div className=" text-2xl font-bold text-gray-800 cursor-pointer">
          <NavLink to="/">WEDD</NavLink>
        </div>

        {/* Hamburger Icon for mobile */}
        <button className="block lg:hidden text-gray-800" onClick={toggleMenu}>
          {!isMenuOpen ? (
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
          ) : (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col lg:flex-row lg:gap-8 gap-4 absolute lg:relative z-50 text-gray-600 font-medium bg-white lg:bg-transparent w-full left-0 top-14 lg:w-auto lg:top-auto lg:items-center px-4 py-4 lg:py-0 lg:px-0 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {NavbarRoutesConfig.map((route) => (
            <li key={route.path} className="lg:inline-block">
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
              <li className="lg:inline-block">
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
              <li className="lg:inline-block">
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
            <li className="lg:inline-block">
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
