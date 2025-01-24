import { GoDeviceMobile, GoMail } from "react-icons/go";
import CustomButton from "../global/button/CustomButton";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
    const navigate = useNavigate();
    const handleOnVender = () => {
        navigate("/vendorLogin")
    };
  return (
    <div className="w-full flex justify-end items-encter px-4 lg:px-16 pt-1 gap-x-7">
      <CustomButton
      leftIcon={<><GoDeviceMobile/></>}
        text="+91-6200932331"
        className="hidden md:flex lg:flex text-primary-foreground text-xs"
      />
      <CustomButton
       leftIcon={<><GoMail/></>}
        text="support@blurockionic.com"
        className="hidden md:flex lg:flex text-primary-foreground text-xs "
      />
      <CustomButton
        onClick={handleOnVender}
        text="Are you a vendor?"
        className="text-primary hover:text-primary-foreground text-sm md:text-md lg:text-md"
      />
    </div>
  );
};

export default TopNavbar;
