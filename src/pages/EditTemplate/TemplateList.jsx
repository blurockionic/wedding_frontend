import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "../InvitationPayment/Payment";

const TemplateList = ({ data }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    categoryByMood: "",
    categoryByAmount: "",
    categoryByRequirement: "",
    page: 1,
    limit: 10,
  });

  // const { data, error, isLoading } = useGetAllTemplatesQuery(filters);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching templates</p>;

  const handleOnNavigate = (template) => {
    if (template.categoryByAmount === "FREE") {
      navigate("/update_editor", { state: { template } });
      return;
    }
  
    if (template.categoryByAmount === "PAID") {
      navigate("/payment", { state: { amount: template.price, template } });
      return;
    }
  };

  return (
    <div className="p-4 ">
      <h2 className="text-xl font-bold mb-4">Templates</h2>

      {/* Filters */}
      {/* <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <select
          className="border p-2"
          value={filters.categoryByMood}
          onChange={(e) =>
            setFilters({ ...filters, categoryByMood: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="WEDDING">Wedding</option>
          <option value="BIRTHDAY">Birthday</option>
          <option value="BUSINESS">Business</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => setFilters({ ...filters, page: 1 })} // Reset to page 1 when applying filters
        >
          Search
        </button>
      </div> */}

      {/* Templates */}
      <div className="grid grid-cols-3 gap-4">
        {data?.data?.map((template) => (
          <div
            key={template.id}
            className="border p-4 shadow-md"
            onClick={() => handleOnNavigate(template)}
          >
            <img
              src={template.thumbnailUrl}
              alt={template.name}
              className="w-full h-40 object-cover"
            />
            <h3 className="font-semibold mt-2">{template.name}</h3>
            <p className="text-gray-600">₹{template.price || "Free"}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button
          disabled={filters.page <= 1}
          className="bg-gray-500 text-white px-4 py-2 disabled:opacity-50"
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
        >
          Previous
        </button>
        <span>Page {filters.page}</span>
        <button
          disabled={data?.totalPages && filters.page >= data.totalPages}
          className="bg-gray-500 text-white px-4 py-2 disabled:opacity-50"
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TemplateList;
