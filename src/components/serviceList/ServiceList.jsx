import React from "react";
import ServiceCard from "../ServiceCard";

const ServiceList = ({ services }) => {
  

  // return (
  //   <div className="relative  rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  //     {services.map((service, index) => (
  //       <div key={service.id} className="relative">
  //         <ServiceCard service={service} />
  //         {index === services.length - 1 && (
  //           <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold rounded-lg">
  //             <span className="bg-primary px-5 py-2 rounded-md">See More</span>
  //           </button>
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );

return (
  <div className="rounded-lg flex-wrap flex gap-8 justify-start items-start">
  {services.map((service, index) => (
    <ServiceCard key={index} service={service} />
  ))}
</div>

)

};

export default ServiceList;
