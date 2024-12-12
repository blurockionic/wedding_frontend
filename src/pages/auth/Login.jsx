import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useAuthRedirect("/");

  // Initialize react-hook-form
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
      const response = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log(result);
      

      if (!response.ok) {
        toast.error(result.message || result.errors[0].message|| "Login failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
        return;
      }

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
      toast.error(error.message || "An unexpected error occurred.", {
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
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="flex items-center justify-center space-x-10 w-full max-w-4xl">
        <div className="hidden relative md:block">
          <div className="absolute bg-slate-600/70"></div>
          <img
            src="/login.png"
            width={350}
            className="h-full object-cover"
            alt="Login Illustration"
          />
        </div>
        <div className="sm:bg-white bg-transparent sm:shadow-md rounded-lg sm:px-8 px-4 py-10 w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-black">Welcome Back</h2>
          <p className="text-sm text-gray-600">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Input */}
            <div className="my-4">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
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
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                className="block text-sageGreen-dark text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
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
                className="font-bold text-sm text-sageGreen-dark hover:text-sageGreen-light"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login and Google Login Buttons */}
            <div className="flex items-center justify-between space-x-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center bg-white text-sageGreen-dark border-2 border-sageGreen-dark py-2 px-4 rounded font-bold hover:bg-sageGreen-light hover:text-white transition w-1/2"
              >
                <span className="md:block hidden">Login with </span> Google
              </button>
              <button
                type="submit"
                disabled={loading || !isValid}
                className={`w-1/2 ${
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
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-dustyRose-dark hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
