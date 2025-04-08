import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  paymentApi,
  useGetTemplatePaymentHistoryQuery,
} from "../../redux/payment";
import { useDispatch } from "react-redux";
import {
  useAddOrUpdateWatchHistoryMutation,
  useGetTemplateWatchHistoryQuery,
} from "../../redux/TemplateSlice";

const TemplateCard = React.memo(({ template, onClick }) => (
  <div
    className="border p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    onClick={() => onClick(template)}
  >
    <img
      src={template.thumbnailUrl}
      alt={template.name}
      loading="lazy"
      className="w-full h-40 object-cover"
    />
    <h3 className="font-semibold mt-2">{template.name}</h3>
    <p className="text-gray-600">₹{template.price || "Free"}</p>
  </div>
));

const TemplateList = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const { data: watchHistory, refetch: refetchWatchHistory } =
    useGetTemplateWatchHistoryQuery();
  const [addOrUpdateWatchHistory] = useAddOrUpdateWatchHistoryMutation();

  useEffect(() => {
    refetchWatchHistory();
  }, []);

  console.log(watchHistory);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleOnNavigate = async (template) => {
    addOrUpdateWatchHistory(template.id);

    if (template.categoryByAmount === "FREE") {
      navigate("/update_editor", { state: { template } });
      return;
    }

    if (template.categoryByAmount === "PAID") {
      try {
        const paymentData = await dispatch(
          paymentApi.endpoints.getTemplatePaymentHistory.initiate(
            {
              tempId: template.id,
            },
            { forceRefetch: true }
          )
        ).unwrap();

        if (paymentData?.paymentStatus === "paid") {
          navigate("/update_editor", { state: { template } });
          return;
        }

        navigate("/payment", {
          state: { amount: template.price, template },
        });
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Templates</h2>

      {/* Filters (optional) */}
      {/* 
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
        />
        <select
          className="border p-2"
          value={filters.categoryByMood}
          onChange={(e) =>
            handleFilterChange("categoryByMood", e.target.value)
          }
        >
          <option value="">All Categories</option>
          <option value="WEDDING">Wedding</option>
          <option value="BIRTHDAY">Birthday</option>
          <option value="BUSINESS">Business</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => setFilters({ ...filters, page: 1 })}
        >
          Search
        </button>
      </div>
      */}

      {/* Templates */}
      {data?.data?.length ? (
        <div className="grid grid-cols-3 gap-4">
          {data.data.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={handleOnNavigate}
            />
          ))}
        </div>
      ) : (
        <p>No templates available.</p>
      )}

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
          disabled={data?.totalPages ? filters.page >= data.totalPages : true}
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
