import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetAllTemplatesQuery } from "../../redux/invitationTemplateForAdminSlice";
import { useAddOrUpdateWatchHistoryMutation } from "../../redux/TemplateSlice"; // Corrected import
import { paymentApi } from "../../redux/payment";
import { motionlogo } from "../../static/static";
import { FaCrown } from "react-icons/fa";

const TemplatesSection = ({ templates, onTemplateClick, selectedTemplate }) => {
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

  const { data, error, isLoading } = useGetAllTemplatesQuery(filters);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addOrUpdateWatchHistory] = useAddOrUpdateWatchHistoryMutation();

  const handleOnNavigate = async (template) => {
    addOrUpdateWatchHistory(template.id); // Update watch history

    if (template.categoryByAmount === "FREE") {
      onTemplateClick(template); // Call original onTemplateClick for free templates
      navigate("/update_editor", { state: { template } }); // Navigate to editor
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
          onTemplateClick(template); // Call original onTemplateClick
          navigate("/update_editor", { state: { template } }); // Navigate to editor
          return;
        }

        navigate("/payment", { state: { amount: template.price, template } }); // Navigate to payment
      } catch (error) {
        console.error("Error fetching payment data:", error);
        // Optionally, show user feedback (e.g., toast) instead of just logging
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center flex-col gap-2 items-center h-screen">
        <img src={motionlogo} alt="loader" className="w-12 h-12" />
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error fetching templates</p>;

  console.log(data);

  return (
    <div className="h-screen bg-white text-black overflow-y-auto">
      <div className="p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder=" Search Templates...."
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <button className="pb-2 text-sm font-semibold text-purple-600 border-b-2 border-purple-600">
            Templates
          </button>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
          {["Simple", "Party", "Wedding", "Birthday"].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600"
            >
              {tag}
            </button>
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Templates</h2>
            <a href="#" className="text-purple-600 text-xs">
              See all
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data?.data?.map((template) => (
              <div
                key={template.id}
                className={`group relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
                  selectedTemplate?.id === template.id
                    ? "ring-2 ring-purple-400"
                    : ""
                }`}
                onClick={() => handleOnNavigate(template)}
              >
                {template.categoryByAmount === "PAID" && (
                  <div className="absolute flex items-center justify-start w-[40px] h-[40px] bg-blue-500 text-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[120px] px-2 top-2 left-2 z-10">
                    <FaCrown className="text-white text-[24px] flex-shrink-0" />
                    <span className="ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Premium
                    </span>
                  </div>
                )}
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  crossOrigin="anonymous"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex flex-col justify-end">
                  <span className="text-xs font-medium text-white">
                    {template.name}
                  </span>
                </div>
              </div>
            )) || <p>No templates available!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesSection;