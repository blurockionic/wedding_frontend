import  { useState, useEffect, useMemo } from "react";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import {  useLocation } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import ServiceList from "../../../components/ServiceList";
import ServiceListForEvent from "./ServiceListForEvent";
import { Filter, X } from "lucide-react";

function AddVendors({eventId}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchType = queryParams.get("search");
  const searchLocation = queryParams.get("location");

  const [filters, setFilters] = useState({
    location: searchLocation,
    service_type: searchType,
    status: "active",
  });

  console.log(eventId)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Update filters if URL params change
  useEffect(() => {
    setFilters({
      location: searchLocation,
      service_type: searchType,
    });
    setCurrentPage(1);
  }, [searchLocation, searchType]);

  const memoizedFilters = useMemo(
    () => ({
      ...filters,
      page: currentPage,
      limit: itemsPerPage,
      status: "active",
    }),
    [filters, currentPage]
  );

  const { data, error, isLoading } = useGetServicesQuery(memoizedFilters);

  const handleFilterChange = (data) => {
    setFilters(data);
    setCurrentPage(1);
    if (!window.matchMedia("(min-width: 768px)").matches) {
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
      {/* sidebar and main content  */}
      <div className="flex flex-col gap-2 md:flex-row px-2 h-screen relative">
        {/* Mobile Sidebar Toggle */}
        <button
          className={`md:hidden fixed top-4 left-4 z-20 p-2 text-white rounded-full ${
            isSidebarOpen ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24}/> : <Filter size={24}/>}
        </button>

        {/* Sidebar */}
        <div
          className={`absolute md:relative z-10 bg-muted w-full md:w-1/4 md:h-auto transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full hidden"
          }`}
        >
          <Sidebar
            searchType={searchType}
            searchLocation={searchLocation}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 relative overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600 text-8xl">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p>{error?.data?.message || "Something went wrong"}</p>
            </div>
          ) : (
            <>
              {/* Scrollable Service List */}
              <div className="overflow-y-auto h-[90%] pb-20 mt-10">
                {/* <ServiceList services={data?.ServiceResult || []} /> */}
                <ServiceListForEvent services={data?.ServiceResult || []} eventId={eventId} />
              </div>

              {/* Pagination Controls */}
              <div className="px-2 py-2 fixed bottom-0 right-8  flex items-center justify-end space-x-2 z-50 bg-gray-100 rounded-lg ">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
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
                  className={`px-4 py-2 bg-primary text-white rounded disabled:opacity-50`}
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

export default AddVendors;
