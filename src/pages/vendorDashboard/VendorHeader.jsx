import { useEffect, useRef, useState } from "react";
import { GoBell, GoPerson } from "react-icons/go";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useVendorLogoutMutation } from "../../redux/vendorSlice";
import { userlogout } from "../../redux/authSlice";
import { FaBars } from "react-icons/fa";

const VendorHeader = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vendorLogout] = useVendorLogoutMutation();

  // handle on logout

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnLogout = async () => {
    try {
      const response = await vendorLogout();
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        dispatch(userlogout());
        navigate("/vendorLogin");
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
    <nav className="   flex items-center py-4 justify-between lg:rounded-md">
      {!isOpen ? (
        <button
          onClick={toggleSidebar}
          className=" z-50 bg-gradient-to-b from-pink-700 via-pink-800 to-pink-900 text-gray-100 p-3 rounded-full shadow-lg lg:hidden"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      ) : (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-70 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Left: Brand Logo */}
      {/* Left: Brand Name */}
      <Link to="/VendorDashboard" className="font-bold text-2xl text-primary">
        Overview
      </Link>

      {/* Right: Action Buttons */}
      <div className="flex items-center space-x-4 border border-primary rounded-full">
        <GoPerson
          onClick={handleProfileOpen}
          className="text-primary text-3xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-primary hover:text-background rounded-full"
          size={40}
        />
        {/* Profile Dropdown */}
        <div className="absolute right-4 top-20 " ref={profileRef}>
          {profileOpen && (
            <div className="w-48 bg-background  rounded-md shadow-lg overflow-hidden z-50">
              <Link
                to="vendor-profile"
                className="block px-4 py-2 text-sm text-foreground hover:text-white hover:bg-primary"
              >
                Profile
              </Link>
              <Link
                to="vendor-setting"
                className="block px-4 py-2 text-sm text-foreground hover:text-white hover:bg-primary"
              >
                Settings
              </Link>
              <button
                onClick={handleOnLogout}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:text-white hover:bg-primary"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default VendorHeader;
