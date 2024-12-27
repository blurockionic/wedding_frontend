import React from "react";
import { useForm } from "react-hook-form";
import { BiPhone } from "react-icons/bi";
import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import StyledBtn from "../components/StyledBtn";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = React.useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Form Data:", data);
      setLoading(false); // Reset the loading state
      reset(); // Reset the form after submission
    }, 2000); // Mock submission delay
  };

  return (
    <div
      className="flex flex-col md:flex-row gap-8 bg-ivory p-6 md:py-32 md:px-40 relative"
      data-aos="fade-in"
      data-aos-delay="200"
    >
      {/* Left Section */}
      <div className="flex flex-col" data-aos="fade-down" data-aos-delay="500">
        <h2 className="lg:text-4xl text-2xl font-bold mb-4 capitalize">Book For an Appointment</h2>
        <p className="mb-4 text-gray-600" data-aos="fade-up" data-aos-delay="700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Sed dapibus placerat velit. Donec in porttitor elit. Suspendisse
          accumsan iaculis tincidunt.
        </p>

        <h5 className="text-lg font-semibold mb-3">Our Info</h5>
        <div className="space-y-2">
          <p data-aos="fade-up" data-aos-delay="900">
            <BiPhone className="inline mr-2" /> Phone: 123-456-7890
          </p>
          <p data-aos="fade-up" data-aos-delay="1100">
            <MdEmail className="inline mr-2" /> Email: info@example.com
          </p>
          <p data-aos="fade-up" data-aos-delay="1300">
            <FaAddressBook className="inline mr-2" /> Address: 123 Main St,
            City, State, Zip
          </p>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="relative p-5 w-full mx-auto justify-center md:w-1/2">
        {/* Outer Box with the Red Box */}
        <div
          data-aos="fade-left"
          data-aos-delay="1000"
          className="absolute top-10 bottom-0 left-10 right-0 border-4 border-[#CF7745]"
        ></div>

        {/* Black Box Container */}
        <div
          data-aos="fade-right"
          data-aos-delay="1000"
          className="border-4 top-0 bottom-10 left-0 right-10 border-black absolute inset-0"
        ></div>

        {/* Gray Box with the Form */}
        <div
          data-aos="zoom-in"
          data-aos-delay="1000"
          className="bg-gray-100 w-full relative z-10 p-6 shadow-lg shadow-black h-fit items-center"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>

            {/* Name Field */}
            <div className="w-full" data-aos="fade-up" data-aos-delay="1100">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border-b-2 border-black px-3 bg-transparent py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="w-full" data-aos="fade-up" data-aos-delay="1300">
              <input
                type="text"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                className="w-full border-b-2 border-black px-3 py-2 bg-transparent focus:outline-none focus:border-blue-500"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div data-aos="fade-up" data-aos-delay="1500">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full border-b-2 border-black px-3 py-2 bg-transparent focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Message Field */}
            <div data-aos="fade-up" data-aos-delay="1700">
              <textarea
                {...register("message", { required: "Message is required" })}
                className="w-full bg-transparent border-b-2 border-black px-3 py-2 focus:outline-none focus:border-blue-500 h-24"
                placeholder="Write your message"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div
              className="inline-block"
              data-aos="fade-up"
              data-aos-delay="1900"
            >
              <StyledBtn
                title={loading ? "Submitting..." : "Submit"}
                disabled={loading}
                className={`${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                } transition-opacity`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
