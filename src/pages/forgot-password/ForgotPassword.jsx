import CustomText from "../../components/global/text/CustomText";
import CustomButton from "../../components/global/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { Input } from "postcss";
import { InputField } from "../../components/global/inputfield/InputField";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission for forgot password
  const handleOnResetPassword = (data) => {
    const { email } = data;
    console.log(email);
    //WIP: Call your API here

    //WIP: After successful submission, Redirect to change password page
    navigate("/change-password");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8 shadow-md rounded-lg p-8">
        {/* Heading and description for the Forgot Password page */}
        <div className="space-y-5">
          <CustomText
            text="Forgot Password"
            variant="heading"
            className="text-lg md:text-2xl font-bold text-primary-foreground"
          />
          <CustomText
            text="Enter your email to reset your password"
            variant="paragraph"
            className="text-xs md:text-sm text-muted-foreground"
          />
        </div>

        {/* Form to handle the email input and submission */}
        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleOnResetPassword)}
        >
          {/* Input field for email */}
          <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            register={register} 
            icon={<MdEmail size={19} className="text-primary" />} 
            error={errors.email} 
          />

          {/* Reset Password button */}
          <CustomButton
            className="w-full py-2 px-4 bg-primary text-white rounded-lg"
            text="Reset Password"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
