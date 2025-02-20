import React, { useState, useEffect } from "react";
import VendorServiceList from "./component/VendorServiceList";
import ServiceModel from "./component/ServiceModel";
import { FiSearch } from "react-icons/fi";
import SearchBar from "../../components/SearchBar";
import { GoSearch } from "react-icons/go";
import { useGetServicesQuery } from "../../redux/serviceSlice";
import { PiPlus } from "react-icons/pi";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userlogout } from "../../redux/authSlice";

const VendorServicesPage = () => {
  const [showFormPage, setShowFormPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all"); // Track selected filter
  const [filteredServices, setFilteredServices] = useState([]);

  const pageSize = 10;
  const vendorId = useSelector((state) => state?.auth?.user?.id);
  const navigate = useNavigate();

  const filters = {
    search: searchTerm,
    page: currentPage,
    limit: pageSize,
    vendorId,
  };

  // Fetch services
  const { data, isLoading, error, refetch } = useGetServicesQuery(filters);

  useEffect(() => {
    refetch(); // Fetch fresh data when filter changes
  }, [selectedFilter, refetch]);

  // Filter services based on selected category
  useEffect(() => {
    if (data?.ServiceResult) {
      let filteredData = data.ServiceResult;
      if (selectedFilter === "active") {
        filteredData = data.ServiceResult.filter(
          (service) => service.status === "active"
        );
      } else if (selectedFilter === "archived") {
        filteredData = data.ServiceResult.filter(
          (service) => service.status === "archived"
        );
      }
      setFilteredServices(filteredData);
    }
  }, [data, selectedFilter]);

  // // Handle search input
  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1);
  // };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  if (error && typeof error === "string" && error.includes("expire")) {
    userlogout();
    navigate("/vendorLogin");
  }

  return (
    <div className="max-w-7xl mx-auto p-6 m-2 rounded-md bg-gradient-to-br from-white via-pink-50 to-pink-100">
      {/* Top Bar Section */}
      <div
        className={`flex justify-end items-center my-6 ${
          showFormPage ? "hidden" : ""
        }`}
      >
        {/* Search Bar
        {!showFormPage && (
          <div className="lg:flex text-lg">
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
        )} */}

        {/* Add Service Button */}
        {!showFormPage && (
          <button
            onClick={() => setShowFormPage(true)}
            title="Click to add a new service"
            className="flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-pink-700 transition duration-300"
          >
            <PiPlus size={20} className="md:mr-2" />
            <span className="hidden md:block">Add Service</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      {!showFormPage ? (
        <div className="relative flex flex-col justify-between h-[79vh] md:h-[70vh]">
          {/* Filter Buttons */}
          <div className="mb-4 border-b border-gray-300">
            <div className="flex space-x-4">
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-4 py-2 transition duration-200 ${
                  selectedFilter === "all"
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                All Services
              </button>
              <button
                onClick={() => handleFilterChange("active")}
                className={`px-4 py-2 transition duration-200 ${
                  selectedFilter === "active"
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Active Services
              </button>
              <button
                onClick={() => handleFilterChange("archived")}
                className={`px-4 py-2 transition duration-200 ${
                  selectedFilter === "archived"
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Archived Services
              </button>
            </div>
          </div>

          {/* Services List */}
          <div className="flex-1 overflow-y-scroll pr-2">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>No service created </div>
            ) : (
              <VendorServiceList services={filteredServices} />
            )}
          </div>

          {/* Pagination */}
          <div className="flex absolute right-8 bottom-0 justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-primary text-background rounded-md hover:bg-pink-700 disabled:bg-gray-300 transition duration-200"
            >
              Previous
            </button>

            <span className="px-2 py-1 text-gray-600 font-medium">
              {currentPage}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={filteredServices.length < pageSize}
              className="px-3 py-1 bg-primary text-background rounded-md hover:bg-pink-700 disabled:bg-gray-300 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ServiceModel onClose={() => setShowFormPage(false)} />
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default VendorServicesPage;
