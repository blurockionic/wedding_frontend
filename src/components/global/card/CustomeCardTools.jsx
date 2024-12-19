import CustomText from "../text/CustomText";
import PropTypes from "prop-types";
import CustomButton from "../button/CustomButton";

const CustomeCardTools = ({
  title,
  // iconRight,
  iconLeft,
  onClick,
  className = "",
  buttonText,
  descripttion,
  subDescripttion,
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center py-5 ">
        {/* <span>{iconLeft}</span> */}
        <CustomText
          as="h1"
          text={title}
          className={"text-xl font-semibold capitalize"}
        />
        <span>{iconLeft}</span>
      </div>

      <CustomText
        as="p"
        text={descripttion}
        className={"text-md "}
      ></CustomText>

      <CustomText
        as="p"
        text={subDescripttion}
        className={"text-md"}
      ></CustomText>

      <div className="flex justify-start items-start w-full mt-5">
        <CustomButton
          text={buttonText}
          onClick={onClick}
          className={"text-[#94205a]  text-end"}
        />
      </div>
    </div>
  );
};

CustomeCardTools.displayName = "CustomeCardTools";

CustomeCardTools.propTypes = {
  title: PropTypes.string,
  // iconRight: PropTypes.node,
  iconLeft: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  descripttion: PropTypes.string,
  subDescripttion: PropTypes.string,
  buttonText: PropTypes.string,
};

export default CustomeCardTools;
