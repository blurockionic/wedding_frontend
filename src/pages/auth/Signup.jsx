import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/apiSlice.auth";
import { useForm } from "react-hook-form"; // React Hook Form
import { toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import loginImage from "../../../public/signup/signup.jpg";
import { useState } from "react";
import { GoDeviceMobile, GoLocation, GoMail, GoPerson } from "react-icons/go";
import CustomButton from "../../components/global/button/CustomButton";
import { PasswordField } from "../../components/global/inputfield/PasswordField";
import { InputField } from "../../components/global/inputfield/InputField";
import { userSchema } from "../../validationSchema/userRegistrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordCon, setIsShowPasswordCon] = useState(false);
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data) => {
    const {
      email,
      password,
      confirmPassword,
      username,
      phone_number,
      wedding_date,
      wedding_location,
    } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await signup({
        email,
        password,
        user_name: username,
        phone_number,
        wedding_date: new Date(wedding_date).toISOString(),
        wedding_location,
      }).unwrap();
      toast.success(response.message);
      console.log("Signup response:", response);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        `Signup failed: ${error?.data?.message || "Something went wrong"}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:py-10">
      <div className="md:w-[60%] w-[90%] flex justify-center items-center gap-x-10">
        {/* Image Section */}
        <div className="hidden md:block md:w-3/4">
          <img
            src={loginImage}
            alt="Signup Illustration"
            className="h-[700px] w-full object-cover rounded-tl-lg rounded-bl-lg"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md w-full p-5 md:px-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold text-black mb-6">
            Fill details to create a new account
          </h2>

          {/* Username */}
          <InputField
            id="username"
            type="text"
            label="Username"
            register={register}
            error={errors.username}
            icon={<GoPerson size={19} className="text-gray-500" />}
            placeholder="Username"
          />

          {/* Email */}
          <InputField
            id="email"
            type="email"
            label="Email"
            register={register}
            error={errors.email}
            icon={<GoMail size={19} className="text-gray-500" />}
            placeholder="Email"
          />

          {/* Password Fields */}
          <div className="flex items-center justify-between gap-x-3">
            <PasswordField
              label="Password"
              id="password"
              register={register}
              isShow={isShowPassword}
              setIsShow={setIsShowPassword}
              error={errors.password}
            />
            <PasswordField
              label="Confirm Password"
              id="confirmPassword"
              register={register}
              isShow={isShowPasswordCon}
              setIsShow={setIsShowPasswordCon}
              error={errors.confirmPassword}
            />
          </div>

          {/* Location and Phone */}
          <div className="flex items-center justify-between gap-x-3">
            <InputField
              id="wedding_location"
              type="text"
              label="Event Location"
              register={register}
              error={errors.wedding_location}
              icon={<GoLocation size={19} className="text-gray-500" />}
              placeholder="Event Location"
            />
            <InputField
              id="phone_number"
              type="text"
              label="Phone Number"
              register={register}
              error={errors.phone_number}
              icon={<GoDeviceMobile size={20} className="text-gray-500" />}
              placeholder="Phone Number"
            />
          </div>

          {/* Event Date */}
          <div className="mb-6 w-full">
            <label
              htmlFor="wedding_date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Event Date
            </label>
            <div className="relative gap-3">
              <input
                type="date"
                id="wedding_date"
                {...register("wedding_date")}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md"
              />
              {errors.wedding_date && (
                <p className="text-red-500 text-sm">
                  {errors.wedding_date.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center justify-center w-full">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-primary-300" : "bg-primary"
              } disabled:cursor-not-allowed cursor-pointer disabled:bg-muted border-2  text-foreground font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light transition`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Please wait...
                </span>
              ) : (
                <span>Sign up</span>
              )}
            </button>

            <CustomButton
              type="button"
              text="Login with Google"
              // onClick={handleGoogleLogin}
              leftIcon={<FaGoogle size={20} className="text-red-500" />}
              className="w-full mt-4 py-2 bg-white text-red-600 border-2 border-sageGreen-dark hover:bg-sageGreen-light hover:text-white"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link to="/login" className="text-dustyRose-dark font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
