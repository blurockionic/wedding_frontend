import { useState, useEffect } from "react";
import { FaBars, FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { links } from "../../static/static";
import brandlogo from "../../../public/logo/brandlogo.png";
import { useGetSubscriptionQuery } from "../../redux/payment";
import { getRemainingDays } from "../../static/helper";

const VendorSidebar = ({ footer, setIsOpen, isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2] || "";
  
  const [activeTab, setActiveTab] = useState(currentPath);
  const { data, isLoading: subLoading, isError } = useGetSubscriptionQuery();
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    if (data?.subscriptions?.length > 0) {
      setActiveSubscription(data.subscriptions[0]);
    }
  }, [data]);


  

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOnActive = (link) => {
    setActiveTab(link);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-3 lg:top-2 left-2 lg:left-4 z-50 bg-gradient-to-b from-pink-700 via-pink-800 to-pink-900 text-gray-100 p-3 rounded-full shadow-lg lg:hidden"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-70 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`my-2 lg:my-2 lg:mx-2 fixed h-[98vh] rounded-md inset-y-0 
          left-0 z-50 flex flex-col border border-primary  text-gray-100 
          bg-gradient-to-br from-white via-pink-50 to-pink-300
          shadow-xl transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:shadow-none transition-transform duration-300 ease-in-out`}
        style={{ width: "16rem" }}
      >
        <div className="flex items-center justify-between p-4 mt-3">
          <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={brandlogo} alt="brandlogo" className="w-10 h-10" />
            <div className="flex flex-col justify-start">
              <span className="text-primary text-xl">Marriage Vendors</span>
              <span className="text-primary text-xs">Wedding Organiser</span>
            </div>
          </NavLink>

          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-gray-200 lg:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-1 flex-col h-full justify-between mt-10">
          <ul>
            {links?.map((link, index) => (
              <li key={index} className="group m-2">
                <Link
                  to={link.href}
                  className={`flex items-center gap-4 p-3 hover:bg-primary hover:text-foreground rounded-md ${
                    activeTab === link.href
                      ? "bg-primary text-background"
                      : "text-foreground"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    handleOnActive(link.href);
                  }}
                >
                  <link.icon
                    className={`h-6 w-6 ${
                      activeTab === link.href ? "text-background" : ""
                    }`}
                  />
                  <span className="text-sm">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
         
        </nav>
            <div className="h-1 bg-white"></div>
        <div className="text-center">
            {subLoading ? (
              <p className="text-sm text-gray-500">Loading subscription...</p>
            ) : isError || !activeSubscription ? (
              <li className="group m-2">
                <Link
                  to="Plan"
                  className={`flex items-center gap-4 p-3 hover:bg-primary hover:text-foreground rounded-md ${
                    activeTab === "Plan"
                      ? "bg-primary text-background"
                      : "text-foreground"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    handleOnActive("Plan");
                  }}
                >
                  <FaMoneyBillWave
                    className={`h-6 w-6 ${
                      activeTab === "Plan" ? "text-background" : ""
                    }`}
                  />
                  <span className="text-sm">Get Plan</span>
                </Link>
              </li>
            ) : (
              <Link
                className="group cursor-pointer gap-4 p-3 hover:bg-primary hover:text-foreground m-2 h-14 text-sm text-white font-semibold bg-gradient-to-r from-green-300 via-blue-400 to-purple-600 bg-[length:200%_200%] animate-gradient-move flex items-center justify-center rounded-md shadow-md"
                to="Plan"
                onClick={() => {
                  setIsOpen(false);
                  handleOnActive("Plan");
                }}
              >
                {+(getRemainingDays(
                  activeSubscription?.is_trial
                    ? activeSubscription?.trial_end_date
                    : activeSubscription?.end_date
                ))}{" "}
                days remaining
              </Link>
            )}
          </div>
        {footer && <div className="p-4 flex justify-center items-center">{footer}</div>}
      </div>
    </>
  );
};

export default VendorSidebar;
