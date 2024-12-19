import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { HiOutlineLanguage } from "react-icons/hi2";
import { Link } from "react-router-dom";

const VendorHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleOnLogout = async () => {
    const response = await logoutUser();
    if (response) {
      dispatch(logout());
      toast.success(response.data.message);
      navigate("/login");
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
    <header className="w-full bg-[#374151] shadow-md px-4 py-3 flex items-center justify-end lg:justify-between lg:rounded-md">
      {/* Left: Brand Name */}
      <div className="hidden lg:flex text-lg font-bold text-white">
        <div className="flex items-center space-x-4">
          <div
            className={`relative ${
              showSearch ? "block" : "hidden"
            } md:block transition-all`}
          >
            <SearchBar
              customStyles="outline-none"
              icon={<FiSearch size={18} />}
            />
          </div>
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="p-2 hidden rounded-full text-white hover:bg-[#2563EB] transition"
            aria-label="Toggle Search"
          >
            <FaSearch size={18} />
          </button>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center space-x-4">
        <HiOutlineLanguage
          className="text-4xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-[#2563EB] rounded-full text-white"
        />

        <FaBell
          className="text-4xl cursor-pointer transition duration-200 ease-in-out p-2 hover:bg-[#2563EB] rounded-full text-white"
        />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <FaUserCircle
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
