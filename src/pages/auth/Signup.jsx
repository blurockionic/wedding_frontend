import { Link } from "react-router-dom";
import { useSignupMutation } from "../../redux/apiSlice.auth";
import { useForm } from "react-hook-form"; // React Hook Form
import { toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import loginImage from "../../../public/signup/signup.jpg";
import CustomText from "../../components/global/text/CustomText";
import { useState } from "react";
import {
  GoCalendar,
  GoChevronDown,
  GoDeviceMobile,
  GoEye,
  GoEyeClosed,
  GoLocation,
  GoLock,
  GoMail,
  GoMegaphone,
  GoPerson,
} from "react-icons/go";
import CustomButton from "../../components/global/button/CustomButton";
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
  const [isShowPassWord, setIsShowPassword] = useState(false);
  const [isShowPassWordCon, setIsShowPasswordCon] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data) => {
    const { email, password, confirmPassword, username } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await signup({ email, password, username }).unwrap();
      toast.success("Signup successful!");
      console.log("Signup response:", response);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        `Signup failed: ${error?.data?.message || "Something went wrong"}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center  justify-center py-10 ">
      <div className="w-[60%] flex justify-center items-center gap-x-10">
        {/* Image Section */}
        <div className="hidden md:block w-3/4">
          <img
            src={loginImage}
            className="h-[835px] w-full object-cover object-center rounded-tl-lg rounded-bl-lg"
            alt="Login Illustration"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md px-8 py-10 w-full rounded-tl-lg rounded-bl-lg-"
        >
          <h2 className="text-2xl font-bold text-black">Create Your Account</h2>
          <p className="text-sm text-sageGreen-dark">
            Enter your details to create a new account
          </p>

          {/* Username Field */}
          <div className="my-4">
            <label
              className="block text-sageGreen-dark text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>

            <div className="relative gap-3">
              <span className="absolute left-3 top-3 cursor-pointer ">
                <GoPerson size={19} className="text-gray-500" />
              </span>
              <input
                type="email"
                id="username"
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Username"
                className="w-full px-10 py-2  border border-gray-300 rounded-md"
              />
              {errors.email && (
                <CustomText variant="error" className="text-red-500 text-xs">
                  {errors.email.message}
                </CustomText>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="my-4">
            <label
              className="block text-sageGreen-dark text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative gap-3">
              <span className="absolute left-3 top-3 cursor-pointer ">
                <GoMail size={19} className="text-gray-500" />
              </span>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                className="w-full px-10 py-2  border border-gray-300 rounded-md"
              />
              {errors.email && (
                <CustomText variant="error" className="text-red-500 text-xs">
                  {errors.email.message}
                </CustomText>
              )}
            </div>
          </div>

          {/* password section  */}
          <div className="flex items-center justify-between gap-x-3">
            {/* Password Field */}
            <div className="mb-6 w-full">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>

              <div className="relative gap-3">
                <span className="absolute left-3 top-3 cursor-pointer ">
                  <GoLock size={19} className="text-gray-500" />
                </span>
                <input
                  type={isShowPassWord ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Password"
                  className="w-full  px-10 py-2 border border-gray-300 rounded-md"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setIsShowPassword(!isShowPassWord)}
                >
                  {isShowPassWord ? (
                    <GoEye size={20} className="text-gray-500" />
                  ) : (
                    <GoEyeClosed size={20} className="text-gray-500" />
                  )}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6 w-full">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>

              <div className="relative gap-3">
                <span className="absolute left-3 top-3 cursor-pointer ">
                  <GoLock size={19} className="text-gray-500" />
                </span>
                <input
                  type={isShowPassWordCon ? "text" : "password"}
                  id="password"
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                    minLength: {
                      value: 6,
                      message: "confirmPassword must be at least 6 characters",
                    },
                  })}
                  placeholder="Confirm Password"
                  className="w-full  px-10 py-2 border border-gray-300 rounded-md"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setIsShowPasswordCon(!isShowPassWordCon)}
                >
                  {isShowPassWordCon ? (
                    <GoEye size={20} className="text-gray-500" />
                  ) : (
                    <GoEyeClosed size={20} className="text-gray-500" />
                  )}
                </span>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Event information  */}
          <div className="flex items-center justify-between gap-x-3">
            {/* Event Location Field */}
            <div className="mb-6 w-full">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="eventLocation"
              >
                Event Location
              </label>

              <div className="relative gap-3">
                <span className="absolute left-3 top-3 cursor-pointer ">
                  <GoLocation size={19} className="text-gray-500" />
                </span>
                <input
                  type={"text"}
                  id="eventLocation"
                  {...register("eventLocation", {
                    required: "Event Location is required",
                    minLength: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Event location must be at least 6 characters",
                    },
                  })}
                  placeholder="Event Location"
                  className="w-full  px-10 py-2 border border-gray-300 rounded-md"
                />
                {errors.eventLocation && (
                  <p className="text-red-500 text-sm">
                    {errors.eventLocation.message}
                  </p>
                )}
              </div>
            </div>

            {/* coutary */}
            <div className="mb-6 w-full">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>

              <div className="relative gap-3">
                <input
                  type={"text"}
                  id="country"
                  {...register("country", {
                    required: "country is required",
                    minLength: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "country must be at least 6 characters",
                    },
                  })}
                  placeholder="Country"
                  className="w-full pl-5  pr-10 py-2 border border-gray-300 rounded-md"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  // onClick={() => handleDropDown(!isShowPassWordCon)}
                >
                  <GoChevronDown size={20} className="text-gray-500" />
                </span>
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-3">
            {/* Event date Field */}
            <div className="mb-6 w-full">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="eventDate"
              >
                Event Date
              </label>

              <div className="relative gap-3">
                <input
                  type={"date"}
                  id="eventDate"
                  {...register("eventDate", {
                    required: "Event date Location is required",
                    minLength: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Event date must be at least 6 characters",
                    },
                  })}
                  placeholder="Event Date"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  // onClick={() => handleDropDown(!isShowPassWordCon)}
                >
                  <GoCalendar size={20} className="text-gray-500" />
                </span>
                {errors.eventDate && (
                  <p className="text-red-500 text-sm">
                    {errors.eventDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* coutary */}
            <div className="mb-6 w-full">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="phoneNumer"
              >
                Phone Number
              </label>

              <div className="relative gap-3">
                <input
                  type={"text"}
                  id="phoneNumer"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    minLength: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Phone number must be at least 6 characters",
                    },
                  })}
                  placeholder="Phone Number"
                  className="w-full pl-5  pr-10 py-2 border border-gray-300 rounded-md"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  // onClick={() => handleDropDown(!isShowPassWordCon)}
                >
                  <GoDeviceMobile size={20} className="text-gray-500" />
                </span>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sageGreen-dark text-sm">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="mr-2"
              />
              Remember Me
            </label>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-gray-300" : "bg-dustyRose-dark"
              } disabled:cursor-not-allowed cursor-pointer disabled:bg-dustyRose-light border-2 border-dustyRose-dark hover:bg-dustyRose text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light transition`}
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

            <div className="mt-4 flex items-center justify-between w-full gap-x-5">
              <div className="h-[1px] px-3 w-full bg-gray-300"></div>
              <span>or</span>
              <div className="h-[1px] px-3 w-full bg-gray-300"></div>
            </div>

            <CustomButton
              type="button"
              text="Login with Google"
              // onClick={handleGoogleLogin}
              leftIcon={<FaGoogle size={20} className="text-red-500" />}
              className="w-full mt-4 bg-white text-red-600 border-2 border-sageGreen-dark hover:bg-sageGreen-light hover:text-white"
            />
          </div>

          {/* Buttons */}
          {/* <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center justify-center bg-white text-sageGreen-dark border-2 border-sageGreen-dark py-2 px-4 rounded font-bold hover:bg-sageGreen-light hover:text-white transition w-1/2 mr-2"
            >
              Google Sign Up
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 ${
                isLoading
                  ? "bg-gray-400"
                  : "bg-dustyRose-dark hover:bg-dustyRose"
              } border-2 border-dustyRose-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light transition`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div> */}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-dustyRose-dark hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
