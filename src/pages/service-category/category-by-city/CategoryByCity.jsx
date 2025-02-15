import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import ServiceList from "../../../components/ServiceList";

const CategoryByCity = () => {
  const { category, subcategory, state, city } = useParams();
  const navigate = useNavigate();

  // console.log(subcategory)

  // State for Filters
  const [filters, setFilters] = useState({
    state:  state ,
    service_type: subcategory ,
    status: "active",
    city: city
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Update Filters when URL Params Change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      state: state,
      service_type: subcategory,
      city:city
    }));
    setCurrentPage(1);
  }, [category, subcategory, state, city]);

  // Memoized Filters for API Call
  const memoizedFilters = useMemo(() => {
    return {
      ...filters,
      page: currentPage,
      limit: itemsPerPage,
    };
  }, [filters, currentPage]);


  // Fetch Data
  const { data, error, isLoading } = useGetServicesQuery(memoizedFilters);

  // console.log(data)

  // Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value, // Update filters in real-time
    }));
  };

  // Handle Card Click
  const handleOnCard = (item) => {
    console.log("Card Clicked", item);
    navigate(`/all/${category}/${subcategory}/${state}/${city}/${item}`);
  };

  return (
    <div className="flex  px-16 py-4 gap-6">
      {/* Sidebar with Filters (Right Side) */}
     
      <aside className="w-1/4 h-screen sticky top-0 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Filters</h2>

        {/* Price Range */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Price Range</label>
          <input type="range" className="w-full mt-1" />
        </div>

        {/* Rating Filter */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Rating</label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>

        {/* Categories */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Categories</label>
          <select className="w-full mt-1 border rounded p-2">
            <option>{category}</option>
          </select>
        </div>
      </aside>

      {/* Service Listings (Left Side) */}
      <div className="w-3/4">
        <span className="text-sm">
          <Link to={`/all`}>Wedding</Link> &gt;
          <Link to={`/all/${category}`}>{category}</Link> &gt;
          <Link to={`/all/${category}/${subcategory}`}>{subcategory}</Link> &gt;
          <Link to={`/all/${category}/${subcategory}/${state}`}>{state}</Link> &gt;
          <Link to={`/all/${category}/${subcategory}/${state}/${city}`}>{city}</Link>
        </span>

        <h1 className="text-2xl font-bold">
          {subcategory} in {city}, {state}
        </h1>
        <p className="mt-2">
          Here you will find all listings for {subcategory} in {city}.
        </p>

        {/* Service Listings Grid */}
        <div className="my-10">
          <ServiceList services={data?.ServiceResult || []} />
        </div>
      </div>
    </div>
  );
};

export default CategoryByCity;
