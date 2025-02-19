import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiChevronDown, BiPhone, BiStar } from "react-icons/bi";
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
    "https://via.placeholder.com/400x300?text=Wedding+Photo+1",
    "https://via.placeholder.com/400x300?text=Wedding+Photo+2",
    "https://via.placeholder.com/400x300?text=Wedding+Photo+1",
    "https://via.placeholder.com/400x300?text=Wedding+Photo+2",
    "https://via.placeholder.com/400x300?text=Wedding+Photo+1",
    "https://via.placeholder.com/400x300?text=Wedding+Photo+2",
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

  let vendorPhone = ""; // Sample phone number
   

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
    {
      isLoggedIn ? (<>
      <div className="px-16 py-8">
      {/* Service Main Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Images */}
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

        {/* Right: Service Details */}
        <div className="w-full lg:w-1/3 bg-white p-6 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold capitalize">
            {data?.service?.service_name}{" "}
          </h1>
          <div className="flex items-center gap-2 text-yellow-500 mt-2">
            <BiStar size={20} />
            <span className="font-semibold">{data?.service?.rating}</span>
            <span className="text-gray-500">(200 Reviews)</span>
          </div>
          <p className="mt-2 text-gray-500 capitalize">
            By{" "}
            <span className="hover:underline hover:text-pink-500 cursor-pointer">
              {data?.service?.vendor?.name}
            </span>
          </p>
          <p className="mt-2  font-semibold">
            <span className="text-2xl">₹{data?.service?.min_price}</span> /{" "}
            {data?.service?.service_unit}
          </p>

          {/* <button className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold">
            Book Now
          </button> */}

          {/* Contact Buttons */}
          <div className="mt-4 md:mt-24 flex flex-col gap-2">
            <a
              href={`tel:${vendorPhone}`}
              className="w-full flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              <BiPhone size={20} /> Call Vendor
            </a>
            <a
              href={`sms:${data?.service?.vendor?.phone_number}`}
              className="w-full flex items-center gap-2 bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              <MdMessage size={20} /> Message Vendor
            </a>
            <a
              href={`https://wa.me/${data?.service?.vendor?.phone_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg"
            >
              <FaWhatsapp size={20} /> WhatsApp
            </a>
          </div>

          {/* Show Phone Number (Only on Desktop) */}
          {isDesktop && (
            <button
              className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg font-semibold"
              onClick={() => setShowPhone(true)}
            >
              {showPhone ? (`+91-${data?.service?.vendor?.phone_number}`) : "View Vendor Phone Number"}
            </button>
          )}
        </div>
      </div>

      {/* Service Description & Features */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold capitalize">
          About {data?.service?.service_name}
        </h2>
        <p className="mt-2 text-gray-600">
          <ReactMarkdown className="prose prose-lg text-gray-800">
            {data?.service?.description}
          </ReactMarkdown>
        </p>
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

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Reviews</h2>
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
      </>): ( <>
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
                  Price: {service.min_price} - {service.max_price}
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
                          {/* Call <IoCall /> */}
                        </a>
                        <a
                          href={`https://wa.me/${service.vendor.phone}`}
                          className="bg-green-500 text-white flex justify-center items-center gap-2 px-5 py-3 rounded-lg hover:bg-green-600 transition"
                          aria-label={`WhatsApp ${service.vendor.name}`}
                        >
                          {/* WhatsApp <BsWhatsapp /> */}
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
        </>)
    }
    </>
  );
};

export default ServiceDetails;
