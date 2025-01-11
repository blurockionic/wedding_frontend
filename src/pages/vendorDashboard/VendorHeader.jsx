import { useEffect, useRef, useState } from "react";
import { GoBell, GoPerson } from "react-icons/go";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Links, useNavigate } from "react-router-dom";
import { useVendorLogoutMutation } from "../../redux/vendorSlice";
import { HiOutlineLanguage } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { userlogout } from "../../redux/authSlice";

const VendorHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vendorLogout] = useVendorLogoutMutation();

  // handle on logout
  const handleOnLogout = async () => {
    try {
      const response = await vendorLogout();
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        dispatch(userlogout());
        navigate("/vendorLogin");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

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

  return (
    <header className="w-full  bg-[#121e32] customShadow px-6 py-3 flex  items-center justify-end lg:justify-between lg:rounded-md">
      {/* Left: Brand Name */}

      <Link to={"/"}  className="font-bold text-3xl md:block hidden text-white ">wedd</Link>
      {/* Right: Action Buttons */}
      <div className="flex items-center space-x-1">
        <HiOutlineLanguage className="text-4xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-[#2563EB] rounded-full text-white" />

        <GoBell className="text-4xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-[#2563EB] rounded-full text-white" />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <GoPerson
            onClick={handleProfileOpen}
            className="text-3xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-[#2563EB] rounded-full text-white"
            size={40}
          />
          {profileOpen && (
            <div className="absolute right-0 mt-5 w-48 bg-[#374151] text-white rounded-md shadow-lg overflow-hidden z-20">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-[#9CA3AF] hover:text-white hover:bg-[#2563EB]"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-[#9CA3AF] hover:text-white hover:bg-[#2563EB]"
              >
                Settings
              </Link>
              <button
                onClick={handleOnLogout}
                className="w-full text-left px-4 py-2 text-sm text-[#9CA3AF] hover:text-white hover:bg-[#2563EB]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
