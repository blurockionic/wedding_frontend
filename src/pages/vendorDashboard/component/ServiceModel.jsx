import React, { useState } from "react";
import ServiceCreate from "./Tabs/ServiceCreate";
import Mediatab from "./Tabs/Mediatab";
import FAQsTab from "./Tabs/FAQsTab";
import AvailabilityTab from "./Tabs/AvailabilityTab";

const TABS = ["Service Data", "Media", "FAQs", "Availability"];

const ServicePage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Service Data");
  const [serviceId, setServiceId] = useState(null); // Store the service ID

  const renderTabContent = () => {
    switch (activeTab) {
      case "Service Data":
        return (
          <ServiceCreate 
            onServiceCreated={(id) => setServiceId(id)} // Pass handler to store serviceId
          />
        );
      case "Media":
        return <Mediatab serviceId={serviceId} />; // Pass serviceId to MediaTab
      case "FAQs":
        return <FAQsTab serviceId={serviceId} />;
      case "Availability":
        return <AvailabilityTab serviceId={serviceId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="service-page h-fit bg-slate-800">
        <div className="flex py-1 px-6 bg-transparent shadow-md sticky top-0 z-10">
          <div className="container mx-auto flex border-gray-300">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-lg font-medium ${
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
          <button
            onClick={onClose}
            title="Close Form"
            className="ml-4 px-5 bg-slate-600 text-white font-medium rounded-lg shadow hover:bg-red-900 hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            Close
          </button>
        </div>

        <div className="w-full mt-2 bg-slate-600"></div>

        {/* Tab Content */}
        <main className="mx-auto mt-2">{renderTabContent()}</main>
      </div>
    </>
  );
};

export default ServicePage;
