import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarRoutesConfig from "../assets/NavabarRouteConfig";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/apiSlice.auth";
import {
  brides,
  grooms,
  weddingVendors,
  weddingVenues,
} from "../static/static";
import TopNavbar from "./topnavbar/TopNavbar";
import CustomText from "./global/text/CustomText";

function Navbar() {
  const {isLoggedIn,user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutMutation] = useLogoutMutation();
  const [dropdown, setDropdown] = useState(""); // State to track hover
  const navigate = useNavigate();

  const handleOnProfile = () => {
    navigate("/profile");
    // try {
    //   await logoutMutation();
    //   dispatch(logout());
    //   navigate("/"); // Redirect to home after logout
    // } catch (err) {
    //   console.error("Logout failed:", err);
    // }
  };

  const handleNavigate = (item) => {
    setIsMenuOpen(false);
    navigate(`/services?search=${encodeURIComponent(item)}`);
  };

  // Toggle menu function
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      {/* top navbar for vender login and support  */}
      <TopNavbar />
      {/* Navbar */}
      <nav className="w-full bg-transparent sm:bg-white top-0 px-4 lg:px-16  z-50 ">
        <div className="w-full flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary cursor-pointer">
            <NavLink to="/">WEDD</NavLink>
          </div>

          {/* Hamburger Icon for mobile */}
          <button
            className="block lg:hidden text-gray-800"
            onClick={toggleMenu}
          >
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
            className={`flex flex-col lg:flex-row lg:gap-8 gap-4 absolute lg:relative z-50 text-gray-600 font-medium bg-white lg:bg-transparent h-screen md:h-0 lg:h-0 w-1/2 left-0 top-0 lg:w-auto lg:top-auto lg:items-center px-4 py-4 lg:py-0 lg:px-0 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            {/* Logo */}
            <div className="text-2xl block md:hidden lg:hidden font-bold text-primary cursor-pointer my-7 md:my-0 lg:my-0 ">
              <NavLink to="/">WEDD</NavLink>
            </div>

            {NavbarRoutesConfig.map((route) => (
              <li key={route.path} className="lg:inline-block">
                <NavLink
                  to={route.path}
                  onClick={() => setIsMenuOpen(false)} // Close menu on mobile
                  className={({ isActive }) =>
                    isActive
                      ? "text-dustyRose-dark border-b-2 border-primary pb-1"
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
              <span className="cursor-pointer hover:text-dustyRose">
                Brides
              </span>
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
              <span className="cursor-pointer hover:text-dustyRose">
                Grooms
              </span>
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
                <div className="absolute lg:-right-[50%]  z-50 top-full bg-white shadow-lg w-fit md:w-[500px] py-4  transition-transform duration-300 ease-in-out transform scale-100">
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
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

            {!isLoggedIn  ? (
              <>
                <li className="lg:inline-block">
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)} // Close menu on mobile
                    className={({ isActive }) =>
                      isActive
                        ? "text-dustyRose-dark border-b-2 border-primary pb-1"
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
                        ? "text-dustyRose-dark border-b-2 border-primary pb-1"
                        : "hover:text-dustyRose"
                    }
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="lg:inline-block">
                <div
                  onClick={handleOnProfile}
                  className="py-1 md:py:0 lg:py-0 px-2 md:px-0 lg:px-0 flex items-center justify-start gap-x-2 rounded-full border-2 border-ring cursor-pointer "
                >
                  <img
                    src={user.profile_photo||user.user_name
                      .split(" ")
                      .map((name) => name.charAt(0).toUpperCase())
                      .join("")  }
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <CustomText
                    variant="paragraph"
                    className="text-sm block md:hidden lg:hidden"
                    text="Profile"
                  />
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
