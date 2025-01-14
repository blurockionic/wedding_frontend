import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import ServiceList from "../components/ServiceList";
import { useGetServicesQuery } from "../redux/serviceSlice";
import { useLocation } from "react-router-dom";

function ServicesPage() {
  const location = useLocation();

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const searchType = queryParams.get("search");
  const searchLocation = queryParams.get("location");

  
  const [filters, setFilters] = useState({
    location:searchLocation,
    service_type:searchType


  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 10; // Items per page


  
  const memoizedFilters = useMemo(
    () => ({ ...filters, page: currentPage, limit: itemsPerPage }),
    [filters, currentPage]


  );

  // Fetch services with pagination
  const { data, error, isLoading } = useGetServicesQuery(memoizedFilters);

  const handleFilterChange = (data) => {
    setFilters(data);
    setCurrentPage(1); // Reset to first page when filters change

    // Automatically close sidebar on smaller screens after applying filters
    if (!window.matchMedia("(min-width: 768px)").matches) {
      setIsSidebarOpen(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (event) => {
      setIsSidebarOpen(event.matches); // Keep sidebar open for larger screens
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    handleMediaChange(mediaQuery);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div className="flex flex-col gap-2 md:flex-row px-2 h-screen relative">
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
        className={`absolute md:relative z-10 bg-muted w-full md:w-1/4 md:h-auto transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          searchType={searchType}
          searchLocation={searchLocation}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1  relative overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p>{error?.data?.message}</p>
          </div>
        ) : (
          <>
            {/* Scrollable Service List */}
            <div className="overflow-y-auto h-[90%] pb-20">
              <ServiceList services={data?.ServiceResult || []} />
            </div>
            {/* Fixed Pagination Controls */}
            <div className="fixed  bottom-4 right-4 flex items-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="mx-2 text-gray-700">
                Page {currentPage} of {data?.totalPages}
              </span>
              <button
                disabled={currentPage === data?.totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
