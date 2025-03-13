import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/apiSlice.auth";
import { useDispatch } from "react-redux";
import { userlogout } from "../../redux/authSlice";
import { toast } from "react-toastify";

const UserDashBoard = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  // Array of links and their paths
  const navItems = [
    { name: "Profile", path: "" }, // Use "/" for the default route
    { name: "Checklist", path: "checklist" },
    { name: "Budget", path: "weddingbudget" },
    { name: "FavoriteList", path: "favoriteList" },
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
      console.error("Logout failed:", error);
      toast.error(error?.data?.message);
    } finally {
      dispatch(userlogout());
    }
  };

 

  return (
    <div className=" h-screen ">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4  py-6">
        {/* Sidebar */}
        <div className="w-full   lg:w-1/4 shadow-lg rounded-lg p-6 border border-pink-200 bg-white">
          <h2 className="text-2xl font-serif text-pink-600 mb-6 text-center lg:text-left">
            Dashboard
          </h2>
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    // Ensure active styling matches only for the exact path
                    isActive && location.pathname === item.path
                      ? "text-pink-500 font-semibold block rounded-md py-2 px-4 bg-pink-100"
                      : "text-pink-700 font-semibold block rounded-md py-2 px-4 hover:text-pink-500 hover:bg-pink-50"
                  }
                  end // Ensure exact match for root path "/"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleLogout()}
            className="w-full mt-4 px-4 py-3 text-muted text-sm bg-primary rounded-md hover:bg-pink-600 focus:outline-none z-50"
          >
            Logout
          </button>
        </div>

        {/* Outlet for rendering child components */}
        <div className="w-full lg:w-3/4 shadow-lg rounded-lg p-8 bg-white border border-pink-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
