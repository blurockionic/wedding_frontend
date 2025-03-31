import { useState, useEffect } from "react";
import {  FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { links } from "../../static/static";
import brandlogo from "../../../public/logo/brandlogo.png";
import { useGetSubscriptionQuery } from "../../redux/payment";
import { getRemainingDays } from "../../static/helper";

const VendorSidebar = ({ footer, setIsOpen, isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2] || "";

  const [activeTab, setActiveTab] = useState(currentPath);
  const {
    data,
    isLoading: subLoading,
    isError,
    refetch,
  } = useGetSubscriptionQuery();
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    if (data?.subscriptions?.length > 0) {
      const mostRecentActiveSubscription = data.subscriptions
        .filter((sub) => sub.status === "ACTIVE")
        .sort((a, b) => new Date(b.end_date) - new Date(a.end_date))[0];

      if (mostRecentActiveSubscription) {
        setActiveSubscription(mostRecentActiveSubscription);
      } else {
        const pendingSubscription = data.subscriptions.find(
          (sub) => sub.status === "PENDING"
        );
        setActiveSubscription(pendingSubscription || null);
      }
    } else {
      setActiveSubscription(null);
      refetch();
    }
  }, [data]);

 
  const handleOnActive = (link) => {
    setActiveTab(link);
  };

  return (
    <>
      

      <div
        className={`my-2 lg:my-2 lg:mx-2 fixed h-[98vh] rounded-md inset-y-0 
          left-0 z-50 flex flex-col text-gray-100 
          bg-[#FEDCF8] border-r 
          shadow-xl transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:shadow-none transition-transform duration-300 ease-in-out`}
        style={{ width: "16rem" }}
      >
        <div className="flex items-center justify-center p-4 mt-3">
          <NavLink to="/" className="flex flex-col justify-center items-center gap-3 cursor-pointer">
            <img src={brandlogo} alt="brandlogo" className="w-10 h-10" />
            <div className="flex flex-col justify-start">
              <span className="text-primary text-xl">Marriage Vendors</span>
              {/* <span className="text-primary text-xs">Wedding Organiser</span> */}
            </div>
          </NavLink>

          {/* <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-gray-200 lg:hidden"
          >
            <FaTimes size={20} />
          </button> */}
        </div>

        <nav className="flex-1 flex-col h-full justify-between mt-10">
          <ul>
            {links?.map((link, index) => (
              <li key={index} className="group m-2">
                <Link
                  to={link.href}
                  className={`flex items-center gap-4 p-3 hover:bg-[#FFD1EF]  rounded-md ${
                    activeTab === link.href
                      ? "bg-[#FFD1EF] text-primary border-primary border "
                      : "text-foreground"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    handleOnActive(link.href);
                  }}
                >
                  <link.icon
                    className={`h-6 w-6 ${
                      activeTab === link.href ? "text-primary" : ""
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
              {activeSubscription?.status === "PENDING" ? (
                <p>Subscription Pending</p> // Use <p> tag for better structure
              ) : (
                <p>
                  {" "}
                  {/* Enclose the content in a <p> tag */}
                  {activeSubscription?.is_trial ? (
                    <>
                      Trial{" "}
                      {getRemainingDays(activeSubscription?.trial_end_date) > 0
                        ? `ends in ${getRemainingDays(
                            activeSubscription?.trial_end_date
                          )} days` // Removed unnecessary +
                        : "has ended"}
                    </>
                  ) : (
                    <>
                      {getRemainingDays(activeSubscription?.end_date) > 0
                        ? `${getRemainingDays(
                            activeSubscription?.end_date
                          )} days remaining` // Removed unnecessary +
                        : "Subscription has ended"}
                    </>
                  )}
                </p>
              )}
            </Link>
          )}
        </div>
        {footer && (
          <div className="p-4 flex justify-center items-center">{footer}</div>
        )}
      </div>
    </>
  );
};

export default VendorSidebar;
