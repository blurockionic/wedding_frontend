import PropTypes from "prop-types";
import CustomButton from "../button/CustomButton";
import CustomText from "../text/CustomText";
const CustomCardWithImage = ({
  imageSrc,
  title,
  description,
  subDescription,
  onClick = () => {},
  className = "",
}) => {
  return (
    <div
      className={`w-auto md:w-[400px] lg:w-[600px] rounded-lg shadow-md flex hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out ${className}`}
    >
      <div className="w-1/2 px-5 flex flex-col justify-center py-5 md:py-0">
        <CustomText as="h1" className="text-lg  md:text-2xl font-bold">
          {title}
        </CustomText>
        <CustomText as="p" className="text-sm md:text-lg pb-2 md:pb-0">
          {description}
        </CustomText>
        <CustomText as="p" className="mb-5 text-sm md:text-lg hidden md:block">
          {subDescription}
        </CustomText>
        
        <CustomButton
          onClick={onClick}
          className={"text-[#FF69B4] px-10  border border-[#FF69B4]  md:mt-0"}
          text="See more"
        >
          See more
        </CustomButton>
      </div>
      <div className="w-1/2">
        <img
          src={imageSrc}
          alt="card Image"
          className="rounded-tr-lg rounded-br-lg "
        />
      </div>
    </div>
  );
};

CustomCardWithImage.displayName = "CustomCardWithImage";

CustomCardWithImage.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  subDescription: PropTypes.string,
};

export default CustomCardWithImage;