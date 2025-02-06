import React from "react";
import image1 from "../../../../public/discover/discover1.jpg";
import image2 from "../../../../public/discover/discover2.jpg";
import image3 from "../../../../public/discover/brides.jpg";
import image4 from "../../../../public/discover/groom.jpg";
import CustomCardWithImage from "../../global/card/CustomCardWithImage";
import CustomText from "../../global/text/CustomText";
import CustomeCardTools from "../../global/card/CustomeCardTools";
import { GoChecklist, GoGift, GoLightBulb } from "react-icons/go";
import { useGetServicesQuery } from "../../../redux/serviceSlice";
import MostBookedService from "../../mostBookedService/MostBookedService";
import FeatureService from "../../featuredservices/FeatureService";
import ServiceCategories from "../../servicecatogories/ServiceCatogoriesCard";
import Venues from "../../venues/Venues";
import TopVendors from "../../vendors/TopVendors";
import TopBrides from "../../brides/TopBrides";
import TopGrooms from "../../grooms/TopGrooms";
import ServiceCategoriesCard from "../../servicecatogories/ServiceCatogoriesCard";

const Discover = () => {
  const filters = {
    limit: 4,
    page: 1,
  };
  const { data, error, isLoading } = useGetServicesQuery(filters);
  return (
    <>
    {/* most booked service  */}
    <div className="max-w-7xl px-2 lg:px-10 mx-auto py-10 mt-16">
      <CustomText
        as="h1"
        text={"Most Booked Wedding Vendors"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Plan your wedding with ease"}
        className="text-xl py-1"
      />
      {/* most Booked serices  */}
      <div className="relative flex gap-5 px-5 md:px-0 py-10 lg:py-10">
        <MostBookedService services={data?.ServiceResult || []} />
      </div>
    </div>

    {/* featured service  */}
    <div className="max-w-7xl px-2 lg:px-10 mx-auto py-10 ">
      <CustomText
        as="h1"
        text={"Featured Wedding Services"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Assured quality services"}
        className="text-xl py-1"
      />
      {/* most Booked serices  */}
      <div className="relative flex gap-5 px-5 md:px-0 py-10 lg:py-10">
        <FeatureService services={data?.ServiceResult || []} />
      </div>
    </div>

    {/* wedding categories  */}
    <section className="max-w-7xl px-2 lg:px-10 mx-auto py-10 ">
      <CustomText
        as="h1"
        text={"Wedding Categories"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Find the best wedding vendors in your city"}
        className="text-xl py-1"
      />
      {/* most Booked serices  */}
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
    </section>

    {/* wedding venues  */}
    <section className="max-w-7xl px-2 lg:px-10 mx-auto py-10 ">
      <CustomText
        as="h1"
        text={"Top Wedding Venues"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Find top wedding venues in your city"}
        className="text-xl py-1"
      />
      {/* most Booked serices  */}
      <div className="relative flex gap-5 px-5 md:px-0 py-10 lg:py-10">
        <Venues services={data?.ServiceResult || []}/>
      </div>
    </section>

     {/* wedding venues  */}
     <section className="max-w-7xl px-2 lg:px-10 mx-auto py-10 ">
      <CustomText
        as="h1"
        text={"Top Wedding Vendors"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Find top wedding vendors in your city"}
        className="text-xl py-1"
      />
      {/* most Booked serices  */}
      <div className="relative flex gap-5 px-5 md:px-0 py-10 lg:py-10">
        <TopVendors services={data?.ServiceResult || []}/>
      </div>
    </section>

     {/* wedding brides  */}
     <section className="max-w-7xl px-2 lg:px-10 mx-auto py-10 ">
      <CustomText
        as="h1"
        text={"Top brides services"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Find top bride services in your city"}
        className="text-xl py-1"
      />
    
      <div className="relative flex gap-5 px-5 md:px-0 py-10 lg:py-10">
        <TopBrides services={data?.ServiceResult || []}/>
      </div>
    </section>

     {/* grooms  */}
     <section className="max-w-7xl px-2 lg:px-10 mx-auto py-10 ">
      <CustomText
        as="h1"
        text={"Top Grooms services"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Find top groom services in your city"}
        className="text-xl py-1"
      />
      {/* most Booked serices  */}
      <div className="relative flex gap-5 px-5 md:px-0 py-10 lg:py-10">
        <TopGrooms services={data?.ServiceResult || []}/>
      </div>
    </section>
    </>
  );
};

export default Discover;
