import React, { useState } from "react";
import VendorServiceList from "./component/VendorServiceList";
import ServiceModel from "./component/ServiceModel";
import { FiSearch } from "react-icons/fi";
import SearchBar from "../../components/SearchBar";
import { GoSearch } from "react-icons/go";
import { useGetServicesQuery } from "../../redux/serviceSlice";
import { PiPlus } from "react-icons/pi";
import { Outlet } from "react-router-dom";

const VendorServicesPage = () => {
  const [showFormPage, setShowFormPage] = useState(false); // Track form page visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Page size

  const filters = {
    search: searchTerm,
    page: currentPage,
    limit: pageSize,
  };


  

  // Fetch services using the filters object
  const { data, isLoading, error } = useGetServicesQuery(filters);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl  mx-auto p-2">
      {/* Top Bar Section */}
      <div
        className={`flex justify-between items-center my-6 ${
          showFormPage ? "hidden" : ""
        }`}
      >
        {/* Search Bar */}
        {!showFormPage && (
          <div className="lg:flex text-lg font-bold text-white">
            <div className="flex items-center space-x-4">
              <div className="transition-all duration-300 ease-in-out  w-20">
                <SearchBar
                  icon={<FiSearch size={18} />}
                  onChange={handleSearch}
                />
              </div>
              <button
                className="p-2 hidden rounded-full text-white hover:bg-[#2563EB] transition"
                aria-label="Toggle Search"
              >
                <GoSearch size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Add Service Button */}
        {!showFormPage && (
          <button
            onClick={() => setShowFormPage(true)}
            title="Click to add a new service"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <PiPlus size={20} className="md:mr-2" />
            <span className="hidden md:block">Add Service</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      {!showFormPage ? (
        <div className="relative flex flex-col justify-between h-[79vh] md:h-[70vh]">
          <div className="mb-4 border-b border-gray-300">
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200">
                All Services
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200">
                Active Services
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-200">
                Archived Services
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-scroll pr-2">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading services</div>
            ) : (
              <VendorServiceList services={data?.ServiceResult} />
            )}
          </div>

          {/* Pagination */}
          <div className="flex absolute right-8 bottom-0 justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-400 text-gray-700 rounded-md hover:bg-gray-500 disabled:bg-gray-300 transition duration-200"
            >
              Previous
            </button>

            <span className="px-2 py-1 text-gray-600 font-medium">
              {currentPage}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * pageSize >= data?.totalCount}
              className="px-3 py-1 bg-gray-400 text-gray-700 rounded-md hover:bg-gray-500 disabled:bg-gray-300 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          {/* Add Service Form */}
          <ServiceModel onClose={() => setShowFormPage(false)} />
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default VendorServicesPage;
