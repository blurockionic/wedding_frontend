import React from "react";

const ServiceItem = ({ service }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
      <p className="text-gray-600 mt-2">Type: {service.type}</p>
      <p className="text-gray-600">Price: {service.priceRange}</p>
      <p className="text-gray-600">Rating: {service.rating}</p>
      
      <div className="mt-4 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none">
          Delete
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ServiceItem;
