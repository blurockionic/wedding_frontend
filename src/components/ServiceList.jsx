import React from "react";
import ServiceCard from "./ServiceCard";

const ServiceList = ({ services }) => {
  if (!services.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">No services found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (

        <ServiceCard key={service.id} service={service}/>

       
      ))}
    </div>
  );
};

export default ServiceList;
