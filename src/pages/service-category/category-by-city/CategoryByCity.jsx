import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import ServiceList from "../../../components/ServiceList";
import Sidebar from "../../../components/Sidebar";
import { FilterIcon, Loader, X } from "lucide-react";

const CategoryByCity = () => {
  const { category, subcategory, state, city } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [services, setServices] = useState([]);

  // State for Filters
  const [filters, setFilters] = useState({
    city: city || "",
    state: state || "",
    status: "active",
    minPrice: "",
    maxPrice: "",
    rating: "",
    sort_by: "",
    sort_order: "",
    service_type: subcategory || "",
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev
    }));
  }, [city, subcategory, state]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle Filter Changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  const memoizedFilters = useMemo(
    () => ({
      ...filters,
      page: currentPage,
      limit: itemsPerPage,
    }),
    [filters, currentPage]
  );

  const { data: fetchedData, isLoading, refetch } = useGetServicesQuery(memoizedFilters);

  useEffect(() => {
    if (fetchedData?.ServiceResult) {
      setServices([...fetchedData.ServiceResult]); // Ensure a new reference
    }
  }, [fetchedData]);

  useEffect(() => {
    refetch().then((updateData) => {
      const { message } = updateData.error?.data || {};
      if (message) {
        setServices([]);
      }
    });
  }, [filters, refetch]);

  return (
    <>
      <div className="flex flex-col lg:flex-row px-4 lg:px-16 py-4 gap-6 relative">
        {/* Button to show filters on mobile */}
        <div
          className="lg:hidden text-primary px-4 py-2 rounded-md mb-4 flex gap-2 cursor-pointer border-b"
          onClick={() => setIsFilterOpen(true)}
        >
          <FilterIcon />
          <span>Filter</span>
        </div>

        {/* Blur Background Overlay (only when sidebar is open) */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setIsFilterOpen(false)} // Click outside to close
          ></div>
        )}

        {/* Sidebar with Filters */}
        <aside
          className={`fixed lg:static top-0 left-0 w-3/4 sm:w-1/2 lg:w-1/4 h-screen bg-white shadow-md p-4 rounded-lg z-50 transition-transform duration-300 ease-in-out 
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          {/* Close button for mobile view */}
          <div className="lg:hidden text-white px-3 py-1 rounded-md mb-4 flex justify-end">
            <X className="bg-red-500 rounded-full cursor-pointer" onClick={() => setIsFilterOpen(false)} />
          </div>

          <h2 className="text-lg font-semibold">Filters</h2>
          <Sidebar isLoading={isLoading} filters={filters} onFilterChange={handleFilterChange} city={city} service_type={subcategory}/>
        </aside>

        {/* Service Listings */}
        <div className="w-full lg:w-3/4">
         
          {/* Breadcrumb Navigation */}
      <nav className=" py-3  ">
        <div className="container mx-auto flex items-center text-sm text-gray-600">
          <Link to="/all" className="hover:text-primary transition">Wedding</Link>
          <span className="mx-2">/</span>
          <Link  className="hover:text-primary transition">{category}</Link>
          <span className="mx-2">/</span>
          <Link to={`/all/${category}/${subcategory}`} className="capitalize">
            {subcategory}
          </Link>
          <span className="mx-2">/</span>
          <Link
          to={`/all/${category}/${subcategory}/${state}`}
          className="capitalize"
        >
          {state}
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/all/${category}/${subcategory}/${state}/${city}`}className="font-semibold text-primary capitalize">
              {city}
            </Link>
        </div>
      </nav>

          <h1 className="text-2xl font-bold mt-2">
            <span className="capitalize">{subcategory}</span> in <span className="capitalize">{city}</span>,{" "}
            <span className="capitalize">{state}</span>
          </h1>
          <p className="mt-2">Here you will find all listings for {subcategory} in {city}.</p>

          {/* Loader */}
          {isLoading ? (
            <div className="flex justify-center items-center my-10 py-10">
              <Loader size={24} className="animate-spin"/>
            </div>
          ) : (
            <div className="my-10 overflow-y-scroll">
              <ServiceList services={services} category={category} state={state} subCategory={subcategory} city={city} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryByCity;
