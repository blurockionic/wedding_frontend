import React from "react";
import ServiceCard from "../ServiceCard";

const ServiceList = ({ services }) => {
  return (
    <div className="flex  cursor-pointer gap-6">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
