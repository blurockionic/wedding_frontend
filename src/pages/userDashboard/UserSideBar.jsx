import { GoChecklist } from "react-icons/go";
import { Heart, User } from "lucide-react";
import { LuNotebookPen } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../redux/apiSlice.auth";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { custom } from "zod";
import { MdOutlineVerified } from "react-icons/md";

const navItems = [
  { name: "Profile", path: "/profile", icon: <User size={20} /> },
  {
    name: "Checklist",
    path: "/profile/checklist",
    icon: <GoChecklist size={20} />,
  },
  {
    name: "Wedding Planner",
    path: "/profile/weddingplan",
    icon: <LuNotebookPen size={20} />,
  },
  {
    name: "Wishlist",
    path: "/profile/favoriteList",
    icon: <Heart size={20} />,
  },
];

export default function UserSideBar({ customClass }) {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  const userData = useSelector((state) => state.auth.user);
  const handleLogout = async () => {
    try {
      const response = await logout();
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        dispatch(userlogout());
        localStorage.removeItem("hasVisited")
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
    <div
      className={`w-full lg:w-[307px] p-4 border-r border-pink-200 bg-pink-50  lg:h-screen ${customClass}`}
    >
      <h2 className="text-2xl   font-semibold mb-6 text-center lg:text-left w-full px-4 md:mt-6">
        User Dashboard
      </h2>
      <ul className="flex  flex-col space-y-4 ">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive && location.pathname === item.path
                  ? "text-primary  block rounded-md py-3 px-4 bg-pink-100 border border-primary"
                  : "text-black block rounded-md py-3 px-4 hover:text-primary hover:bg-pink-50"
              }
              end // Ensure exact match for root path "/"
            >
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                {item.icon}
                {item.name}
                </span>
                {item.path === "/profile" && userData?.is_verified && (
                  <>
                    <span className="flex justify-start gap-1 items-center text-xs text-green-500 bg-white px-1 py-.5 rounded-full ml-5">
                      <MdOutlineVerified /> Verified
                    </span>
                  </>
                )}
              </span>
              
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="max-w-[307px] mx-auto">
        <button
          onClick={() => handleLogout()}
          className="w-full mt-4 md:mt-20 px-4 py-3 text-muted text-sm bg-primary rounded-md hover:bg-pink-600 focus:outline-none z-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
