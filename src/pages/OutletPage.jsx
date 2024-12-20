import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function OutletPage() {
  const location = useLocation();

  const isVendorDashboard = location.pathname.includes("/vendorDashboard");

  return (
    <>
    
      {!isVendorDashboard && <Navbar />}
      
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
