import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Accordion from "../components/Accordian";
import Rating from "../components/Rating";
import useAuthRedirect from "../hooks/useAuthRedirect";

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
  ],
});

// Simulated API call
const fetchServiceDetail = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockServiceData(id));
    }, 1000);
  });
};

function ServiceDetail() {


  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchServiceDetail(id);
        setService(response);
      } catch {
        setError("Failed to fetch service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          <h1 className="text-4xl font-bold text-slate-DEFAULT mb-4">
            {service.service_name}
          </h1>
          <p className="text-lg text-slate-light mb-4">{service.description}</p>
          <Rating rating={service.rating} />
          <p className="mt-4 text-slate-DEFAULT">
            Price Range: {service.min_price} - {service.max_price}
          </p>
          <p className="text-slate-DEFAULT">
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
        </div>
      </div>

      {/* Reviews */}
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
    </div>
  );
}

export default ServiceDetail;
