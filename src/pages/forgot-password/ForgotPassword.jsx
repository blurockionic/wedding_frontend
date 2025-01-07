import React from "react";
import { InputField } from "../../components/global/inputfield/InputField";
import CustomButton from "../../components/global/button/CustomButton";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schema with Zod
const ForgotPasswordSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
});

const ForgotPasswordForm = ({ onSubmit, errors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid }, // Access form validation state
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange", // Enable validation on change
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Input field for email */}
      <InputField
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your registered email"
        register={register} 
        icon={<MdEmail size={19} className="text-primary" />} 
        error={formErrors?.email} 
      />

      {/* Reset Password button */}
      <CustomButton
        className="w-full py-2 px-4 bg-primary text-foreground rounded-lg"
        text="Reset Password"
        type="submit"
        disabled={!isValid}  
      />
    </form>
  );
};

export default ForgotPasswordForm;
