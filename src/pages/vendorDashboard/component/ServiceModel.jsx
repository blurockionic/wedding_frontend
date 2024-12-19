import React, { useState } from "react";
import OverviewTab from "./Tabs/OverviewTab";
import Mediatab from "./Tabs/Mediatab";
import FAQsTab from "./Tabs/FAQsTab";
import ReviewsTab from "./Tabs/ReviewsTab";
import AvailabilityTab from "./Tabs/AvailabilityTab";

const TABS = ["Overview", "Media", "FAQs", "Reviews", "Availability"];

const ServiceModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewTab />;
      case "Media":
        return <Mediatab />;
      case "FAQs":
        return <FAQsTab />;
      case "Reviews":
        return <ReviewsTab />;
      case "Availability":
        return <AvailabilityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <div className="tabs flex border-b border-gray-300 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 text-lg font-medium ${
                tab === activeTab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content mb-6">{renderTabContent()}</div>
        <button
          className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ServiceModal;
