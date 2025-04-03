import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteFAQMutation,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
  useSwitchServiceMutation,
  useUpdateFAQMutation,
} from "../../../redux/serviceSlice";

import Slider from "../../../components/Slider";
import Mediatab from "./Tabs/Mediatab";
import FAQsTab from "./Tabs/FAQsTab";
import ServiceCreate from "./Tabs/ServiceCreate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import CustomButton from "../../../components/global/button/CustomButton";
import { FaEdit, FaPlus } from "react-icons/fa";
import { userlogout } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useVendorLogoutMutation } from "../../../redux/vendorSlice";
import { ToggleSwitch } from "flowbite-react";
import CustomMArkdown from "../../../components/EditTemplatePreview/CustomMArkdown";

const DashBoardDetailPage = () => {
  const [vendorLogout] = useVendorLogoutMutation();

  const [updateFAQ] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();
  const [isEditFAQ, setIsEditFAQ] = useState(false);
  const [indexNumber, setIndexNumber] = useState(null);
  const { serviceId } = useParams();
  const { data, isLoading, isError, error, refetch } =
    useGetServiceByIdQuery(serviceId);
  const [activeTab, setActiveTab] = useState(null);
  const [deleteService] = useDeleteServiceMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const dispatch = useDispatch();

  const [
    switchService,
    { data: switchData, isLoading: isSwitching, isError: isSwitchingError },
  ] = useSwitchServiceMutation();

  const switch1 = data?.service?.status === "active" ? true : false;

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }
  const handleErrors = async (error, dispatch) => {
    if (error?.data?.message.includes("Access token is missing or invalid")) {
      const res = await vendorLogout();
      toast.success(res?.message);
      dispatch(userlogout());
    }
  };

  if (isError) {
    handleErrors(error, dispatch);

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

  const handleSaveFAQ = async (data) => {
    try {
      const res = await updateFAQ({
        id: service.id,
        faqId: service.faqs[indexNumber].id,
        data: data,
      });
      console.log(res);
      const { success, message } = res.data;
      if (success) {
        setIsEditFAQ(false);
        setIndexNumber(null);
        reset();
        //success message
        toast.success(message);
        // reload the data
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle on delete the FAQ
  const handleOnDeleteFAQ = async (index) => {
    try {
      const res = await deleteFAQ({
        id: service.id,
        faqId: service.faqs[index].id,
      });
      const { success, message } = res.data;
      if (success) {
        toast.success(message);
        // reload the data
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwitch = async () => {
    try {
      const response = await switchService(serviceId).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch(); // Reload data after switching service status
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to switch service.");
    }
  };

  return (
    <div
      className={`max-w-screen-xl mx-auto ${
        activeTab ? "overflow-y-hidden h-screen" : ""
      }`}
    >
      {/* Buttons Section */}
      <div className="mt-1 flex gap-2 justify-end items-center  flex-wrap  w-full">
       
        <ToggleSwitch
          className=" border border-cyan-400 rounded-md px-2 py-1  text-sm  text-cyan-400 md:px-4 md:py-2"
          checked={switch1}
          label={switch1 ? "Active" : "Archived"}
          onChange={handleSwitch}
        />
       

        <CustomButton
          leftIcon={<FaPlus />}
          text="Media"
          className={`border border-green-500  text-sm hover:bg-green-100 text-green-500 px-2 py-1  md:px-4 md:py-2${
            activeTab === "media" ? "ring-2 ring-green-300" : ""
          }`}
          onClick={() => setActiveTab(activeTab === "media" ? null : "media")}
        />
        <CustomButton
          text="Add FAQ"
          leftIcon={<FaPlus />}
          className={`border border-blue-500  text-sm hover:bg-blue-100 text-blue-500 px-2 py-1  md:px-4 md:py-2${
            activeTab === "faq" ? "ring-2 ring-blue-300" : ""
          }`}
          onClick={() => setActiveTab(activeTab === "faq" ? null : "faq")}
        />
        <CustomButton
          text="Edit"
          leftIcon={<FaEdit />}
          className={`border border-yellow-500  text-sm hover:bg-yellow-100 text-yellow-500 px-2 py-1  md:px-4 md:py-2${
            activeTab === "edit" ? "ring-2 ring-yellow-300" : ""
          }`}
          onClick={() => setActiveTab(activeTab === "edit" ? null : "edit")}
        />
        <CustomButton
          text="Delete"
          leftIcon={<MdDeleteOutline size={20} />}
          onClick={handleDelete}
          className="border border-red-500  text-sm hover:bg-red-100 text-red-500 px-2 py-1  md:px-4 md:py-2"
        />

        {/* make atoogle swith to toggle active and archived */}
      </div>

      <div className={`grid grid-cols-1 gap-8 mb-7 mt-5 md:px-4 `}>
        <div>
          <span className="text-sm">Service Title</span>
          <h1 className="text-4xl font-bold text-foreground capitalize dark:text-white mb-4">
            {service?.service_name || "Service Name"}
          </h1>
          <div className=" gap-4 flex justify-items-stretch items-center md:gap-30">
            <p className=" capitalize dark:text-white  text-sm flex flex-col gap-1">
              <span className="">Service category:</span>
              <span className="border text-xs md:text-sm border-primary px-3 py-2 text-primary rounded-md">
                {service?.service_type}
              </span>
            </p>
            <p className=" capitalize text-sm  dark:text-white flex flex-col">
              <span className="">Price:</span>

              <span className="border text-xs md:text-sm border-gray-300 px-3 py-2 text-primary rounded-md">
                ₹{service?.min_price}/{service?.service_unit}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Media Section */}
      <div className="md:px-4">
        <h2 className="text-lg  text-foreground capitalize dark:text-white mb-4">
          Media
        </h2>
        {service?.media?.[0] ? (
          ["image_urls", "video_urls"].map(
            (mediaType) =>
              service?.media?.[0]?.[mediaType]?.length > 0 && (
                <Slider
                  key={mediaType}
                  data={service?.media?.[0]?.[mediaType]}
                  serviceId={service.id}
                  type={mediaType === "image_urls" ? "image" : "video"}
                  refetch={refetch}
                />
              )
          )
        ) : (
          <>
            <p className="w-full flex justify-center items-center bg-gray-50 p-4 rounded-lg">
              No media uploaded!
            </p>
          </>
        )}
      </div>

      <div className="w-full mt-5 md:px-4">
        <h2 className="text-lg text-foreground capitalize text-[#1E1E1E] dark:text-white mb-4">
          Description
        </h2>
        <CustomMArkdown content={service?.description} />
      </div>

      {/* FAQ Section */}
      <div className="mt-8 md:px-4">
        <h2 className="text-lg  text-gray-800 dark:text-white mb-4">
          FAQs
        </h2>

        <div>
          {service?.faqs?.length > 0 ? (
            <>
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
                          {...register("question", {
                            required: "Question is required",
                          })}
                          placeholder="Edit Question"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <textarea
                          {...register("answer", {
                            required: "Answer is required",
                          })}
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
                        <p className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </p>
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
            </>
          ) : (
            <>
              <p className="w-full flex justify-center items-center bg-gray-50 p-4 rounded-lg">
                No FAQs updated!
              </p>
            </>
          )}
        </div>
      </div>
      <div className="mt-8 md:px-4  w-full">
        {["media", "faq", "edit"].includes(activeTab) && (
          <>
            {/* Background Overlay */}
            <div className="fixed inset-0 z-10   bg-transparent bg-opacity-50 backdrop-blur-md"></div>

            {/* Modal Content */}
            <div
              className={`fixed z-20 top-1/2 md:left-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop-blur-md rounded-lg shadow-custom max-w-xl w-full ${
                activeTab === "edit" ? "h-[90vh] p-4 overflow-y-scroll" : ""
              }`}
            >
              {activeTab === "media" && (
                <Mediatab
                  handleCloseMedia={handleClose}
                  serviceId={serviceId}
                />
              )}
              {activeTab === "faq" && (
                <FAQsTab handleCloseFAQ={handleClose} serviceId={serviceId} />
              )}

              {activeTab === "edit" && (
                <ServiceCreate
                  onClose={handleClose}
                  serviceData={data.service}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoardDetailPage;
