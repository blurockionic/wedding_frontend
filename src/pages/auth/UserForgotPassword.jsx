import React, { useState } from "react";
import ForgotPasswordForm from "../forgot-password/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { useReqResetPasswordMutation } from "../../redux/apiSlice.auth";
import { toast } from "react-toastify";

// Vendor forgot password logic
const UserForgotPassword = () => {
  const navigate = useNavigate();
  const [userForgotPasswordMutation] = useReqResetPasswordMutation();

  const [waitPage, setWaitPage] = useState(false);

  // Handle form submission for vendor forgot password
  const handleUserForgotPassword = async (data) => {
    try {
      const { email } = data;
      const res = await userForgotPasswordMutation({ email }).unwrap();
  
      if (res.success) {
        setWaitPage(true);
        toast.success(res.message);
      } else if (res.data.status === 404) {
        const errorMessage = res.data.errors?.message || "Email not found.";
        toast.error(errorMessage);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  const getUserForgotPasswordForm = () => {
    if (!waitPage) {
      return (
        <>
        <h1>
        <h1 className="text-2xl font-bold text-center font-outfit">
              Password Reset 
            </h1>
        </h1>

        <ForgotPasswordForm onSubmit={handleUserForgotPassword} />
        
        
        </>
      );
    } else {
      return (
        <>
        <h1 className="text-2xl font-semibold text-center">
              Password Reset Requested
            </h1>
            <p className="text-center">
              If the email provided is associated with an account, you will
              receive an email with instructions to reset your password.
            </p>
        </>
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8 p-8 border rounded-lg shadow-md">
        {getUserForgotPasswordForm()}
      </div>
    </div>
  );
};
export default UserForgotPassword;
