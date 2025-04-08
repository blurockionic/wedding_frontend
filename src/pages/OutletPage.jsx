import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

export default function OutletPage() {
  const location = useLocation();

  const ScrollToTop = () => {
    const location = useLocation();

    const navigationType = useNavigationType();

    useEffect(() => {
      // Allow a tiny delay to make sure content has rendered

      if (navigationType === "PUSH") {
        const timeout = setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
        return () => clearTimeout(timeout);
      }

    
    }, [location.pathname, navigationType]);

    return null;
  };

  const isVendorDashboard = location.pathname
    .toLowerCase()
    .includes("/vendordashboard");

  return (
    <>
      {!isVendorDashboard && <Navbar />}

      <div className="z-30">
        <ScrollToTop />
        <Outlet />
      </div>
    </>
  );
}
