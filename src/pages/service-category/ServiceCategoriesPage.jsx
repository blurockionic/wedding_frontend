import React from "react";
import ServiceCategoriesCard from "../../components/servicecatogories/ServiceCatogoriesCard";

const ServiceCategoriesPage = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 py-5 md:py-10">
        <ServiceCategoriesCard
          title="Wedding Venues"
          description="Find stunning venues, from grand resorts to cozy gardens!"
          image="/discover/wedding-venues.png" 
        />
        <ServiceCategoriesCard
          title="Wedding Vendors"
          description="Top-rated professionals to bring your wedding vision to life!"
          image="/discover/wedding-vendor.png"
        />
        <ServiceCategoriesCard
          title="Bride"
          description="Bridal wear, beauty, and essentials for your perfect wedding look!"
          image="/discover/bride.png"
        />
        <ServiceCategoriesCard
          title="Groom"
          description="Stylish suits, grooming, and accessories for the modern groom!"
          image="/discover/groom.png"
        />
        <ServiceCategoriesCard
          title="Wedding Services"
          description="Planners, decorators, caterers & more for a seamless wedding!"
          image="/discover/wedding-services.png"
        />
        <ServiceCategoriesCard
          title="Other Services"
          description="Entertainment, transport, and extras for a flawless celebration!"
          image="/discover/other.png"
        />
      </div>
    </div>
  );
};

export default ServiceCategoriesPage;
