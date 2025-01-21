import React from "react";
import { useNavigate } from "react-router-dom";

const VendorServiceList = ({ services }) => {

  const navigate = useNavigate(); // Initialize navigate hook

  
  const handleCardClick = (serviceId) => {
    navigate(`service-details/${serviceId}`); 
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 md:p-6">
      {services?.length > 0 ? (
        services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleCardClick(service.id)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-ring flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="p-4 bg-gray-100 border-b border-gray-300 rounded-tl-lg rounded-tr-lg">
              <h3 className="text-lg font-medium text-gray-800 truncate capitalize">
                {service.service_name}
              </h3>
              <p className="text-sm text-gray-500 capitalize">
               <span className="font-thin text-xs"> Service Type:</span> <span className="font-bold">{service.service_type || "N/A"}</span>
              </p>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col space-y-2">
              {/* <p className="text-sm text-gray-600">
                {service.description || "No description available."}
              </p> */}
              <div className="text-sm text-gray-500">
                <p>
                 <span className="text-sm font-thin"> Price Range:</span>{" "}
                  <span className="font-medium text-gray-800">
                    ${service.min_price || "N/A"} - ${service.max_price || "N/A"}
                  </span>
                </p>
                <p>
                <span className="text-sm font-thin">  Rating:</span>
                  <span className="font-medium text-gray-800">
                    {service.rating || 0} ⭐
                  </span>
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className=" flex justify-between p-2 bg-gray-100 border-t border-gray-300 rounded-bl-lg rounded-br-lg">
              <p className="text-sm text-gray-500">
                Vendor:{" "}
                <span className="font-medium capitalize text-gray-800">
                  {service.vendor?.name || "Unknown"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                City:{" "}
                <span className="font-medium text-gray-800">
                  {service.vendor?.city || "N/A"}
                </span>
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
