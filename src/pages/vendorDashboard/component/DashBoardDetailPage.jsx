import { useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "../../../redux/serviceSlice";
import Slider from "../../../components/Slider";
import Mediatab from "./Tabs/Mediatab";
import FAQsTab from "./Tabs/FAQsTab";
import ServiceCreate from "./Tabs/ServiceCreate";
import { useState } from "react";

// Reusable Button Component
const Button = ({ label, onClick, className, type = "button" }) => (
  <button
    type={type}
    className={`px-4 py-2 rounded-lg ${className}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const DashBoardDetailPage = () => {
  const { serviceId } = useParams();
  const { data, isLoading, isError, error ,refetch} = useGetServiceByIdQuery(serviceId);
  const [activeTab, setActiveTab] = useState(null);

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {error?.data?.message || "An error occurred while fetching the service."}
      </div>
    );
  }

  const service = data?.service;

  const handleClose = () => {
    setActiveTab(null);
    refetch();
  
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-400 capitalize dark:text-white mb-4">
            {service?.service_name || "Service Name"}
          </h1>
          <p className="text-lg text-gray-400 capitalize dark:text-white mb-4">
            {service?.description}
          </p>
          <p className="text-gray-400 capitalize dark:text-white mb-2">
            <span className="font-semibold">Service Type:</span>{" "}
            {service?.service_type}
          </p>
          <p className="text-gray-400 capitalize dark:text-white">
            <span className="font-semibold">Price Range:</span> ₹
            {service?.min_price} 
          </p>
        </div>
      </div>

      {/* Media Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-400 capitalize dark:text-white mb-4">
          Media
        </h2>
        {service?.media?.[0] && (
          ["image_urls", "video_urls"].map(
            (mediaType) =>
              service?.media?.[0]?.[mediaType]?.length > 0 && (
                <Slider
                  key={mediaType}
                  data={service?.media?.[0]?.[mediaType]}
                  serviceId={service.id}
                  type={mediaType === "image_urls" ? "image" : "video"}
                />
              )
          )
        )}
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          FAQs
        </h2>
        {service?.faqs?.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Q{index + 1}: {faq.question}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {activeTab === "media" && (
          <Mediatab
            handleCloseMedia={handleClose}
            serviceId={serviceId}
          />
        )}
        {activeTab === "faq" && (
          <FAQsTab handleCloseFAQ={handleClose} serviceId={serviceId} />
        )}
        {activeTab === "edit" && <ServiceCreate onClose={handleClose} serviceData={data.service} />}
      </div>

      {/* Buttons Section */}
      <div className="mt-8 flex gap-4 justify-end">
        <Button
          label="Add Media"
          className={`bg-green-500 dark:bg-green-600 text-white ${
            activeTab === "media" ? "ring-2 ring-green-300" : ""
          }`}
          onClick={() => setActiveTab(activeTab === "media" ? null : "media")}
        />
        <Button
          label="Add FAQ"
          className={`bg-blue-500 dark:bg-blue-600 text-white ${
            activeTab === "faq" ? "ring-2 ring-blue-300" : ""
          }`}
          onClick={() => setActiveTab(activeTab === "faq" ? null : "faq")}
        />
        <Button
          label="Edit Service"
          className={`bg-yellow-500 dark:bg-yellow-600 text-white ${
            activeTab === "edit" ? "ring-2 ring-yellow-300" : ""
          }`}
          onClick={() => setActiveTab(activeTab === "edit" ? null : "edit")}
        />
        <Button
          label="Delete Service"
          className="bg-red-500 dark:bg-red-600 text-white"
        />
      </div>

      {/* Conditional Form Rendering */}
     
    </div>
  );
};

export default DashBoardDetailPage;
