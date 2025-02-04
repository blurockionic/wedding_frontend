import VendorSidebar from "./VendorSidebar";
import VendorHeader from "./VendorHeader";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import DynamicTitle from "../../components/global/dynamicTitle/DynamicTitle";

const VendorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DynamicTitle title={"Vendor Dashbaord"}/>
      {/* Sidebar Component */}
      <div className="fixed inset-y-0 left-0  z-50">
        <VendorSidebar
          footer={<p className="text-sm text-gray-700">© 2024 Marriage Vendors</p>}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      {/* Main Content Wrapper */}
      <div
        className={`flex flex-col bg-background transition-all duration-300 ${
          isOpen ? "lg:ml-0" : "lg:ml-64"
        } min-h-screen`}
      >
        {/* Header */}
        <div className="sticky top-0 z-40  md:px-5 px-0 md:pt-2">
          <VendorHeader isOpen={isOpen} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 ml-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default VendorDashboard;
