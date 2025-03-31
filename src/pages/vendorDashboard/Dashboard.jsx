import VendorSidebar from "./VendorSidebar";
import VendorHeader from "./VendorHeader";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import DynamicTitle from "../../components/global/dynamicTitle/DynamicTitle";

const VendorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-5">
      <DynamicTitle title={"Vendor Dashbaord"} />
      {/* Sidebar Component */}
      <div className="fixed inset-y-0 left-0  z-50">
        <VendorSidebar
          footer={
            <p className="text-sm text-gray-700">© 2024 Marriage Vendors</p>
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      <div
        className={`flex flex-col  transition-all  duration-300 ${
          isOpen ? "lg:ml-0" : "lg:ml-64"
        } h-full min-h-screen`}
      >
        <div >
          <VendorHeader toggleSidebar={toggleSidebar} isOpen={isOpen} />
        </div>

        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
