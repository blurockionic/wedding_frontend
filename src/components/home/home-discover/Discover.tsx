import React from "react";
import image1 from "../../../../public/discover/discover1.jpg";
import image2 from "../../../../public/discover/discover2.jpg";
import CustomCardWithImage from "../../global/card/CustomCardWithImage";
import CustomText from "../../global/text/CustomText";
import CustomeCardTools from "../../global/card/CustomeCardTools";
import { GoChecklist, GoGift, GoLightBulb } from "react-icons/go";

const Discover = () => {
  // Common class names for card tools
  const commonCardClass =
    "w-[400px] border shadow-md rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out px-5 py-5";

  return (
    <div className=" max-w-7xl px-2 lg:px-10 mx-auto py-10">
      <CustomText
        as="h1"
        text={"Enjoy planning your wedding"}
        className="text-3xl font-bold capitalize"
      />
      <CustomText
        as="p"
        text={"Start planning your wedding with us, it's free!"}
        className="text-xl py-1"
      />

      <div className="flex-col space-y-5 md:space-y-0 md:gap-x-10 md:flex lg:flex md:flex-row lg:flex-row justify-between items-center py-10 lg:py-10 mg:py-10">
        <CustomCardWithImage
          imageSrc={image1}
          title="Wedding venues"
          description="Photos, reviews, and so much more... "
          subDescription={"Get in touch from here! "}
        />
        <CustomCardWithImage
          imageSrc={image2}
          title="Vendors"
          description="Find the perfect vendor for your wedding "
          subDescription={"Near you in just a few clicks"}
        />
      </div>

      <div className="overflow-hidden py-2 relative mt-5">
        {/* Left Gradient */}
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#fff] to-transparent pointer-events-none z-10"></div>

        {/* Scrollable container */}
        <div className="scroll-container py-2 flex gap-5 overflow-x-auto scrollbar-hide">
          {/* Original set of cards */}
          <CustomeCardTools
            className={commonCardClass}
            title={"Your free wedding website"}
            iconLeft={<GoGift size={25} className="text-green-500" />}
            descripttion={"Share your wedding details - and your love story."}
            subDescripttion={"With a customizable website"}
            onClick={() => {}}
            buttonText={"Personalize your free website"}
          />
          <CustomeCardTools
            className={commonCardClass}
            title={"Infinite inspiration"}
            iconLeft={<GoLightBulb size={25} className="text-yellow-500" />}
            descripttion={"All the freshest wedding inspiration,"}
            subDescripttion={"Trends and ideas in one place."}
            onClick={() => {}}
            buttonText={"Get inspired here"}
          />
          <CustomeCardTools
            className={commonCardClass}
            title={"Planning tools"}
            iconLeft={<GoChecklist size={25} className="text-blue-500" />}
            descripttion={"Custom planning tools to manage your checklist,"}
            subDescripttion={"Budget, guests, and vendors."}
            onClick={() => {}}
            buttonText={"Discover our tools"}
          />
          {/* Duplicate set of cards */}
          <CustomeCardTools
            className={commonCardClass}
            title={"Your free wedding website"}
            iconLeft={<GoGift size={25} className="text-green-500" />}
            descripttion={"Share your wedding details - and your love story."}
            subDescripttion={"With a customizable website"}
            onClick={() => {}}
            buttonText={"Personalize your free website"}
          />
          <CustomeCardTools
            className={commonCardClass}
            title={"Infinite inspiration"}
            iconLeft={<GoLightBulb size={25} className="text-yellow-500" />}
            descripttion={"All the freshest wedding inspiration,"}
            subDescripttion={"Trends and ideas in one place."}
            onClick={() => {}}
            buttonText={"Get inspired here"}
          />
          <CustomeCardTools
            className={commonCardClass}
            title={"Planning tools"}
            iconLeft={<GoChecklist size={25} className="text-blue-500" />}
            descripttion={"Custom planning tools to manage your checklist,"}
            subDescripttion={"Budget, guests, and vendors."}
            onClick={() => {}}
            buttonText={"Discover our tools"}
          />
        </div>

        {/* Right Gradient */}
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#fff] to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default Discover;
