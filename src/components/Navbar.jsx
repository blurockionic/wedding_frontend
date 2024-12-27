import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarRoutesConfig from "../assets/NavabarRouteConfig";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useLogoutMutation } from "../redux/apiSlice.auth";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
} from "../static/static";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutMutation] = useLogoutMutation();
  const [dropdown, setDropdown] = useState(""); // State to track hover
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation();
      dispatch(logout());
      navigate("/"); // Redirect to home after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleNavigate = (item) => {
    setIsMenuOpen(false);
    navigate(`/services?search=${encodeURIComponent(item)}`);
  };

  // Toggle menu function
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="w-full bg-transparent sm:bg-white top-0 px-4 lg:px-16 py-2 z-50">
      <div className="w-full flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
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
                onClick={() => setIsMenuOpen(false)} // Close menu on mobile
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

          {/* Brides Dropdown */}
          <li
            className="relative lg:inline-block"
            onMouseEnter={() => setDropdown("brides")}
            onMouseLeave={() => setDropdown("")}
          >
            <span className="cursor-pointer hover:text-dustyRose">Brides</span>
            {dropdown === "brides" && (
              <div className="absolute left-0 top-full bg-white shadow-lg w-48 py-4 z-40 transition-transform duration-300 ease-in-out transform scale-100">
                <ul className="grid grid-cols-1 gap-4 px-4">
                  {brides.map((item, index) => (
                    <li key={index} className="hover:text-dustyRose">
                      <button
                        onClick={() => handleNavigate(item)}
                        className="block text-left w-full"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          {/* Grooms Dropdown */}
          <li
            className="relative lg:inline-block"
            onMouseEnter={() => setDropdown("grooms")}
            onMouseLeave={() => setDropdown("")}
          >
            <span className="cursor-pointer hover:text-dustyRose">Grooms</span>
            {dropdown === "grooms" && (
              <div className="absolute left-0 top-full bg-white shadow-lg w-48 py-4 z-40 transition-transform duration-300 ease-in-out transform scale-100">
                <ul className="grid grid-cols-1 gap-4 px-4">
                  {grooms.map((item, index) => (
                    <li key={index} className="hover:text-dustyRose">
                      <button
                        onClick={() => handleNavigate(item)}
                        className="block text-left w-full"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li
            className="relative lg:inline-block"
            onMouseEnter={() => setDropdown("weddingVenues")}
            onMouseLeave={() => setDropdown("")}
          >
            <span className="cursor-pointer hover:text-dustyRose">
              Wedding Venues
            </span>
            {dropdown === "weddingVenues" && (
              <div className="absolute left-0 top-full bg-white shadow-lg w-48 py-4 z-40 transition-transform duration-300 ease-in-out transform scale-100">
                <ul className="grid grid-cols-1 gap-4 px-4">
                  {weddingVenues.map((item, index) => (
                    <li key={index} className="hover:text-dustyRose">
                      <button
                        onClick={() => handleNavigate(item)}
                        className="block text-left w-full"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          {/* Wedding Vendors Dropdown */}
          <li
  className="relative lg:inline-block"
  onMouseEnter={() => setDropdown("weddingVendors")}
  onMouseLeave={() => setDropdown("")}
>
  <span className="cursor-pointer hover:text-dustyRose">
    Wedding Vendors
  </span>
  {dropdown === "weddingVendors" && (
    <div className="absolute right-0 z-50 top-full bg-white shadow-lg w-[500px] py-4  transition-transform duration-300 ease-in-out transform scale-100">
      <ul className="grid grid-cols-3 gap-4 px-4">
        {/* Adjusted width to w-64 (16rem) and kept 3 columns */}
        {weddingVendors.map((item, index) => (
          <li key={index} className="hover:text-dustyRose">
            <button
              onClick={() => handleNavigate(item)}
              className="block text-left w-full"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )}
</li>

          {!isLoggedIn ? (
            <>
              <li className="lg:inline-block">
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)} // Close menu on mobile
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
                  onClick={() => setIsMenuOpen(false)} // Close menu on mobile
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
