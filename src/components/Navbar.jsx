import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NavbarRoutesConfig from "../assets/NavabarRouteConfig";
import { useSelector } from "react-redux";
import { allCategories } from "../static/static";
import Avatar from "../../public/user.png";
import brandlogo from "../../public/logo/brandlogo.png";
import { User } from "lucide-react";
import UserSideBar from "../pages/userDashboard/UserSideBar";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnProfile = () => {
    navigate("/profile");
  };

  const handleNavigate = (category, subcategories) => {
    setIsMenuOpen(false);
    navigate(`/all/${category}/${subcategories}`);
  };

  const sidebarRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setIsProfileOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const categories = [
    { title: "Venue", key: "Wedding Venue", gridCols: 1, width: "w-48" },
    { title: "Vendor", key: "Wedding Vendor", gridCols: 2, width: "w-96" },
    { title: "Brides", key: "Bride", gridCols: 1, width: "w-48" },
    { title: "Grooms", key: "Groom", gridCols: 1, width: "w-48" },
  ];

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
              <button
                className="block lg:hidden text-gray-800"
                onClick={toggleMenu}
              >
                {!isMenuOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-10 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              <div className="text-2xl font-bold text-primary cursor-pointer">
                <NavLink
                  to="/"
                  className="flex  flex-col lg:gap-3 lg:flex-row items-center cursor-pointer"
                >
                  <img
                    src={brandlogo}
                    alt="brandlogo"
                    className=" w-8 h-8 lg:w-10 lg:h-10"
                  />
                  <span className=" xl:block text-primary text-xs lg:text-2xl">
                    Marriage Vendors
                  </span>
                </NavLink>
              </div>

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

                {categories.map(({ title, key, gridCols, width }) => (
                  <DropdownMenu
                    key={key}
                    title={title}
                    categoryKey={key}
                    allCategories={allCategories}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    handleNavigate={handleNavigate}
                    gridCols={gridCols}
                    width={width}
                  />
                ))}
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

                {user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN" ? (
                  <></>
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

                {user?.role !== "USER" &&
                user?.role !== "ADMIN" &&
                user?.role !== "SUPER_ADMIN" ? (
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
                    </div>
                  </li>
                )}
              </ul>

              {user?.role === "USER" && (
                <User
                  onClick={toggleProfile}
                  className="lg:hidden cursor-pointer"
                  size={34}
                />
              )}
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

          <div
            className={`fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm 
    transition-opacity duration-300 ease-in-out
    ${
      isProfileOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
          >
            <div
              ref={sidebarRef}
              className={`fixed top-0 left-0 z-50 w-64 h-screen shadow-lg 
      transform transition-transform duration-300 ease-in-out
      ${isProfileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <UserSideBar customClass={"h-screen pt-10"} />
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default Navbar;

const DropdownMenu = ({
  title,
  categoryKey,
  allCategories,
  dropdown,
  setDropdown,
  handleNavigate,
  gridCols = 1,
  width = "w-48",
}) => {
  return (
    <li
      className="relative lg:inline-block"
      onMouseEnter={() => setDropdown(categoryKey)}
      onMouseLeave={() => setDropdown("")}
    >
      <span className="cursor-pointer hover:text-dustyRose">{title}</span>
      {dropdown === categoryKey && (
        <div
          className={`absolute left-0 top-full bg-white shadow-lg ${width} py-4 z-40`}
        >
          <ul className={`grid grid-cols-${gridCols} gap-4 px-4`}>
            {Object.entries(allCategories)
              .filter(([category]) => category === categoryKey)
              .flatMap(([category, subcategories]) =>
                subcategories.map((subcategory, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigate(category, subcategory)}
                      className="block text-left w-full hover:text-dustyRose"
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
  );
};
