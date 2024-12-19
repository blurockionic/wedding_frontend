import  {  useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";




const VendorSidebar = ({ links,  footer }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOnActive = (link) => {
    setActiveTab(link);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1 lg:top-2 left-2 lg:left-4 z-50 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-gray-100 p-3 rounded-full shadow-lg lg:hidden"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`my-2 lg:my-2 lg:mx-2 fixed h-[98vh] rounded-md inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-gray-100 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none transition-transform duration-300 ease-in-out`}
        style={{ width: "16rem" }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 mt-3">
          <div className="flex items-center gap-2">
            {/* <img
              src={logo}
              alt="Logo"
              className="h-8 w-8 shadow-lg shadow-white bg-transparent rounded-md"
            /> */}


            <h1 className=" lg:text-sm xl:text-lg xl:font-bold lg:font-semibold hidden xl:block">Visualize Dashboard</h1>
          </div>

          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-gray-200 lg:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-10">
          <ul>
            {links?.map((link, index) => (
              <li key={index} className="group m-2">
                <Link
                  to={link.href}
                  className={`flex items-center gap-4 p-3 hover:bg-gray-900 rounded-md ${
                    activeTab === link.href ? "bg-gray-900" : ""
                  }`}
                  onClick={() => {
                    setIsOpen(false); // Close sidebar on link click
                    handleOnActive(link.href); // Set active tab
                  }}
                >
                  <link.icon className="h-6 w-6 text-gray-400 group-hover:text-gray-200" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {footer && <div className="p-4 flex justify-center items-center">{footer}</div>}
      </div>
    </>
  );
};

export default VendorSidebar;
