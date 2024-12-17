import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../redux/apiSlice.auth";
import { useForm } from "react-hook-form"; // React Hook Form
import { toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

export default function Signup() {
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
    <div className="min-h-screen flex items-center bg-ivory justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md"
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
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
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
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
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
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label
            className="block text-sageGreen-dark text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
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

        {/* Buttons */}
        <div className="flex items-center justify-between">
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
        </div>

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
  );
}
