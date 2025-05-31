import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/apiSlice.auth";
import { useDispatch } from "react-redux";
import { userlogout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role?.toLowerCase();

  // Array of links and their paths
  const navItems = [
    { name: "General Analytics", path: "" }, // Use "/" for the default route
    { name: "Vendor Search", path: "vendorSearch" },
    { name: "Service Search", path: "serviceSearch" },
    { name: "User Search", path: "userSearch" },
    { name: "Bill & transactions", path: "transactions" },
    { name: "Reports", path: "" },
    { name: "Blog", path: "../blog_dashboard" },
    {name: "Partners", path: "partnerAdminDashboard" },
  ];

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
    <div className="w-1/5 bg-white border-r border-pink-200 p-6 overflow-y-auto sticky top-0 h-screen">
      <h2 className="text-[1.5vw] text-pink-600 mb-6">Admin Dashboard</h2>
      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive && location.pathname === item.path
                  ? "text-pink-500 font-semibold block rounded-md py-2 px-4 bg-pink-100"
                  : "text-pink-700 font-semibold block rounded-md py-2 px-4 hover:text-pink-500 hover:bg-pink-50"
              }
              end
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="w-full mt-6 px-4 py-3 text-white bg-pink-500 rounded-md hover:bg-pink-600"
      >
        Logout
      </button>
    </div>
  
    {/* Content */}
    <div className="w-4/5 overflow-y-auto p-8">
      <Outlet />
    </div>
  </div>
  );  
   
}

export default AdminDashBoard;