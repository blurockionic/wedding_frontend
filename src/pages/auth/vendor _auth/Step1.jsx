import React from "react";
import { useFormContext } from "react-hook-form";

function Step1() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Personal Information</h2>

      <div className="grid gap-6">
        {/* Name Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your full name"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
            })}
            placeholder="your_email@example.com"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: { value: /^[0-9]+$/, message: "Phone number must be numeric" },
              minLength: { value: 10, message: "Phone number must be at least 10 digits" },
            })}
            placeholder="Enter your phone number"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          />
          {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters long" },
            })}
            placeholder="Enter a strong 6 length password"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Step1;