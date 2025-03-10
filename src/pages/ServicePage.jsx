import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ServiceList from "../components/ServiceList";
import { useGetServicesQuery } from "../redux/serviceSlice";
import { Link, useLocation } from "react-router-dom";

function ServicesPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchType = queryParams.get("search");
  const searchLocation = queryParams.get("location");

  const [filters, setFilters] = useState({
    location: searchLocation,
    service_type: searchType,
    status: "active",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Update filters if URL params change
 

  // Fetch data with updated filters
  const { data, error, isLoading, refetch } = useGetServicesQuery({
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
  });

  



  useEffect(() => {
    refetch();
  }, [filters, currentPage,]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, status: "active" });
    setCurrentPage(1);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle sidebar toggle for responsiveness
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (event) => {
      setIsSidebarOpen(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    handleMediaChange(mediaQuery);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <>
      {/* Sidebar and Main Content */}
      <div className="flex flex-col gap-2 md:flex-row px-2 h-screen relative">
        {/* Mobile Sidebar Toggle */}
        <button
          className={`md:hidden fixed top-4 left-4 z-20 p-2 text-white rounded ${
            isSidebarOpen ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Filters" : "Open Filters"}
        </button>

        {/* Sidebar */}
        <div
          className={`absolute md:relative z-10 bg-muted w-full md:w-1/4 md:h-auto transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="flex-1 relative overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600 text-8xl">Loading...</p>
            </div>
          ) : !data?.success ? (
            <div className="flex items-center justify-center h-full">
              <p>{data?.message || "Something went wrong"}</p>
            </div>
          ) : (
            <>
              {/* Scrollable Service List */}
              <div className="overflow-y-auto h-[90%] pb-20">
                <ServiceList services={data?.ServiceResult || []} />
              </div>

              {/* Pagination Controls */}
              <div className="fixed bottom-4 right-4 flex items-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {data?.totalPages || 1}
                </span>
                <button
                  disabled={
                    currentPage === data?.totalPages || !data?.totalPages
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ServicesPage;
