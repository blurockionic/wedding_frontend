import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/apiSlice.auth";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role?.toLowerCase();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for dropdown

  // Array of main navigation items
  const navItems = [
    { name: "General Analytics", path: "" },
    {
      name: "Search",
      icon: <IoSearchOutline className="text-[20px]" />,
      subItems: [
        { name: "Vendor Search", path: "vendorSearch" },
        { name: "Service Search", path: "serviceSearch" },
        { name: "User Search", path: "userSearch" },
      ],
    },
    { name: "Bill & transactions", path: "transactions" },
    { name: "Reports", path: "" },
    { name: "Blog", path: "blog_dashboard" },
    { name: "Partners", path: "partnerAdminDashboard" },
    { name: "UserQuery", path: "query-list" }  //add UserQuery
  ];

  // Add admin-specific items for super_admin role
  if (userRole === "super_admin") {
    navItems.push({ name: "Give Admin", path: "giveAdmin" });
    navItems.push({ name: "Revoke Admin", path: "revokeAdmin" });
    navItems.push({ name: "Give Super Admin", path: "giveSuperAdmin" });
  }

  const handleLogout = async () => {
    try {
      const response = await logout();
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        dispatch(userlogout());
        navigate("/", { replace: true });
        return;
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error?.data?.message);
    } finally {
      dispatch(userlogout());
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/6 bg-[#ffd7f7] border-r border-t border-[#F72AAFB3] p-6 overflow-y-auto sticky top-0 h-screen">
        <h2 className="text-xl mb-8 font-semibold mt-8">Admin Dashboard</h2>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                // Search item with dropdown
                <div>
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="flex items-center w-full text-gray-600 font-medium py-2 px-4 rounded-md hover:text-pink-600 hover:bg-pink-100"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                    <IoIosArrowDown
                      className={`ml-auto transition-transform ${
                        isSearchOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isSearchOpen && (
                    <ul className="pl-8 mt-2 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              isActive
                                ? "flex items-center text-pink-600 font-medium py-2 px-4 rounded-md bg-pink-100"
                                : "flex items-center text-gray-600 font-medium py-2 px-4 rounded-md hover:text-pink-600 hover:bg-pink-100"
                            }
                            end
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                // Regular navigation item
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive && location.pathname === item.path
                      ? "flex items-center text-pink-600 font-medium py-2 px-4 rounded-md bg-pink-100"
                      : "flex items-center text-gray-600 font-medium py-2 px-4 rounded-md hover:text-pink-600 hover:bg-pink-100"
                  }
                  end
                >
                  <span className="mr-3">
                    {item.name === "General Analytics" && <IoIosMenu className="text-[26px]" />}
                    {item.name === "Bill & transactions" && <IoIosMenu className="text-[26px]" />}
                    {item.name === "Reports" && <IoPersonOutline className="text-[20px]" />}
                    {item.name === "Blog" && <IoPersonOutline className="text-[20px]" />}
                    {item.name === "Partners" && <IoPersonOutline className="text-[20px]" />}
                    {item.name === "UserQuery" && <IoPersonOutline className="text-[20px]" />}
                    {(item.name === "Give Admin" ||
                      item.name === "Revoke Admin" ||
                      item.name === "Give Super Admin") && (
                      <IoPersonOutline className="text-[20px]" />
                    )}
                  </span>
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full mt-8 px-4 py-3 text-white bg-[#f20574] rounded-md hover:bg-pink-600"
        >
          Logout
        </button>
        <p className="text-gray-700 text-center text-sm mt-8">©2024 Marriage Vendors</p>
      </div>

      {/* Content */}
      <div className="w-4/5 overflow-y-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashBoard;