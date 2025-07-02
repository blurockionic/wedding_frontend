import React from "react";
import ServiceCard from "../ServiceCard";

const ServiceList = ({ services }) => {
  // Add defensive check for services
  if (!services || !Array.isArray(services)) {
    console.warn("ServiceList: services is not an array:", services);
    return (
      <div className="text-center p-4 text-gray-500">
        No services found or an error occurred.
      </div>
    );
  }

  return (
    <div className="flex cursor-pointer gap-6">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
