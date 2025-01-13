import React from "react";
import CustomText from "../../components/global/text/CustomText";
import CustomButton from "../../components/global/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { PasswordField } from "../../components/global/inputfield/PasswordField";
import { useForm } from "react-hook-form";
import Success from "../success/Success";
import { useSearchParams } from "react-router-dom";
import { z } from "zod"; // Using Zod for validation
import { useChangePasswordMutation } from "../../redux/apiSlice.auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Zod validation schema for form
const changePasswordSchema = z
  .object({
    newpassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data) => data.newpassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isShowPasswordCon, setIsShowPasswordCon] = React.useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [userChangePasswordMutation] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleChangePassword = async (data) => {
    const{confirmPassword}=data;

    try {
      const res = await userChangePasswordMutation({
        confirmPassword,
        token,
      }).unwrap();

      if (res.success) {
        toast.success(
          res.message || "Your password has been changed successfully."
        );
        reset();
        setIsShowPasswordCon(false)
        setIsShowPassword(false)
        navigate("/Success")
      }
    } catch (error) {
     
      toast.error(res.message || "Failed to change password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8 shadow-md rounded-lg p-8">
        <div className="space-y-5">
          <CustomText
            text="Change Password"
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
            error={errors.newpassword}
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
            className="w-full py-2 px-4 bg-primary text-white rounded-lg"
            text="Reset Password"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
