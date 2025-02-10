import React, { useState } from "react";
import Payments from "./component/Payments";
import ActiveSubscription from "./ActiveSubscription";

export default function Billing() {
  const [activeTab, setActiveTab] = useState("history"); // Default tab

  return (
    <div className=" mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-start gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md border ${
            activeTab === "history"
              ? "bg-primary-foreground text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Payment History
        </button>

        <button
          className={`px-4 py-2 rounded-md border ${
            activeTab === "subscription"
              ? "bg-primary-foreground text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("subscription")}
        >
          Active Subscription
        </button>
      </div>

      {/* Tab Content */}
      <div className="border p-4 rounded-md shadow-md">
        {activeTab === "history" && <Payments />}

        {activeTab === "subscription" && <ActiveSubscription />}
      </div>
    </div>
  );
}
