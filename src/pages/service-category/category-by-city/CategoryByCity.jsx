import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import ServiceList from "../../../components/ServiceList";
import Sidebar from "../../../components/Sidebar";
import { FilterIcon, X } from "lucide-react";

const CategoryByCity = () => {
  const { category, subcategory, state, city } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  // Memoized Filters for API Call
  const memoizedFilters = useMemo(
    () => ({
      ...filters,
      page: currentPage,
      limit: itemsPerPage,
    }),
    [filters, currentPage]
  );

 
  

  // Fetch Data
  const { data, error, isLoading } = useGetServicesQuery(memoizedFilters);
  // console.log(data)

  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-16 py-4 gap-6 relative">
      {/* Button to show filters on mobile */}
      <div
        className="lg:hidden text-primary  px-4 py-2 rounded-md mb-4 flex gap-2 cursor-pointer border-b"
        onClick={() => setIsFilterOpen(true)}
      >
        <FilterIcon className="" />
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
          ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        {/* Close button for mobile view */}
        <div
          className="lg:hidden  text-white px-3 py-1 rounded-md mb-4 flex justify-end"
          onClick={() => setIsFilterOpen(false)}
        >
          <X className="bg-red-500 rounded-full" />
        </div>

        <h2 className="text-lg font-semibold">Filters</h2>
        <Sidebar isLoading={isLoading} filters={filters} onFilterChange={handleFilterChange} />
      </aside>

      {/* Service Listings */}
      <div className="w-full lg:w-3/4">
        <span className="text-xs md:text-sm">
          <Link to={`/all`}>Wedding</Link> &gt;
          <Link> {category}</Link> &gt;
          <Link to={`/all/${category}/${subcategory}`}>
            {" "}
            {subcategory}
          </Link>{" "}
          &gt;
          <Link
            to={`/all/${category}/${subcategory}/${state}`}
            className="capitalize"
          >
            {" "}
            {state}
          </Link>{" "}
          &gt;
          <Link
            to={`/all/${category}/${subcategory}/${state}/${city}`}
            className="capitalize"
          >
            {" "}
            {city}
          </Link>
        </span>

        <h1 className="text-2xl font-bold mt-2">
          <span className="capitalize">{subcategory}</span> in{" "}
          <span className="capitalize">{city}</span>,{" "}
          <span className="capitalize">{state}</span>
        </h1>
        <p className="mt-2">
          Here you will find all listings for {subcategory} in {city}.
        </p>

        {/* Service Listings Grid */}
        <div className="my-10">
          <ServiceList
            services={data?.ServiceResult || []}
            category={category}
            state={state}
            subCategory={subcategory}
            city={city}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryByCity;
