import { NavLink } from "react-router-dom";
import NavbarRoutesConfig from "../assets/NavabarRouteConfig";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="fixed top-0 w-full bg-transparent z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          <NavLink to="/">WEED</NavLink>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-gray-600 font-medium">
          {NavbarRoutesConfig.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
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

          {!isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-dustyRose-dark border-b-2 border-dustyRose-dark pb-1"
                      : "hover:text-dustyRose"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
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
            <li>
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
