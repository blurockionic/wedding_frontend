import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSubmitPartnerFormMutation } from "../redux/partnerFormSlice";
import { useForm } from "react-hook-form";
import { TfiEmail } from "react-icons/tfi";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

import partnerBgImage from "../../public/partner_bg_image.png";
import formBackground from "../../public/form_background.png";
import mainLogo from "../../public/main_logo.png";
import { toast } from "react-toastify";
import LocationSelector from "./vendorDashboard/component/LocationSelector";

// Main component
export default function VendorApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);

  // Add validation schema
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      state: "",
      city: "",
      role: "",
      otherRole: "",
      experience: "",
      workedOnWeddings: "",
      portfolio: "",
      governmentId: null,
      businessCertificate: null,
      workSamples: [],
      whyPartner: "",
      workingModel: "",
      availability: "",
      noLeadLeakage: false,
      platformDeals: false,
      ndaAgreement: false,
    },
  });

  // Watch role field for conditional validation
  const selectedRole = watch("role");

  // Add validation rules to form fields
  const registerOptions = {
    fullName: {
      required: "Full name is required",
      minLength: {
        value: 3,
        message: "Name must be at least 3 characters long",
      },
      pattern: {
        value: /^[a-zA-Z\s]*$/,
        message: "Name can only contain letters and spaces",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    phoneNumber: {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Please enter a valid 10-digit phone number",
      },
    },

    role: {
      required: "Please select your role",
    },
    otherRole: {
      required: selectedRole === "Other" ? "Please specify your role" : false,
    },
    experience: {
      required: "Please select your experience level",
    },
    workedOnWeddings: {
      required: "Please indicate if you have worked on weddings",
    },
    portfolio: {
      pattern: {
        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        message: "Please enter a valid URL",
      },
    },
    governmentId: {
      required: "Government ID is required",
      validate: {
        fileSize: (value) => {
          const file = value[0];
          return (
            !file || file.size <= 10000000 || "File size must be less than 10MB"
          );
        },
        fileType: (value) => {
          const file = value[0];
          const validTypes = ["image/jpeg", "image/png", "application/pdf"];
          return (
            !file ||
            validTypes.includes(file.type) ||
            "File must be JPG, PNG, or PDF"
          );
        },
      },
    },
    whyPartner: {
      required: "Please tell us why you want to partner with us",
      minLength: {
        value: 50,
        message:
          "Please provide a more detailed response (minimum 50 characters)",
      },
    },
    workingModel: {
      required: "Please select your preferred working model",
    },
    availability: {
      required: "Please select your availability",
    },
  };

  // RTK Query mutation hook
  const [submitPartnerForm, { isLoading, isSuccess, isError, error }] =
    useSubmitPartnerFormMutation();

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      if (name === "workSamples") {
        setFormData({
          ...formData,
          [name]: [...formData.workSamples, ...files],
        });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };


  const selectedStateCode = watch("state");
  const selectedCity = watch("city");



  const onSubmit = async (data) => {
    try {
      // Validate all fields before submission
      const isValid = await trigger();
      if (!isValid) {
        toast.error("Please fix the validation errors before submitting");
        return;
      }

      const formDataToSubmit = new FormData();

      // Add validated data to FormData
      Object.keys(data).forEach((key) => {
        if (
          key !== "governmentId" &&
          key !== "businessCertificate" &&
          key !== "workSamples"
        ) {
          formDataToSubmit.append(key, data[key]);
        }
      });

      // Handle file uploads with validation
      if (data.governmentId?.[0]) {
        formDataToSubmit.append("governmentId", data.governmentId[0]);
      }

      if (data.businessCertificate?.[0]) {
        formDataToSubmit.append(
          "businessCertificate",
          data.businessCertificate[0]
        );
      }

      if (data.workSamples?.length) {
        Array.from(data.workSamples).forEach((file, index) => {
          formDataToSubmit.append(`workSample_${index}`, file);
        });
      }

      const response = await submitPartnerForm(formDataToSubmit).unwrap();

      if (response.success) {
        toast.success("Application submitted successfully!");
        
        reset()
        
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  // Add error display component
  const ErrorMessage = ({ error }) => {
    return error ? (
      <span className="text-red-500 text-xs mt-1">{error.message}</span>
    ) : null;
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Background Div */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gray-300 z-10"
      style={{
          backgroundImage: `url(${partnerBgImage})`, // Replace with your top image path
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Bottom Background Div */}
      <div className="absolute bottom-0 left-0 w-full h-[90vh] bg-yellow-50 z-0" 
        style={{
          backgroundImage: `url(${formBackground})`, // Replace with your top image path
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Logo and Marriage Vendors Text */}
      <div className="relative z-10 flex flex-col items-center pt-6">
        {/* Logo Div */}
        <div className="w-[120px] h-[120px] rounded-lg flex items-center justify-center mb-2"
          style={{
          backgroundImage: `url(${mainLogo})`, // Replace with your top image path
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        >
        </div>
        {/* Marriage Vendors Text */}
        <h1 className="text-3xl font-semibold text-white">Marriage Vendors</h1>
      </div>
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <motion.div
          className="bg-white shadow-xl rounded-lg p-6 mb-8"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-semibold text-gray-900 mb-6">
                    Partner Application
                  </h1>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex items-center w-[130px]">
                        {/* Circle for each step */}
                        <motion.div
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px]  ${
                            currentStep >= step ? "bg-[#F20574]" : "bg-gray-300"
                          }`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: currentStep === step ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {step}
                        </motion.div>
                        {/* Line connecting circles, no line after the last step */}
                        {step < 6 && (
                          <div
                            className={`h-1 w-[120px] rounded ${
                              currentStep >= step ? "bg-pink-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <h2 className="text-[26px] font-semibold mb-6 text-gray-900">
                  Basic Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name 
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        {...register("fullName", registerOptions.fullName)}
                        required
                        placeholder="Enter your Name"
                        className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500 placeholder-gray-400"
                      />
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <IoPerson className="text-pink-500 text-lg"/>
                      </span>
                    </div>
                    <ErrorMessage error={errors.fullName} />
                  </div>

                  <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email 
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      {...register("email", registerOptions.email)}
                      required
                      placeholder="Enter your email"
                      className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500 placeholder-gray-400"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <TfiEmail className="text-pink-500 text-lg"/>
                    </span>
                  </div>
                  <ErrorMessage error={errors.email} />
                  </div>

                  <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                      <input
                      type="tel"
                      name="phoneNumber"
                      {...register("phoneNumber", registerOptions.phoneNumber)}
                      required
                      placeholder="Enter your Mobile No."
                      className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500 placeholder-gray-400"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaPhone className="text-pink-500 text-lg"/>
                    </span>
                  </div>
                  <ErrorMessage error={errors.phoneNumber} />
                  </div>
                  <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      {...register("state")}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500"
                    >
                      <option value="">Select your State</option>
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <select
                    name="city"
                      {...register("city")}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500"
                    >
                      <option value="">Select your city</option>
                    </select>
                  </div>
                  </div>

                  <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Role
                  </label>
                  <select
                    name="role"
                    {...register("role", registerOptions.role)}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500"
                  >
                    <option value="">Select your role</option>
                    <option value="Event Planner">Event Planner</option>
                    <option value="Vendor – Photographer">Vendor – Photographer</option>
                    <option value="Vendor – Decorator">Vendor – Decorator</option>
                    <option value="Vendor – Caterer">Vendor – Caterer</option>
                    <option value="Vendor – Makeup Artist">Vendor – Makeup Artist</option>
                    <option value="Other">Other</option>
                  </select>
                  <ErrorMessage error={errors.role} />
                </div>

                {selectedRole === "Other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specify Role
                    </label>
                    <input
                      type="text"
                      name="otherRole"
                      {...register("otherRole", registerOptions.otherRole)}
                      required
                      placeholder="Specify your role"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500 placeholder-gray-400"
                    />
                    <ErrorMessage error={errors.otherRole} />
                  </div>
                )}
              </div>
            </motion.div>
          )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6">
                  Partner Application
                </h1>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center w-[130px]">
                      <motion.div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] ${
                          currentStep >= step ? "bg-[#F20574]" : "bg-gray-300"
                        }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: currentStep === step ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step}
                      </motion.div>
                      {step < 6 && (
                        <div
                          className={`h-1 w-[120px] rounded ${
                            currentStep >= step ? "bg-pink-500" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
                <h2 className="text-[26px] font-semibold mb-6 text-gray-900">
                  Experience & Background
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-3">
                      How many years of experience do you have?{" "}
                      <span className="text-gray-700">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["0–1 year", "1–3 years", "3–5 years", "5+ years"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="experience"
                              {...register(
                                "experience",
                                registerOptions.experience
                              )}
                              value={option}
                              className="mr-2 text-pink-500 focus:ring-pink-400"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        )
                      )}
                    </div>
                    <ErrorMessage error={errors.experience} />
                  </div>

                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-3">
                      Have you worked on weddings before?{" "}
                      <span className="text-gray-700">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Yes", "No"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="workedOnWeddings"
                            {...register(
                              "workedOnWeddings",
                              registerOptions.workedOnWeddings
                            )}
                            value={option}
                            className="mr-2 text-pink-500 focus:ring-pink-400"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage error={errors.workedOnWeddings} />
                  </div>

                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-1">
                      Share your portfolio or website (if any)
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      {...register("portfolio", registerOptions.portfolio)}
                      placeholder="https://"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-500 placeholder-gray-400"
                    />
                    <ErrorMessage error={errors.portfolio} />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6">
                  Partner Application
                </h1>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center w-[130px]">
                      <motion.div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] ${
                          currentStep >= step ? "bg-[#F20574]" : "bg-gray-300"
                        }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: currentStep === step ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step}
                      </motion.div>
                      {step < 6 && (
                        <div
                          className={`h-1 w-[120px] rounded ${
                            currentStep >= step ? "bg-pink-500" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
                <h2 className="text-[26px] font-semibold mb-6 text-gray-900 pb-2">
                  Upload Documents
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-1">
                      Upload your Government ID (Aadhar, PAN, etc.){" "}
                      <span className="text-gray-700">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-pink-500 rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              id="government-id-upload"
                              name="governmentId"
                              type="file"
                              {...register(
                                "governmentId",
                                registerOptions.governmentId
                              )}
                              className="sr-only"
                              required
                            />
                          </label>
                          <p className="pl-1 text-gray-900">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                    <ErrorMessage error={errors.governmentId} />
                  </div>

                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-1">
                      Upload Business Certificate / GST (if available)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-pink-500 rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              id="business-certificate-upload"
                              name="businessCertificate"
                              type="file"
                              {...register("businessCertificate")}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1 text-gray-900">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                    <ErrorMessage error={errors.businessCertificate} />
                  </div>

                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-1">
                      Upload any past work photos / sample projects
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-pink-500 rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
                            <span>Upload files</span>
                            <input
                              id="work-samples-upload"
                              name="workSamples"
                              type="file"
                              multiple
                              {...register("workSamples")}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1 text-gray-900">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Multiple PNG, JPG files up to 10MB each
                        </p>
                      </div>
                    </div>
                    <ErrorMessage error={errors.workSamples} />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6">
                  Partner Application
                </h1>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center w-[130px]">
                      <motion.div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] ${
                          currentStep >= step ? "bg-[#F20574]" : "bg-gray-300"
                        }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: currentStep === step ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step}
                      </motion.div>
                      {step < 6 && (
                        <div
                          className={`h-1 w-[120px] rounded ${
                            currentStep >= step ? "bg-pink-500" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
                <h2 className="text-[26px] font-semibold mb-6 text-gray-900 pb-2">
                  💬 Additional Info
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-1">
                      Why do you want to partner with MarriageVendors.com?{" "}
                      <span className="text-gray-700">*</span>
                    </label>
                    <textarea
                      name="whyPartner"
                      {...register("whyPartner", registerOptions.whyPartner)}
                      rows="4"
                      required
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                    ></textarea>
                    <ErrorMessage error={errors.whyPartner} />
                  </div>

                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-3">
                      Preferred working model{" "}
                      <span className="text-gray-700">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        "Salary + Incentives (Only for Planners)",
                        "Commission-based",
                        "Open to Both",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:bg-yellow-50 h-[55px] w-[210px]"
                        >
                          <input
                            type="radio"
                            name="workingModel"
                            {...register(
                              "workingModel",
                              registerOptions.workingModel
                            )}
                            value={option}
                            className="mr-2 text-pink-500 focus:ring-pink-400 bg-gray-200 w-3 h-3"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage error={errors.workingModel} />
                  </div>

                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-3">
                      Availability <span className="text-gray-700">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["Full Time", "Part Time", "Project Based"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex items-center p-3 border-2 border-gray-200 rounded-md cursor-pointer hover:bg-yellow-50 w-[210px]"
                          >
                            <input
                              type="radio"
                              name="availability"
                              {...register(
                                "availability",
                                registerOptions.availability
                              )}
                              value={option}
                              className="mr-2 text-pink-500 focus:ring-pink-400 bg-gray-200 w-3 h-3"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        )
                      )}
                    </div>
                    <ErrorMessage error={errors.availability} />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6">
                  Partner Application
                </h1>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center w-[130px]">
                      <motion.div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] ${
                          currentStep >= step ? "bg-[#F20574]" : "bg-gray-300"
                        }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: currentStep === step ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step}
                      </motion.div>
                      {step < 6 && (
                        <div
                          className={`h-1 w-[120px] rounded ${
                            currentStep >= step ? "bg-pink-500" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
                <h2 className="text-[26px] font-semibold mb-6 text-gray-900 pb-2">
                  ✅ Declarations & Agreement
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="noLeadLeakage"
                        name="noLeadLeakage"
                        type="checkbox"
                        {...register("noLeadLeakage")}
                        required
                        className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded-sm bg-gray-200"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="noLeadLeakage"
                        className="font-medium text-gray-700"
                      >
                        I agree to follow the no lead leakage policy of
                        MarriageVendors.com
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="platformDeals"
                        name="platformDeals"
                        type="checkbox"
                        {...register("platformDeals")}
                        required
                        className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded-sm bg-gray-200"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="platformDeals"
                        className="font-medium text-gray-700"
                      >
                        I understand all deals must go through the platform and
                        not directly with clients
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="ndaAgreement"
                        name="ndaAgreement"
                        type="checkbox"
                        {...register("ndaAgreement")}
                        required
                        className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded-sm bg-gray-200"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="ndaAgreement"
                        className="font-medium text-gray-700"
                      >
                        I am ready to sign a NDA & Service Agreement if selected
                      </label>
                    </div>
                  </div>
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="mt-6 bg-[#FAE5CA] p-4 rounded-md w-10/12">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-md font-semibold text-yellow-800">
                          Important Notice
                        </h3>
                        <div className="mt-2 text-xs text-yellow-700">
                          <p>
                            By submitting this application, you confirm that all
                            information provided is accurate and complete. Our
                            team will review your application and contact you
                            within 24-48 hours if shortlisted.
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 h-9 border bg-gray-200 rounded font-semibold text-gray-500 ms-[55%]"
                >
                  Back
                </motion.button>
              )}

              {currentStep < 5 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto px-4 py-2 bg-[#F20574] text-white rounded w-[140px] font-semibold h-[40px]"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto px-4 h-9 bg-[#F20574] text-white font-medium rounded-md hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Submit Application
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
