import React, { useState } from "react";
import ServiceCreate from "./Tabs/ServiceCreate";
import Mediatab from "./Tabs/Mediatab";
import FAQsTab from "./Tabs/FAQsTab";
import AvailabilityTab from "./Tabs/AvailabilityTab";
import { useSelector } from "react-redux";

const TABS = ["Service Data", "Media", "FAQs", "Availability"];

const ServicePage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Service Data");
  const serviceId = useSelector((state) => state.serviceId);
  
  


  return (
    <>
      <div className="  bg-slate-800">
        <div className="flex py-1 px-6 bg-transparent shadow-md sticky top-0 z-10 bg-slate-900">
         
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
        {/* <main className="mx-auto   mt-10 rounded-lg shadow-md">{renderTabContent()}</main> */}
        <ServiceCreate/>
      </div>
    </>
  );
};

export default ServicePage;
