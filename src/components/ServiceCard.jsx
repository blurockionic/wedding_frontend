import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

function ServiceCard({ service }) {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle redirect to the details page
  const handleCardClick = () => {
    navigate(`/service/${service.id}`); // Assuming 'id' is the unique identifier for the service
  };

  return (
    <div
      className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" 
      onClick={handleCardClick} // Add onClick to trigger redirect
    >
      {/* Image Section */}
      <div className="h-48 bg-gray-300 flex p-2 items-center justify-center">
        <img
          src={`https://via.placeholder.com/300x200?text=${service.service_type}`} // Replace with actual image URL
          alt={service.service_name}
          className="h-full rounded-md w-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between">
          <h3
            className="text-lg font-semibold capitalize text-gray-800 truncate"
            title={service.service_name}
          >
            {service.service_name
              .split(" ") // Split the service name into words
              .slice(0, 3) // Take the first 3 words
              .join(" ")}{" "}
            {service.service_name.split(" ").length > 3 ? "..." : ""}
          </h3>
          <span className="text-sm text-gray-500">⭐ {service.rating}</span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          <strong>Vendor:</strong> {service.vendor.name}
        </p>
        <p className="text-sm text-gray-500">{service.vendor.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-700 font-semibold">
              ₹{service.min_price}
            </span>{" "}
            -{" "}
            <span className="text-gray-700 font-semibold">
              ₹{service.max_price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
