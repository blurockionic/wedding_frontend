import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { useLoginMutation } from "../../redux/apiSlice.auth";
import loginImage from "../../../public/login/login.jpg";
import CustomButton from "../../components/global/button/CustomButton";
import CustomText from "../../components/global/text/CustomText";
import { FaEye, FaEyeSlash, FaGoogle, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoEye, GoEyeClosed, GoLock, GoMail } from "react-icons/go";

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginMutation] = useLoginMutation();
  const [isShowPassWord, setIsShowPassword] = useState(false);

  useAuthRedirect("/", true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const result = await loginMutation({ email, password }).unwrap();

      if (result.user) {
        dispatch(login({ user: result }));
        reset();
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
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

  const handleGoogleLogin = () => {
    toast.info("Google login is not yet implemented.", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex items-center justify-center space-x-10">
        {/* Image Section */}
        <div className="hidden md:block w-3/4">
          <img
            src={loginImage}
            className="h-[600px] w-full object-cover object-center rounded-lg"
            alt="Login Illustration"
          />
        </div>

        {/* Form Section */}
        <div className="h-[600px] sm:bg-white bg-transparent sm:shadow-md rounded-lg sm:px-8 px-4 py-10 w-full space-y-6">
          <CustomText
            variant="heading"
            className="text-3xl font-bold text-black"
          >
            Welcome to Wedd
          </CustomText>
          <CustomText variant="paragraph" className="text-sm text-gray-600">
            Enter your credentials to access your account
          </CustomText>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email Input */}
            <div className="my-4">
              <CustomText
                variant="label"
                className="block text-sageGreen-dark text-sm font-bold mb-2"
              >
                Email
              </CustomText>
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
                  placeholder="Enter your email"
                  className="w-full px-10 py-2  border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <CustomText variant="error" className="text-red-500 text-xs">
                    {errors.email.message}
                  </CustomText>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <CustomText
                variant="label"
                className="block text-sageGreen-dark text-sm font-bold mb-2"
              >
                Password
              </CustomText>
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
                  placeholder="Enter your password"
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
              </div>
              {errors.password && (
                <CustomText variant="error" className="text-red-500 text-xs">
                  {errors.password.message}
                </CustomText>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sageGreen-dark text-sm">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="mr-2"
                />
                Remember Me
              </label>
              <Link
                to={"/forgotPassword"}
                className="font-bold text-sm text-sageGreen-light hover:text-sageGreen-dark"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Buttons */}
            <div className="flex flex-col items-center justify-center w-full">
              <button
                type="submit"
                disabled={loading || !isValid}
                className={`w-full ${
                  loading ? "bg-gray-300" : "bg-dustyRose-dark"
                } disabled:cursor-not-allowed cursor-pointer disabled:bg-dustyRose-light border-2 border-dustyRose-dark hover:bg-dustyRose text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light transition`}
              >
                {loading ? (
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
                    Logging in...
                  </span>
                ) : (
                  <span>Login</span>
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
                onClick={handleGoogleLogin}
                // style={{ paddingTop: "10px" }}
                leftIcon={<FaGoogle size={20} className="text-red-500" />}
                className="w-full mt-4 py-2 bg-white text-red-600 border-2 border-sageGreen-dark hover:bg-sageGreen-light hover:text-white"
              />
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <CustomText variant="paragraph" className="text-sm">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-dustyRose-dark hover:underline"
              >
                Sign Up
              </Link>
            </CustomText>
          </div>
        </div>
      </div>
    </div>
  );
}
