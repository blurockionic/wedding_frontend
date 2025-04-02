import { useState, useEffect } from "react";
import VendorServiceList from "./component/VendorServiceList";
import ServiceModel from "./component/ServiceModel";
import { useGetServicesQuery } from "../../redux/serviceSlice";
import { PiPlus } from "react-icons/pi";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userlogout } from "../../redux/authSlice";

const filters2 = [
  { key: "all", label: "All " },
  { key: "active", label: "Active " },
  { key: "archived", label: "Archived " },
];

const VendorServicesPage = () => {
  const [showFormPage, setShowFormPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all");
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
  const { data, isLoading, error, refetch } = useGetServicesQuery(filters);

  useEffect(() => {
    refetch();
  }, [selectedFilter, refetch]);

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

  const handlePageChange = (page) => setCurrentPage(page);
  const handleFilterChange = (filter) => setSelectedFilter(filter);

  if (error && typeof error === "string" && error.includes("expire")) {
    userlogout();
    navigate("/vendorLogin");
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
      {!showFormPage ? (
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-center border-gray-300">
            <div className="md:hidden text-2xl text-center font-semibold text-primary">
              Services
            </div>
            <div className="hidden md:flex px-5 space-x-4">
              {filters2.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleFilterChange(key)}
                  className={`px-4 transition duration-200 ${
                    selectedFilter === key
                      ? "text-primary border-b-2 border-b-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex justify-end items-center my-6">
              <button
                onClick={() => setShowFormPage(true)}
                title="Click to add a new service"
                className="flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-pink-700 transition duration-300"
              >
                <PiPlus size={20} className="md:mr-2" />
                <span className="hidden md:block">Add Service</span>
              </button>
            </div>
          </div>
          <div className="flex md:hidden my-5 justify-between gap-5 sm:justify-start">
            {filters2.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`transition duration-200 ${
                  selectedFilter === key
                    ? "text-primary border-b-2 border-b-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex-grow overflow-y-auto">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>No service created</div>
            ) : (
              <VendorServiceList services={filteredServices} />
            )}
          </div>
        </div>
      ) : (
        <ServiceModel onClose={() => setShowFormPage(false)} />
      )}
      <Outlet />

      {!showFormPage && (
        <div className="sticky bottom-0 left-0 right-0 flex justify-end py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full bg-primary text-white hover:bg-pink-700 disabled:bg-gray-300 transition duration-200"
          >
            &lt;
          </button>
          <span className="px-4 py-2 mx-2 bg-primary rounded-full text-white font-medium">
            {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={filteredServices.length < pageSize}
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-pink-700 disabled:bg-gray-300 transition duration-200"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorServicesPage;
