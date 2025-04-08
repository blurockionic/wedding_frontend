import React, { useState } from "react";
import ForgotPasswordForm from "../../forgot-password/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { useVendorForgotPasswordMutation } from "../../../redux/vendorSlice";
import { toast } from "react-toastify";

// Vendor forgot password logic
const VendorForgotPassword = () => {
  const navigate = useNavigate();
  const [vendorForgotPasswordMutation] = useVendorForgotPasswordMutation();

  const [waitPage, setWaitPage] = useState(false);

  // Handle form submission for vendor forgot password
  const handleVendorForgotPassword = async (data) => {
    try {
      const { email } = data;
      const res = await vendorForgotPasswordMutation({ email }).unwrap();
  
      // Log the entire response to inspect its structure
      console.log("Response:", res);
  
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

  const getVendorForgotPasswordForm = () => {
    if (!waitPage) {
      return <ForgotPasswordForm onSubmit={handleVendorForgotPassword} />;
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
        {getVendorForgotPasswordForm()}
      </div>
    </div>
  );
};

export default VendorForgotPassword;
