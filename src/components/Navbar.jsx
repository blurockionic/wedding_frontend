import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NavbarRoutesConfig from "../assets/NavabarRouteConfig";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/apiSlice.auth";
import {
  allCategories,
} from "../static/static";
import TopNavbar from "./topnavbar/TopNavbar";
import CustomText from "./global/text/CustomText";
import Avatar from "../../public/user.png";
import brandlogo from "../../public/logo/brandlogo.png";

function Navbar() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutMutation] = useLogoutMutation();
  const [dropdown, setDropdown] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [weddingVenue, setWeddingVenue] = useState(null);

  const handleOnProfile = () => {
    navigate("/profile");
  };

  const handleNavigate = (category, subcategories) => {
    setIsMenuOpen(false);
    navigate(`/all/${category}/${subcategories}`);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


  return (
    <>
      <div
        className={`${
          location.pathname === "/vendorLogin" ||
          location.pathname === "/vendorSignup"
            ? "hidden"
            : "block"
        }`}
      >
        <>
          {/* <TopNavbar /> */}
          <nav className="w-full bg-white top-0 px-6 md:px-16 z-50 shadow-sm">
            <div className="w-full flex justify-between items-center py-4">
              <div className="text-2xl font-bold text-primary cursor-pointer">
                <NavLink
                  to="/"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img src={brandlogo} alt="brandlogo" className="w-10 h-10" />
                  <div className="flex flex-col justify-start">
                    <span className="hidden xl:block text-primary text-2xl">
                      Marriage Vendors
                    </span>
                    {/* <span className="text-primary text-xs">Wedding Orgniser</span> */}
                  </div>
                </NavLink>
              </div>

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

              <ul
                className={`
              flex flex-col lg:flex-row lg:gap-4 gap-4
              absolute lg:relative z-50
              rounded-lg 
              bg-white text-gray-600 font-medium
              h-screen lg:h-0 w-1/2 left-0 top-0
              lg:w-auto lg:top-auto lg:items-center
              px-4 py-4 lg:py-0 lg:px-0 transition-transform
              duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0`}
              >
                <div className="text-2xl block lg:hidden font-bold text-primary cursor-pointer my-7 ">
                  <NavLink
                    to="/"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={brandlogo}
                      alt="brandlogo"
                      className="w-10 h-10"
                    />
                    <div className="flex flex-col justify-start">
                      <span className="text-primary text-lg">
                        Marriage Vendors
                      </span>
                      {/* <span className="text-primary text-xs">Wedding Orgniser</span> */}
                    </div>
                  </NavLink>
                </div>

                {NavbarRoutesConfig.map((route) => (
                  <li key={route.path} className="lg:inline-block">
                    <NavLink
                      to={route.path}
                      onClick={() => setIsMenuOpen(false)}
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

                {/* Wedding Venues */}
                <li
                  className="relative lg:inline-block"
                  onMouseEnter={() => setDropdown("wedding venue")}
                  onMouseLeave={() => setDropdown("")}
                >
                  <span className="cursor-pointer hover:text-dustyRose">
                     Venue
                  </span>
                  {dropdown === "wedding venue" && (
                    <div className="absolute left-0 top-full bg-white shadow-lg w-48 py-4 z-40">
                      <ul className="grid grid-cols-1 gap-4 px-4">
                        {Object.entries(allCategories)
                          .filter(([category]) => category === "Wedding Venue")
                          .flatMap(([category, subcategories]) =>
                            subcategories.map((subcategory, index) => (
                              <li key={index} className="hover:text-dustyRose">
                                <button
                                  onClick={() =>
                                    handleNavigate(category, subcategory)
                                  }
                                  className="block text-left w-full"
                                >
                                  {subcategory}
                                </button>
                              </li>
                            ))
                          )}
                      </ul>
                    </div>
                  )}
                </li>
                {/* wedding vendor  */}
                <li
                  className="relative lg:inline-block"
                  onMouseEnter={() => setDropdown("wedding vendor")}
                  onMouseLeave={() => setDropdown("")}
                >
                  <span className="cursor-pointer hover:text-dustyRose">
                     Vendor
                  </span>
                  {dropdown === "wedding vendor" && (
                    <div className="absolute left-0 top-full bg-white shadow-lg w-96 py-4 z-40">
                      <ul className="grid grid-cols-2 gap-4 px-4">
                        {Object.entries(allCategories)
                          .filter(([category]) => category === "Wedding Vendor")
                          .flatMap(([category, subcategories]) =>
                            subcategories.map((subcategory, index) => (
                              <li key={index} >
                                <button
                                  onClick={() =>
                                    handleNavigate(category, subcategory)
                                  }
                                  className="block text-left w-full"
                                >
                                  {subcategory}
                                </button>
                              </li>
                            ))
                          )}
                      </ul>
                    </div>
                  )}
                </li>

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
                    <div className="absolute left-0 top-full bg-white shadow-lg w-48 py-4 z-40">
                      <ul className="grid grid-cols-1 gap-4 px-4">
                        {Object.entries(allCategories)
                          .filter(([category]) => category === "Bride")
                          .flatMap(([category, subcategories]) =>
                            subcategories.map((subcategory, index) => (
                              <li key={index} >
                                <button
                                  onClick={() =>
                                    handleNavigate(category, subcategory)
                                  }
                                  className="block text-left w-full"
                                >
                                  {subcategory}
                                </button>
                              </li>
                            ))
                          )}
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
                    <div className="absolute left-0 top-full bg-white shadow-lg w-48 py-4 z-40">
                      <ul className="grid grid-cols-1 gap-4 px-4">
                        {Object.entries(allCategories)
                          .filter(([category]) => category === "Groom")
                          .flatMap(([category, subcategories]) =>
                            subcategories.map((subcategory, index) => (
                              <li key={index} >
                                <button
                                  onClick={() =>
                                    handleNavigate(category, subcategory)
                                  }
                                  className="block text-left w-full"
                                >
                                  {subcategory}
                                </button>
                              </li>
                            ))
                          )}
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <NavLink
                    to="/templates"
                    className="cursor-pointer hover:text-dustyRose"
                  >
                    Invitation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/vendorLogin"
                    className="cursor-pointer border px-2 py-1 rounded-md"
                  >
                    Vendor Login
                  </NavLink>
                </li>

                  {(user?.role!=="ADMIN" && user?.role!=="SUPER_ADMIN") ? (
                    <>
                    </>
                  ) : (
                    <>
                    <li className="lg:inline-block">
                        <NavLink
                          to="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary px-3 py-1 border border-primary  rounded-md"
                              : "px-3 py-1 text-primary border border-primary rounded-md"
                          }
                        >
                          ADMIN
                        </NavLink>
                      </li>
                    </>
                  )}

                  {( user?.role!=="USER" && user?.role!=="ADMIN" && user?.role!=="SUPER_ADMIN" ) ? (
                    <>
                      <li className="lg:inline-block">
                        <NavLink
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary px-3 py-1 border border-primary  rounded-md"
                              : "px-3 py-1 text-primary border border-primary rounded-md"
                          }
                        >
                          Login
                        </NavLink>
                      </li>
                      <li className="lg:inline-block">
                        <NavLink
                          to="/signup"
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? "text-white px-3 py-1.5 bg-primary rounded-md"
                              : "text-white px-3 py-1.5 bg-primary rounded-md"
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
                        className="flex items-center gap-x-2 cursor-pointer"
                      >
                        <img
                          src={user?.profile_photo || Avatar}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                        <CustomText
                          variant="paragraph"
                          className="text-sm hidden lg:block"
                          text="Profile"
                        />
                      </div>
                    </li>
                  )}
                </ul>
              </div>
              {/* Background Overlay */}
              <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                  isMenuOpen
                    ? "opacity-100 backdrop-blur-md"
                    : "opacity-0 pointer-events-none"
                } z-40`}
                onClick={() => setIsMenuOpen(false)}
              />
            </nav>
          </>
        </div>
    </>
  );
}

export default Navbar;