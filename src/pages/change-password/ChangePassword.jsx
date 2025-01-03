import React from "react";
import CustomText from "../../components/global/text/CustomText";
import CustomButton from "../../components/global/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { PasswordField } from "../../components/global/inputfield/PasswordField";
import { useForm } from "react-hook-form";
import Success from "../success/Success";

const ChangePassword = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isShowPasswordCon, setIsShowPasswordCon] = React.useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission for change password
  const handleChangePassword = (data) => {
    const { newpassword, confirmPassword } = data;

    console.log(newpassword, confirmPassword);
    // Call your API here

    // Redirect to success page
    navigate("/success", {
      state: { message: "Your password has been changed successfully" },
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* heading and description for the Change Password page */}
      <div className="w-full max-w-md space-y-8 shadow-md rounded-lg p-8">
        <div className="space-y-5">
          <CustomText
            text="Chnsge Password"
            variant="heading"
            className="text-lg md:text-2xl font-bold text-primary-foreground"
          />
          <CustomText
            text="Create a new password for your account"
            variant="paragraph"
            className="text-xs md:text-sm text-muted-foreground"
          />
        </div>
        {/* form to handle the new password input and submission */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <PasswordField
            label="New Password"
            id="newpassword"
            isShow={isShowPassword}
            setIsShow={setIsShowPassword}
            register={register}
            error={errors.password}
          />
          <PasswordField
            label="Confirm Password"
            id="confirmPassword"
            isShow={isShowPasswordCon}
            setIsShow={setIsShowPasswordCon}
            register={register}
            error={errors.confirmPassword}
          />

          <CustomButton
            className="w-full py-2 px-4 bg-primary text-white rounded-lg "
            text="Reset Password"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
