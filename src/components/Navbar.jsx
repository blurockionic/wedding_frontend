import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import Avatar from "../../public/user.png";
import brandlogo  from "../../public/logo/brandlogo.png"

function Navbar() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutMutation] = useLogoutMutation();
  const [dropdown, setDropdown] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnProfile = () => {
    navigate("/profile");
  };

  console.log(location.pathname);
  const handleNavigate = (item) => {
    setIsMenuOpen(false);
    navigate(`/services?search=${encodeURIComponent(item)}`);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const groomsCategories = [
    {
      title: "Attire",
      items: ["Sherwanis", "Suits", "Indo-Western", "Kurtas", "Dhotis", "Tailoring"],
    },
    {
      title: "Accessories",
      items: ["Safas", "Mojaris", "Brooches", "Cufflinks", "Watches", "Stoles"],
    },
    {
      title: "Services",
      items: ["Makeup", "Skincare", "Stylists", "Fitness Plans", "Grooming"],
    },
  ];
  
  const weddingVenueCategories = [
    {
      title: "Luxury Venues",
      items: ["5-Star Hotels", "Resorts & Villas", "Banquet Halls", "Royal Palaces"],
    },
    {
      title: "Outdoor & Destination",
      items: ["Garden Venues", "Beachfront Weddings", "Mountain Venues", "Lakefront Venues"],
    },
    {
      title: "Traditional & Budget",
      items: ["Community Halls", "Temple Weddings", "Budget Banquets", "Farmhouses"],
    },
    {
      title: "Special Theme Venues",
      items: ["Vintage Style", "Boho Chic", "Rustic Barns", "Eco-Friendly Venues"],
    },
  ];
  

  const weddingVendorCategories = [
    {
      title: "Planning & Decor",
      items: ["Wedding Planners", "Decorators", "Caterers", "Venues", "Event Rentals"],
    },
    {
      title: "Photography & Beauty",
      items: ["Photographers", "Makeup Artists", "Mehendi Artists", "Entertainment", "DJ & Music"],
    },
  ];
  
  const brideCategories = [
    { title: "Attire", items: ["Lehengas", "Sarees", "Gowns", "Dresses"] },
    { title: "Accessories", items: ["Jewelry", "Footwear", "Handbags", "Hairpieces"] },
    { title: "Beauty", items: ["Makeup", "Skincare", "Mehendi", "Nail Art"] },
  ];
  
  
  
  
  return (
    <>
        <div className={`${(location.pathname === "/vendorLogin") ||
        (location.pathname === "/vendorSignup") ? "hidden" : "block"}`}>
        <>
            <TopNavbar />
            <nav className="w-full bg-white top-0 px-4 lg:px-16 z-50 shadow-sm">
              <div className="w-full flex justify-between items-center py-4">
                <div className="text-2xl font-bold text-primary cursor-pointer">
                  <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
                   <img src={brandlogo} alt="brandlogo" className="w-10 h-10"/>
                   <div className="flex flex-col justify-start">
                   <span className="text-primary text-2xl">Marriage Vendors</span>
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
              flex flex-col lg:flex-row lg:gap-8 gap-4
              absolute lg:relative z-50
              rounded-lg m-2
              bg-white text-gray-600 font-medium
              h-screen lg:h-0 w-1/2 left-0 top-0
              lg:w-auto lg:top-auto lg:items-center
              px-4 py-4 lg:py-0 lg:px-0 transition-transform
              duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0`}
                >
                  <div className="text-2xl block lg:hidden font-bold text-primary cursor-pointer my-7 ">
                  <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
                   <img src={brandlogo} alt="brandlogo" className="w-10 h-10"/>
                   <div className="flex flex-col justify-start">
                   <span className="text-primary text-lg">Marriage Vendors</span>
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
                  <span className="cursor-pointer hover:text-dustyRose font-medium">
                    Wedding Venue
                  </span>
                  {dropdown === "wedding venue" && (
                    <div className="absolute left-0 mt-1 top-full bg-white shadow-lg w-[600px] py-4 px-5 z-50 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-2 gap-6">
                        {weddingVenueCategories.map((category, index) => (
                          <div key={index} className="space-y-2">
                            {/* Category Title */}
                            <h3 className="text-base font-semibold text-rose-600 border-b border-rose-300 pb-1">
                              {category.title}
                            </h3>
                            <ul className="space-y-1 text-gray-700 text-sm">
                              {category.items.map((item, i) => (
                                <li key={i}>
                                  <button
                                    onClick={() => handleNavigate(item)}
                                    className="block w-full text-left hover:text-rose-500 hover:bg-gray-100 transition duration-200 p-1 rounded-md"
                                  >
                                    {item}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>



                  {/* wedding vendor  */} 
                  <li
                  className="relative lg:inline-block"
                  onMouseEnter={() => setDropdown("wedding vendor")}
                  onMouseLeave={() => setDropdown("")}
                >
                  <span className="cursor-pointer hover:text-dustyRose font-medium">
                    Wedding Vendor
                  </span>
                  {dropdown === "wedding vendor" && (
                    <div className="absolute left-0 mt-1 top-full bg-white shadow-lg w-[500px] py-3 px-4 z-50 rounded-md border border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        {weddingVendorCategories.map(({ title, items }, index) => (
                          <div key={index}>
                            <h3 className="text-sm font-semibold text-rose-600 border-b pb-1">
                              {title}
                            </h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {items.map((item, i) => (
                                <li key={i}>
                                  <button
                                    onClick={() => handleNavigate(item)}
                                    className="w-full text-left hover:text-rose-500 hover:bg-gray-100 p-1 rounded-md transition"
                                  >
                                    {item}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>



                  {/* Brides Dropdown */}
                  <li
                  className="relative lg:inline-block"
                  onMouseEnter={() => setDropdown("bride")}
                  onMouseLeave={() => setDropdown("")}
                >
                  <span className="cursor-pointer hover:text-rose-600 font-medium transition">
                    Bride
                  </span>
                  {dropdown === "bride" && (
                    <div className="absolute left-0 mt-2 top-full bg-white shadow-lg w-[400px] py-3 px-4 z-50 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        {brideCategories.map(({ title, items }, index) => (
                          <div key={index}>
                            <h3 className="font-semibold text-rose-600 border-b pb-1">{title}</h3>
                            <ul className="pt-1">
                              {items.map((item, i) => (
                                <li key={i}>
                                  <button
                                    onClick={() => handleNavigate(item)}
                                    className="w-full text-left hover:text-rose-500 py-1 transition"
                                  >
                                    {item}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>




                  {/* Grooms Dropdown */}
                  <li
                    className="relative lg:inline-block"
                    onMouseEnter={() => setDropdown("grooms")}
                    onMouseLeave={() => setDropdown("")}
                  >
                    <span className="cursor-pointer hover:text-rose-600 font-medium transition">
                      Grooms
                    </span>
                    {dropdown === "grooms" && (
                      <div className="absolute left-0 mt-1 top-full bg-white shadow-lg w-[400px] py-3 px-4 z-50 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                          {groomsCategories.map(({ title, items }, index) => (
                            <div key={index}>
                              <h3 className="font-semibold text-rose-600 border-b pb-1">{title}</h3>
                              <ul className="pt-1">
                                {items.map((item, i) => (
                                  <li key={i}>
                                    <button
                                      onClick={() => handleNavigate(item)}
                                      className="w-full text-left hover:text-rose-500 py-1 transition"
                                    >
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>



                  {!isLoggedIn ? (
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
                              ? "text-white px-3 py-1 bg-primary rounded-md"
                              : "text-white px-3 py-1 bg-primary rounded-md"
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
