import React from "react";
import { Star } from "lucide-react";

const ServiceCard = ({ image, title, vendorName, rating, rate }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-72">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-xl" />

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{vendorName}</p>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div>
          <span className="text-lg font-bold text-green-600">₹{rate} </span><span>/per plate</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
