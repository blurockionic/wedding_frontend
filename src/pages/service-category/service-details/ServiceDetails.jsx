import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiPhone, BiStar } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import {
  useGetServiceByIdQuery,
  useUpdateLeadStatusMutation,
} from "../../../redux/serviceSlice";
import FeedbackForm from "../../../components/feedbackform/FeedbackForm";
import ImageGallery from "../../../components/gallery/ImageGallery";
import Rating from "../../../components/Rating";
import Accordion from "../../../components/Accordion";
import CustomMarkdown from "../../../components/EditTemplatePreview/CustomMArkdown";
import useIsDesktop from "../../../hooks/useIsDesktop";

const ServiceDetails = () => {
  const { id } = useParams();

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  const role = useSelector((state) => state.auth?.user?.role) ?? "";

  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const [showPhone, setShowPhone] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { data, refetch, isLoading, isError } = useGetServiceByIdQuery(id);
  const [updateLead] = useUpdateLeadStatusMutation();

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  const leadHandler = async () => {
    try {
      await updateLead(id).unwrap();
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (isError)
    

    return (
      <div className="text-center text-red-500">
        { isError   || "Something went wrong"}
        <button onClick={refetch} className="mt-4 text-blue-500">
          Retry
        </button>
      </div>
    );

  const { service } = data;

  const {
    service_name,
    media,
    rating,
    vendor,
    min_price,
    service_unit,
    city,
    state,
    description,
    faqs,
    feedback,
  } = service || {};

  const imageSection =
    media?.length > 0 ? (
      <ImageGallery images={media[0]?.image_urls} />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <img
            key={i}
            src="https://dummyjson.com/image/500x300"
            alt="Service"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    );
    const isUser = isLoggedIn && role?.toLowerCase() === "user";

    const contactButtons = (
      <>
        {["call", "message", "whatsapp"].map((type) => {
          let icon;
          let text;
          let href;
    
          switch (type) {
            case "call":
              icon = <BiPhone size={18} />;
              text = "Call Vendor";
              href = `tel:${vendor?.phone_number}`;
              break;
            case "message":
              icon = <MdMessage size={18} />;
              text = "Message Vendor";
              href = `sms:${vendor?.phone_number}`;
              break;
            case "whatsapp":
              icon = <FaWhatsapp size={18} />;
              text = "WhatsApp";
              href = `https://wa.me/${vendor?.phone_number}`;
              break;
            default:
              break;
          }
    
          
    
          return (
            <button
              key={type}
              onClick={() => {
                if (!isUser) {
                  setShowLoginModal(true);
                } else {
                  leadHandler();
                  if (type === "whatsapp") {
                    window.open(href, "_blank");
                  } else {
                    window.location.href = href;
                  }
                }
              }}
              className={`w-full flex items-center justify-center gap-2 ${
                type === "call"
                  ? "bg-blue-500"
                  : type === "message"
                  ? "bg-gray-500"
                  : "bg-green-600"
              } text-white py-2 px-4 rounded-lg`}
            >
              {icon}{" "}
              {!isUser && showLoginModal ? (
                <span onClick={handleLoginRedirect} className="underline">
                  Click to login as user
                </span>
              ) : (
                text
              )}
            </button>
          );
        })}
      </>
    );
    
    

  return (
    <div className="px-4 md:px-16 py-6 md:py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        {imageSection}

        {/* Service Details */}
        <div className="w-full lg:w-1/3 bg-white p-4 md:p-6 shadow-md rounded-lg">
          <h1 className="text-xl md:text-2xl font-bold capitalize">
            {service_name}
          </h1>
          <div className="flex items-center gap-2 text-yellow-500 mt-2">
            <BiStar size={18} />
            <span className="font-semibold">{rating}</span>
          </div>
          <p className="mt-2 text-gray-500 capitalize">
            By{" "}
            <span className="hover:underline hover:text-pink-500 cursor-pointer">
              {vendor?.business_name}
            </span>
          </p>
          <p className="mt-2 font-semibold text-xl md:text-2xl">
            <span className="text-yellow-500">₹</span> {min_price} /{" "}
            {service_unit}
          </p>
          <p className="mt-2 font-normal flex items-center gap-1 text-gray-500 capitalize">
            <GoLocation className="text-red-500" />
            {city}, {state}
          </p>

          <div className="mt-4 md:mt-12 flex flex-col gap-2">
            {!isDesktop ? (
              contactButtons
            ) : (
              <button
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold"
                onClick={() => {
                  if (!isUser) {
                    setShowLoginModal(true);
                  } else {
                    leadHandler();
                    setShowPhone(true);
                  }
                }}
              >
                {showPhone && role?.toLowerCase() === "user" ? (
                  `+91-${vendor?.phone_number}`
                ) : showLoginModal ? (
                  <span
                    onClick={handleLoginRedirect}
                    className=" underline cursor-pointer"
                  >
                    Login as user to view
                  </span>
                ) : (
                  "View Phone Number"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <h2 className="text-lg md:text-xl font-semibold capitalize">
          About {service_name}
        </h2>
        <CustomMarkdown content={description} />
      </div>

      {/* FAQs */}
      {faqs?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl md:text-3xl font-bold mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Accordion key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-6">
        <h2 className="text-xl md:text-3xl font-bold mb-4">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedback?.map((review, i) => (
            <div key={i} className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold capitalize">{review.user_name}</p>
              <Rating rating={review.rating} />
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
        <FeedbackForm serviceId={id} />
      </div>
    </div>
  );
};

export default ServiceDetails;
