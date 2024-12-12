import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ServiceList from "../components/ServiceList";
import { useGetServicesQuery } from "../redux/serviceSlice";

function ServicesPage() {
  const [filters, setFilters] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const { data, isLoading, error } = useGetServicesQuery(filters);

  const handleFilterChange = (data) => {
    setFilters(data);
    // Automatically close sidebar on smaller screens after applying filters
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Adjust sidebar visibility based on screen width (768px for md breakpoint)
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (event) => {
      setIsSidebarOpen(event.matches); // Keep sidebar open for larger screens
    };

    // Attach listener
    mediaQuery.addEventListener("change", handleMediaChange);

    // Set initial state based on current screen size
    handleMediaChange(mediaQuery);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-2 h-screen">
      {/* Toggle buttons for mobile */}
      {!isSidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-20 p-2 bg-blue-500 text-white rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          Open Filters
        </button>
      )}
      {isSidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-20 p-2 bg-red-500 text-white rounded"
          onClick={() => setIsSidebarOpen(false)}
        >
          Close Filters
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`absolute md:relative z-10 bg-gray-100 w-full md:w-1/4 h-full md:h-auto transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-600">Error fetching services</p>
          </div>
        ) : (
          <ServiceList services={data?.services || []} />
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
