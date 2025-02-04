import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import Accordion from "../components/Accordion";
import { IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  useGetServiceByIdQuery,
  useUpdateLeadStatusMutation,
} from "../redux/serviceSlice";
import ImageGallery from "../components/gallery/ImageGallery";
import FeedbackForm from "../components/feedbackform/FeedbackForm";
import ReactMarkdown from "react-markdown";

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
    "https://via.placeholder.com/400x300?text=Wedding+Photo+1",
    "https://via.placeholder.com/400x300?text=Wedding+Photo+2",
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

function ServiceDetail() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [realService, setRealService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [updateLead] = useUpdateLeadStatusMutation();
  const { data, refetch } = useGetServiceByIdQuery(id);
  const [isLoading, setIsLoading] = useState(false);

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

<<<<<<< HEAD
=======
  console.log(service)


  
    
    

  

  

>>>>>>> 7da58dc41d962ffc1e96a63bbbe7ec2a65c19dd8
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

  const leadHandler = async () => {
    try {
      const res = await updateLead(id).unwrap();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="max-w-screen-xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Section */}
              <div>
                <h1 className="text-4xl font-bold text-slate-DEFAULT mb-4 capitalize">
                  {realService?.service_name}
                </h1>

                <ReactMarkdown className="prose prose-lg text-lg text-slate-light mb-4 text-gray-800">
                  {realService?.description}
                </ReactMarkdown>
                <Rating rating={realService?.rating} />
                <p className="mt-4 text-slate-DEFAULT">
                  Price Range: {realService?.min_price} -{" "}
                  {realService?.max_price || realService?.min_price + 20000}
                </p>
                <p className="text-slate-DEFAULT capitalize ">
                  Service Type:{" "}
                  <span className="font-semibold">
                    {realService?.service_type}
                  </span>
                </p>
              </div>

              {/* Right Section */}
              <div>
                {realService?.media.length > 0 ? (
                  <ImageGallery images={realService.media[0].image_urls} />
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <img
                        src={"https://dummyjson.com/image/500x300"}
                        alt={`Service Image`}
                        className="w-full h-40 object-cover rounded-lg shadow-md"
                      />
                      <img
                        src={"https://dummyjson.com/image/500x300"}
                        alt={`Service Image`}
                        className="w-full h-40 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </>
                )}

                {/* Vendor Details Section */}
                <div className="bg-[#f9f9f9] p-6 rounded-lg mt-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-700 mb-4">
                    Vendor Details
                  </h2>
                  <p className="text-lg text-slate-600 mb-4 capitalize cursor-pointer ">
                    <strong>Name:</strong>{" "}
                    <span className="hover:underline hover:text-primary">
                      {realService?.vendor?.name}
                    </span>
                  </p>

                  <div className="flex flex-col space-y-4 mt-4">
                    {/* Conditional Rendering based on Login Status */}
                    {isLoggedIn ? (
                      <div className="flex space-x-4">
                        <a
                          onClick={leadHandler}
                          href={`tel:${service?.vendor?.phone}`}
                          className="bg-green-500 text-white flex justify-center items-center gap-2 px-5 py-3 rounded-lg hover:bg-green-700 transition"
                          aria-label={`Call ${service.vendor.name}`}
                        >
                          Call <IoCall />
                        </a>
                        <a
                          onClick={leadHandler}
                          href={`https://wa.me/${service?.vendor?.phone}`}
                          className="bg-green-500 text-white flex justify-center items-center gap-2 px-5 py-3 rounded-lg hover:bg-green-600 transition"
                          aria-label={`WhatsApp ${service.vendor.name}`}
                        >
                          WhatsApp <BsWhatsapp />
                        </a>
                      </div>
                    ) : (
                      <div className="bg-yellow-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-medium text-red-600 mb-4">
                          Please log in to contact the vendor.
                        </p>
                        <button
                          onClick={handleLoginRedirect}
                          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
                        >
                          Log in to Continue
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {realService?.feedback.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg">
                    <p className="font-bold">{review.user_name}</p>
                    <Rating rating={review.rating} />
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
              <FeedbackForm serviceId={id} setIsLoading={setIsLoading} />
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4">FAQs</h2>
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
          </div>
        </>
      ) : (
        <>
          {/* Main Content */}
          <div className="w-full mx-auto p-6 relative ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Section */}
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  {service.service_name}
                </h1>
                <ReactMarkdown className="prose prose-lg text-gray-800">
                  {service?.description}
                </ReactMarkdown>
                <Rating rating={service.rating} />
                <p className="mt-4 text-slate-900">
                  Price Range: {service.min_price} - {service.max_price}
                </p>
                <p className="text-slate-900">
                  Service Type: {service.service_type}
                </p>
              </div>

              {/* Right Section */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {service.media.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Service Image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>

                {/* Vendor Details Section */}
                <div className="bg-gray-100 p-6 rounded-lg mt-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-700 mb-4">
                    Vendor Details
                  </h2>
                  <p className="text-lg text-slate-600 mb-4">
                    <strong>Name:</strong> {service.vendor.name}
                  </p>

                  <div className="flex flex-col space-y-4 mt-4">
                    {isLoggedIn ? (
                      <div className="flex space-x-4">
                        <a
                          href={`tel:${service.vendor.phone}`}
                          className="bg-green-500 text-white flex justify-center items-center gap-2 px-5 py-3 rounded-lg hover:bg-green-700 transition"
                          aria-label={`Call ${service.vendor.name}`}
                        >
                          Call <IoCall />
                        </a>
                        <a
                          href={`https://wa.me/${service.vendor.phone}`}
                          className="bg-green-500 text-white flex justify-center items-center gap-2 px-5 py-3 rounded-lg hover:bg-green-600 transition"
                          aria-label={`WhatsApp ${service.vendor.name}`}
                        >
                          WhatsApp <BsWhatsapp />
                        </a>
                      </div>
                    ) : (
                      <div className="bg-yellow-100 p-4 rounded-lg text-center">
                        <p className="text-xl font-medium text-red-600 mb-4">
                          Please log in to contact the vendor.
                        </p>
                        <button
                          onClick={handleLoginRedirect}
                          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
                        >
                          Log in to Continue
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg">
                    <p className="font-bold">{review.user}</p>
                    <Rating rating={review.rating} />
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4">FAQs</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>

            {/* Background Overlay */}

            <div
              className={`absolute w-full inset-0 bg-black bg-opacity-50 transition-opacity duration-300 
              opacity-100 backdrop-blur-md
            z-10`}
            />
          </div>

          {/* Conditional Modal */}
          {!isLoggedIn && (
            <div className="bg-yellow-100 z-20 p-4 rounded-lg text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-xl font-medium text-red-600 mb-4">
                Please login to view details or contact the vendor.
              </p>
              <button
                onClick={handleLoginRedirect}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
              >
                Log in to Continue
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ServiceDetail;
