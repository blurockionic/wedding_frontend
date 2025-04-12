import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentApi } from "../../redux/payment";
import { useDispatch } from "react-redux";
import { useAddOrUpdateWatchHistoryMutation, useGetTemplateWatchHistoryQuery } from "../../redux/TemplateSlice";
import { FaCrown } from "react-icons/fa";

const TemplateCard = React.memo(({ template, onClick }) => (
  <div
    className="border p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow relative group"
    onClick={() => onClick(template)}
  >
    {template.categoryByAmount === "PAID" && (
      <div className="absolute flex items-center justify-start w-[40px] h-[40px] bg-blue-500 text-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[120px] px-2 -top-2 left-2 z-10">
        <FaCrown className="text-white text-[24px] flex-shrink-0" />
        <span className="ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Premium
        </span>
      </div>
    )}
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

  const { data: watchHistory, refetch: refetchWatchHistory } = useGetTemplateWatchHistoryQuery();
  const [addOrUpdateWatchHistory] = useAddOrUpdateWatchHistoryMutation();

  useEffect(() => {
    refetchWatchHistory();
  }, []);

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
            { tempId: template.id },
            { forceRefetch: true }
          )
        ).unwrap();

        if (paymentData?.paymentStatus === "paid") {
          navigate("/update_editor", { state: { template } });
          return;
        }

        navigate("/payment", { state: { amount: template.price, template } });
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Templates</h2>
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