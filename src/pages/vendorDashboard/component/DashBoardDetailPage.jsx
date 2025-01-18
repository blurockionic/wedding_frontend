import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteFAQMutation,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
  useUpdateFAQMutation,
} from "../../../redux/serviceSlice";
import Slider from "../../../components/Slider";
import Mediatab from "./Tabs/Mediatab";
import FAQsTab from "./Tabs/FAQsTab";
import ServiceCreate from "./Tabs/ServiceCreate";
import { useState } from "react";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";

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
  const [updateFAQ ] = useUpdateFAQMutation()
  const [deleteFAQ] = useDeleteFAQMutation()
  const [isEditFAQ, setIsEditFAQ] = useState(false);
  const [indexNumber, setIndexNumber] = useState(null)
  const { serviceId } = useParams();
  const { data, isLoading, isError, error, refetch } =
    useGetServiceByIdQuery(serviceId);
  const [activeTab, setActiveTab] = useState(null);
  const [deleteService] = useDeleteServiceMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {error?.data?.message ||
          "An error occurred while fetching the service."}
      </div>
    );
  }

  const service = data?.service;

  const handleClose = () => {
    setActiveTab(null);
    refetch();
  };

  const handleDelete = async () => {
    try {
      const res = await deleteService(serviceId).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete the service.");
    } finally {
      navigate("/VendorDashboard");
    }
  };

  const handleOnUpdateFAQ = (index) => {
    setIsEditFAQ(true);
    setIndexNumber(index);
    setValue("question", service?.faqs[index].question); 
    setValue("answer", service?.faqs[index].answer);
  };

  const handleSaveFAQ = async(data) => {
    try {
      const res =  await updateFAQ({
        id: service.id,
        faqId: service.faqs[indexNumber].id,
        data: data
      })
      console.log(res)
      const {success, message} = res.data 
     if(success){
      setIsEditFAQ(false);
      setIndexNumber(null);
      reset(); 
      //success message
      toast.success(message)
      // reload the data 
      refetch()
     }
    } catch (error) {
      console.log(error)
    }
  };

  //handle on delete the FAQ
  const handleOnDeleteFAQ =async(index)=>{
    try {
      const res =  await deleteFAQ({
        id: service.id,
        faqId: service.faqs[index].id
      })
      const {success, message} = res.data
      if(success){
        toast.success(message)
      // reload the data 
        refetch()
      }
    } catch (error) {
      console.error(error)
    }
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
        {service?.media?.[0] &&
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
          )}
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          FAQs
        </h2>
        <div>
        <div>
      {service?.faqs?.map((faq, index) => (
        <div
          key={index}
          className="flex justify-between items-center border bg-gray-50 dark:bg-gray-800 px-5 py-3 rounded-md mb-3"
        >
          <div className="rounded-lg w-full">
            {isEditFAQ && index === indexNumber ? (
              <form
                onSubmit={handleSubmit(handleSaveFAQ)}
                className="space-y-2"
              >
                <input
                  type="text"
                  {...register("question", { required: "Question is required" })}
                  placeholder="Edit Question"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <textarea
                  {...register("answer", { required: "Answer is required" })}
                  placeholder="Edit Answer"
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditFAQ(false);
                      setIndexNumber(null);
                      reset();
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="capitalize text-lg font-semibold text-gray-800 dark:text-white">
                  Q{index + 1}: {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </>
            )}
          </div>
          <div className="flex gap-5">
            <>
              <CiEdit
              onClick={() => handleOnUpdateFAQ(index)}
              size={24}
              className="cursor-pointer text-green-500"
            />
            <MdDeleteOutline
              onClick={() => handleOnDeleteFAQ(index)}
              size={24}
              className="cursor-pointer text-red-500"
            />
              </>
            
            
          </div>
        </div>
      ))}
    </div>
    </div>
      </div>
      <div className="mt-8">
        {activeTab === "media" && (
          <Mediatab handleCloseMedia={handleClose} serviceId={serviceId} />
        )}
        {activeTab === "faq" && (
          <FAQsTab handleCloseFAQ={handleClose} serviceId={serviceId} />
        )}
        {activeTab === "edit" && (
          <ServiceCreate onClose={handleClose} serviceData={data.service} />
        )}
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
          onClick={handleDelete}
          className="bg-red-500 dark:bg-red-600 text-white"
        />
      </div>

      {/* Conditional Form Rendering */}
    </div>
  );
};

export default DashBoardDetailPage;
