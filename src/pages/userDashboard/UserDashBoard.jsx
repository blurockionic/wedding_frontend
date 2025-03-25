import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useLogoutMutation } from "../../redux/apiSlice.auth";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { GoChecklist } from "react-icons/go";
import { Heart, User } from "lucide-react";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";

const UserDashBoard = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  // Array of links and their paths
  const navItems = [
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Checklist", path: "/profile/checklist", icon: <GoChecklist size={20} /> },
    { name: "Wedding Planner", path: "/profile/weddingplan", icon: <LuNotebookPen size={20}/>},
    { name: "Wishlist", path: "/profile/favoriteList", icon: <Heart size={20} /> },
    // { name: "Settings", path: "settings" },
  ];

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
      toast.error(error?.data?.message);
    } finally {
      dispatch(userlogout());
    }
  };

 

  return (
    <div className=" ">
      <div className=" flex flex-col lg:flex-row lg:justify-between gap-4">
        {/* Sidebar */}
        <div className="w-full lg:w-[307px] p-4 border-r border-pink-200 bg-pink-50  md:h-screen">
          <h2 className="text-2xl   mb-6 text-center lg:text-left w-full px-4 md:mt-6">
            Dashboard
          </h2>
          <ul className="flex  flex-col space-y-4 ">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    // Ensure active styling matches only for the exact path
                    isActive && location.pathname === item.path
                      ? "text-pink-500 font-semibold block rounded-md py-2 px-4 bg-pink-100"
                      : "text-black font-semibold block rounded-md py-2 px-4 hover:text-pink-500 hover:bg-pink-50"
                  }
                  end // Ensure exact match for root path "/"
                >
                  <p className="flex items-center gap-2">
                    {item.icon}
                    {item.name}
                    
                    {
                      (item.path === "/profile" && userData.is_verified) && (<><span className="flex justify-start gap-1 items-center text-xs text-green-500 bg-white px-2 py-.5 rounded-full"><MdOutlineVerified /> Verified</span></>)
                    }
                  </p>
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleLogout()}
            className="w-full mt-4 md:mt-20 px-4 py-3 text-muted text-sm bg-primary rounded-md hover:bg-pink-600 focus:outline-none z-50"
          >
            Logout
          </button>
        </div>

        {/* Outlet for rendering child components */}
        <div className="w-full lg:w-full   bg-white ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
