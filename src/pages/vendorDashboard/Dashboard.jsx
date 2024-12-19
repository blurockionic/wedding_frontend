import VendorSidebar from "./VendorSidebar";
import { links } from "../../static/static";
import VendorHeader from "./VendorHeader";

import { Outlet } from "react-router-dom";

const VendorDashboard = () => {
  return (
    <div className="flex">
      <VendorSidebar
        links={links}
        footer={
          <p className="text-sm text-gray-400">© 2024 Visualize Dashboard</p>
        }
      />

      <main className="flex-1 m-0 lg:m-2">
        <VendorHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default VendorDashboard;
