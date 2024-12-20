import React from "react";
import image1 from "../../../../public/discover/discover1.jpg";
import image2 from "../../../../public/discover/discover2.jpg";
import CustomCardWithImage from "../../global/card/CustomCardWithImage";
import CustomText from "../../global/text/CustomText";
import CustomeCardTools from "../../global/card/CustomeCardTools";
import { GoChecklist, GoGift, GoLightBulb } from "react-icons/go";

const Discover = () => {
  return (
    <div className="px-10 md:px-32 lg:32 py-10">
      <CustomText
        as="h1"
        text={"Enjoy planning your wedding"}
        className="text-3xl font-bold capitalize"
      ></CustomText>
      <CustomText
        as="p"
        text={" Start planning your wedding with us, it's free!"}
        className="text-xl py-1"
      ></CustomText>

      <div className="flex-col space-y-5 md:space-y-0 md:gap-x-10 md:flex lg:flex md:flex-row lg:flex-row justify-between items-center py-10 lg:py-10 mg:py-10">
        <CustomCardWithImage
          imageSrc={image1}
          title="Wedding venues"
          description="Photos, reviews, and so much more... "
          subDescription={"get in touch from here! "}
        />
        <CustomCardWithImage
          imageSrc={image2}
          title="Venders"
          description="Find the perfect vendor for your wedding "
          subDescription={"Near you in just a few clicks"}
        />
      </div>

      <div className="flex justify-between items-center mt-5 ">
        <CustomeCardTools
          className="w-[400px] border shadow-md  rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out px-5 py-5"
          title={"Your free wedding website"}
          iconLeft={
            <>
              <GoGift size={25} className="text-green-500" />
            </>
          }
          descripttion={"Share your wedding details - and your love story."}
          subDescripttion={"with a customisable website"}
          onClick={() => {}}
          buttonText={"Personalise your free website"}
        />
        <CustomeCardTools
          className="w-[400px] border shadow-md  rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out px-5 py-5"
          title={"Infinite inspiration"}
          iconLeft={
            <>
              <GoLightBulb size={25} className="text-yellow-500" />
            </>
          }
          descripttion={"All the freshest wedding inspiration, "}
          subDescripttion={"trends and ideas in one place."}
          onClick={() => {}}
          buttonText={"Get inspired here"}
        />
        <CustomeCardTools
          className="w-[400px] border shadow-md  rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out px-5 py-5"
          title={"Planning tools"}
          iconLeft={
            <>
              <GoChecklist size={25} className="text-blue-500" />
            </>
          }
          descripttion={"Custom planning tools to manage your checklist, "}
          subDescripttion={"budget, guests and vendors."}
          onClick={() => {}}
          buttonText={"Discover our tools"}
        />
      </div>
    </div>
  );
};

export default Discover;
