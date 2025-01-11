import VendorSidebar from "./VendorSidebar";
import VendorHeader from "./VendorHeader";
import { Outlet } from "react-router-dom";
import { useState } from "react";


const VendorDashboard = () => {
 
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <VendorSidebar
        footer={
          <p className="text-sm text-gray-400">© 2024 Visualize Dashboard</p>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 m-0 bg-slate-800 lg:m-2">
        <VendorHeader isOpen={isOpen} />
        <Outlet />
      </main>
    </div>
  );
};

export default VendorDashboard;
