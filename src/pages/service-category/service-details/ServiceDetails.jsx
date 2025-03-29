import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPhone, BiStar } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import {
  useGetServiceByIdQuery,
  useUpdateLeadStatusMutation,
} from "../../../redux/serviceSlice";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import FeedbackForm from "../../../components/feedbackform/FeedbackForm";
import ImageGallery from "../../../components/gallery/ImageGallery";
import Rating from "../../../components/Rating";
import Accordion from "../../../components/Accordion";
import CustomMArkdown from "../../../components/EditTemplatePreview/CustomMArkdown";
import { GoLocation } from "react-icons/go";

// Mock data and API call simulation
const mockServiceData = (id) => ({
  service_id: id,
  service_name: "Premium Wedding Photography",
  description:
    "Capture your most cherished moments with our professional wedding photography service, tailored to create timeless memories.",
  rating: 4.7,
  min_price: "$1500",
  max_price: "$5000",
  service_type: "Photography",
  vendor: {
    name: "John Doe Photography",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
  },
  media: [
    "https://via.placehold.co/400x300?text=Wedding+Photo+1",
    "https://via.placehold.co/400x300?text=Wedding+Photo+2",
    "https://via.placehold.co/400x300?text=Wedding+Photo+1",
    "https://via.placehold.co/400x300?text=Wedding+Photo+2",
    "https://via.placehold.co/400x300?text=Wedding+Photo+1",
    "https://via.placehold.co/400x300?text=Wedding+Photo+2",
    "https://via.placehold.co/400x300?text=Wedding+Photo+1",
    "https://via.placehold.co/400x300?text=Wedding+Photo+2",
    "https://via.placehold.co/400x300?text=Wedding+Photo+1",
    "https://via.placehold.co/400x300?text=Wedding+Photo+2",
  ],
  reviews: [
    {
      user: "Jane Smith",
      rating: 5,
      comment: "Absolutely amazing experience! The photos turned out stunning.",
    },
  ],
  faqs: [
    {
      question: "What is included in the wedding photography package?",
      answer:
        "The package includes a full day of photography, 300+ edited photos, and a personalized photo album.",
    },
    {
      question: "How long will it take to receive my photos?",
      answer:
        "Photos are typically delivered within 4-6 weeks after the event.",
    },
    {
      question: "Do you travel for destination weddings?",
      answer:
        "Yes, we are available for destination weddings with additional travel fees.",
    },
  ],
});

const fetchServiceDetail = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServiceData(id));
    }, 1000);
  });
};

const ServiceDetails = () => {
  const { id, category, subcategory, state, city } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [service, setService] = useState(null);
  const [realService, setRealService] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [updateLead] = useUpdateLeadStatusMutation();
  const { data, refetch } = useGetServiceByIdQuery(id);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const isDesktop = window.innerWidth > 768; // Check if it's a desktop view

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchServiceDetail(id);
        if (data) {
          setRealService(data?.service);
        }
        setService(response);
      } catch {
        setError("Failed to fetch service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, id]);

  useEffect(() => {
    try {
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, refetch]);

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        {error}
        <button onClick={() => setLoading(true)} className="mt-4 text-blue-500">
          Retry
        </button>
      </div>
    );

  // handle for update the lead details
  const leadHandler = async () => {
    try {
      await updateLead(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="px-4 md:px-16 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Images Section */}
              {realService?.media.length > 0 ? (
                <ImageGallery images={realService.media[0].image_urls} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img
                    src="https://dummyjson.com/image/500x300"
                    alt="Service Image"
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                  <img
                    src="https://dummyjson.com/image/500x300"
                    alt="Service Image"
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Service Details */}
              <div className="w-full lg:w-1/3 bg-white p-4 md:p-6 shadow-md rounded-lg">
                <h1 className="text-xl md:text-2xl font-bold capitalize">
                  {data?.service?.service_name}
                </h1>
                <div className="flex items-center gap-2 text-yellow-500 mt-2">
                  <BiStar size={18} md:size={20} />
                  <span className="font-semibold">{data?.service?.rating}</span>
                </div>
                <p className="mt-2 text-gray-500 capitalize">
                  By{" "}
                  <span className="hover:underline hover:text-pink-500 cursor-pointer">
                    {data?.service?.vendor?.name}
                  </span>
                </p>
                <p className="mt-2 font-semibold">
                  <span className="text-xl md:text-2xl">
                    <span className="text-yellow-500">₹ </span>
                    {data?.service?.min_price}
                  </span>{" "}
                  / {data?.service?.service_unit}
                </p>

                <p className="mt-2 font-normal flex gap-1 items-center">
                  <span className="text-red-500">
                    <GoLocation />{" "}
                  </span>
                  <span className="text-md capitalize text-gray-500 flex gap-1">
                    {data?.service?.city}{","}
                  </span>
                  
                  <span className="text-md capitalize text-gray-500">
                    
                    {data?.service?.state}
                  </span>
                </p>

                {/* Contact Buttons */}
                <div className="mt-4 md:mt-12 flex flex-col gap-2">
                  <a
                    onClick={leadHandler}
                    href={`tel:${data?.service?.vendor?.phone_number}`}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                  >
                    <BiPhone size={18} /> Call Vendor
                  </a>
                  <a
                    onClick={leadHandler}
                    href={`sms:${data?.service?.vendor?.phone_number}`}
                    className="w-full flex items-center justify-center gap-2 bg-gray-500 text-white py-2 px-4 rounded-lg"
                  >
                    <MdMessage size={18} /> Message Vendor
                  </a>
                  <a
                    onClick={leadHandler}
                    href={`https://wa.me/${data?.service?.vendor?.phone_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg"
                  >
                    <FaWhatsapp size={18} /> WhatsApp
                  </a>
                  {/* Show Phone Number (Only on Desktop) */}
                  {isDesktop && (
                    <button
                      className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg font-semibold"
                      onClick={() => setShowPhone(true)}
                    >
                      {showPhone ? (
                        <>
                          <span>{`+91-${data?.service?.vendor?.phone_number}`}</span>
                        </>
                      ) : (
                        "View Phone Number"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-6">
              <h2 className="text-lg md:text-xl font-semibold capitalize">
                About {data?.service?.service_name}
              </h2>
            </div>
            <CustomMArkdown content={data?.service?.description} />

            {/* FAQ Section */}
            <div className="mt-6">
              <h2 className="text-xl md:text-3xl font-bold mb-4">FAQs</h2>
              <div className="space-y-4">
                {realService?.faqs?.map((faq, index) => (
                  <Accordion
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-6">
              <h2 className="text-xl md:text-3xl font-bold mb-4">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {realService?.feedback.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg">
                    <p className="font-bold capitalize">{review.user_name}</p>
                    <Rating rating={review.rating} />
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
              <FeedbackForm serviceId={id} setIsLoading={setIsLoading} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-50">
            <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-lg max-w-sm w-full">
              <p className="text-lg md:text-xl font-medium text-red-600 mb-4">
                Please log in to contact the vendor.
              </p>
              <button
                onClick={handleLoginRedirect}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full"
              >
                Log in to Continue
              </button>
            </div>
          </div>
          <div className="w-full mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Section */}
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
                  {service.service_name}
                </h1>
                <ReactMarkdown className="prose prose-sm md:prose-lg text-gray-800">
                  {service?.description}
                </ReactMarkdown>
                <Rating rating={service.rating} />
                <p className="mt-4 text-slate-900">
                  Price: {service.min_price} - {service.max_price}
                </p>
                <p className="text-slate-900">
                  Service Type: {service.service_type}
                </p>
              </div>

              {/* Right Section */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.media.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Service Image ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>

                {/* Vendor Details */}
                <div className="bg-gray-100 p-4 md:p-6 rounded-lg mt-6 shadow-lg">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-4">
                    Vendor Details
                  </h2>
                  <p className="text-md md:text-lg text-slate-600 mb-4">
                    <strong>Name:</strong> {service.vendor.name}
                  </p>

                  {/* Conditional Buttons */}
                  {isLoggedIn ? (
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                      <a
                        href={`tel:${service.vendor.phone}`}
                        className="bg-green-500 text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg hover:bg-green-700 transition"
                        aria-label={`Call ${service.vendor.name}`}
                      >
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${service.vendor.phone}`}
                        className="bg-green-500 text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg hover:bg-green-600 transition"
                        aria-label={`WhatsApp ${service.vendor.name}`}
                      >
                        WhatsApp
                      </a>
                    </div>
                  ) : (
                    <div className="bg-yellow-100 p-4 rounded-lg text-center">
                      <p className="text-md md:text-xl font-medium text-red-600 mb-4">
                        Please log in to contact the vendor.
                      </p>
                      <button
                        onClick={handleLoginRedirect}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                      >
                        Log in to Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ServiceDetails;
