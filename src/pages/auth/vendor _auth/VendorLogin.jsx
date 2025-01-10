import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoEye, GoEyeClosed, GoMail, GoLock } from "react-icons/go";
import { useVendorLoginMutation } from "../../../redux/vendorSlice";
import { login } from "../../../redux/authSlice";
import CustomText from "../../../components/global/text/CustomText";
import { InputField } from "../../../components/global/inputfield/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../../../components/global/inputfield/PasswordField";
import useNoAuthRedirect from "../../../hooks/useNoAuthRedirect";

const vendorLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function VendorLogin() {
  useNoAuthRedirect("vendor","/VendorLogin")
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [vendorLoginMutation] = useVendorLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" }, zodResolver(vendorLoginSchema));

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const result = await vendorLoginMutation({ email, password }).unwrap();

      if (result.vendor) {
        dispatch(login(result.vendor));
        reset();
        toast.success("Vendor login successful!");
        navigate("/vendorDashboard", { replace: true });
      }
    } catch (error) {
      toast.error(error.data?.message || "An unexpected error occurred.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-card px-4">
      <div className="w-full sm:w-96 sm:bg-card bg-transparent sm:shadow-custom rounded-lg sm:px-8 px-4 py-10 space-y-6">
        <div>
          <CustomText
            variant="heading"
            className="text-3xl mb-1 font-bold text-primary-foreground"
          >
            Vendor Login
          </CustomText>
          <CustomText
            variant="paragraph"
            className="text-sm text-muted-foreground"
          >
            Enter your credentials to access the vendor portal
          </CustomText>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<GoMail size={19} className="text-primary" />}
            register={register}
            id="email"
            error={errors.email}
          />

          <PasswordField
            icon={<GoLock size={19} className="text-primary" />}
            type={isShowPassword ? "text" : "password"}
            isShow={isShowPassword}
            setIsShow={setIsShowPassword}
            id="password"
            register={register}
            label="Enter your password"
            error={errors.password}
          />

          <Link
            to="/vendor-forgot-password"
            className="text-sm text-muted-foreground hover:underline block text-end"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={loading || !isValid}
            className={`w-full ${
              loading ? "bg-muted" : "bg-primary"
            } disabled:cursor-not-allowed cursor-pointer flex  items-center justify-center w-full disabled:bg-muted border-2 border-ring hover:bg-dustyRose text-accent-foreground font-bold py-2  rounded focus:outline-none  focus:ring-ring transition`}
          >
            {loading && (
              <svg
                className="w-5 h-5 mr-2 text-primary animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0="
                />
              </svg>
            )}
            {loading ? "Logging..." : "Login"}
          </button>
        </form>
        <div className=" text-center">
          <CustomText variant="paragraph" className="text-sm">
            Don’t have an account?
            <Link
              to="/vendorSignup"
              className="font-bold text-primary hover:underline"
            >
              Sign Up
            </Link>
          </CustomText>
        </div>
      </div>
    </div>
  );
}
