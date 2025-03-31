import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../static/helper";
import { Coins, RatIcon, Star } from "lucide-react";
import { GiTwoCoins } from "react-icons/gi";


const VendorServiceList = ({ services }) => {
  const navigate = useNavigate();

  const handleCardClick = (serviceId) => {
    navigate(`service-details/${serviceId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 md:p-6">
      {services?.length > 0 ? (
        services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleCardClick(service.id)}
            className="bg-white backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105"
          >
            {/* Card Header */}
            <div className="relative w-full h-44">
              <img
                src={
                  service?.media?.[0]?.image_urls?.[0]?.path ||
                  `https://placehold.co/300x200?text=${service.service_type}`
                }
                alt="Service"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-pink-800/60  text-white px-3 py-1 text-xs font-semibold rounded-md">
                {service.service_type || "N/A"}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate capitalize">
                {service.service_name}
              </h3>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <GiTwoCoins size={24} className="font-medium text-primary"> </GiTwoCoins>{" "}
                {service.min_price ? (
                  <span className="font-semibold">
                   From {formatPrice(service.min_price)}/{service.service_unit || "unit"}
                  </span>
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
              </p>
              <p className="text-sm text-gray-600">
           
               ⭐ <span className="font-bold text-yellow-500">
                  {service.rating || "0"} 
                </span>
              </p>
            </div>

            {/* Card Footer */}
            <div className="bg-gray-50 p-3 text-sm text-gray-600 flex justify-between items-center border-t">
              <p>
                <span className="font-medium">City:</span>{" "}
                <span className="text-gray-800 capitalize">{service?.city || "N/A"}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center col-span-full">
          <p className="text-xl text-gray-500">No services found</p>
        </div>
      )}
    </div>
  );
};

export default VendorServiceList;
