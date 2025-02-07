import { useEffect, useRef, useState } from "react";
import { GoBell, GoPerson } from "react-icons/go";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useVendorLogoutMutation } from "../../redux/vendorSlice";
import { HiOutlineLanguage } from "react-icons/hi2";
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
      
        navigate("/vendorLogin");
      }
    } catch (error) {
      // console.error("Logout failed:", error);
      // toast.error("Logout failed. Please try again.");
      toast.success("Logout successful")
    }
    finally{
      dispatch(userlogout());
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
    <nav className=" bg-background shadow-md px-6 py-3 flex items-center justify-between lg:rounded-md">
      {/* Left: Brand Name */}
      <Link to="/VendorDashboard" className="font-bold text-2xl ml-10 m-0 text-primary">
        Dashboard
      </Link>

      {/* Right: Action Buttons */}
      <div className="flex items-center space-x-4">
        <HiOutlineLanguage className="text-4xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-primary hover:text-background rounded-full text-foreground" />
        <GoBell className="text-4xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-primary hover:text-background rounded-full text-foreground" />
        <GoPerson
            onClick={handleProfileOpen}
            
            className="text-3xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-primary hover:text-background rounded-full text-foreground"
            size={40}
          />
        {/* Profile Dropdown */}
        <div className="absolute right-4 top-20 " ref={profileRef} >

          
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
