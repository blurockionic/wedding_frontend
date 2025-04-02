import React, { useState } from "react";
import Payments from "./component/Payments";
import ActiveSubscription from "./ActiveSubscription";

export default function Billing() {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { key: "history", label: "Payment History" },
    { key: "subscription", label: "Active Subscription" },
  ];

  const getButtonClass = (tabKey) =>
    `px-4 py-2 rounded-md ${
      activeTab === tabKey
        ? "border-b-2 border-primary text-primary"
        : "text-black"
    }`;

  return (
    <div className="mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-start gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={getButtonClass(tab.key)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === "history" ? <Payments /> : <ActiveSubscription />}
      </div>
    </div>
  );
}
