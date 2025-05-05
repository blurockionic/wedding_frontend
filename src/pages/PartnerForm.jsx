import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSubmitPartnerFormMutation } from "../redux/partnerFormSlice";
import { useForm } from "react-hook-form";


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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Partner Application - MarriageVendors.com
          </h1>
          <div className="mt-4 flex justify-center items-center space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <motion.div
                key={step}
                className={`h-2 w-16 rounded-full ${
                  currentStep >= step ? "bg-pink-400" : "bg-yellow-200"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: currentStep === step ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">Step {currentStep} of 5</p>
        </div>

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
                <h2 className="text-xl font-semibold mb-6 text-pink-600 border-b border-yellow-200 pb-2">
                  👤 Basic Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      {...register("fullName", registerOptions.fullName)}
                      required
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <ErrorMessage error={errors.fullName} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      {...register("email", registerOptions.email)}
                      required
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <ErrorMessage error={errors.email} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (WhatsApp preferred){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      {...register("phoneNumber", registerOptions.phoneNumber)}
                      required
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <ErrorMessage error={errors.phoneNumber} />
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="  w-full px-3  border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300">
                    <LocationSelector
                      selectedStateCode={selectedStateCode}
                      selectedCity={selectedCity}
                      setValue={setValue}
                      errors={errors}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      {...register("role", registerOptions.role)}
                      required
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                      <option value="">Select your role</option>
                      <option value="Event Planner">Event Planner</option>
                      <option value="Vendor – Photographer">
                        Vendor – Photographer
                      </option>
                      <option value="Vendor – Decorator">
                        Vendor – Decorator
                      </option>
                      <option value="Vendor – Caterer">Vendor – Caterer</option>
                      <option value="Vendor – Makeup Artist">
                        Vendor – Makeup Artist
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    <ErrorMessage error={errors.role} />
                  </div>

                  {selectedRole === "Other" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specify Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="otherRole"
                        {...register("otherRole", registerOptions.otherRole)}
                        required
                        className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                <h2 className="text-xl font-semibold mb-6 text-pink-600 border-b border-yellow-200 pb-2">
                  🧳 Experience & Background
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How many years of experience do you have?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["0–1 year", "1–3 years", "3–5 years", "5+ years"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex items-center p-3 border border-yellow-200 rounded-md cursor-pointer hover:bg-yellow-50"
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
                            <span>{option}</span>
                          </label>
                        )
                      )}
                    </div>
                    <ErrorMessage error={errors.experience} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Have you worked on weddings before?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Yes", "No"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center p-3 border border-yellow-200 rounded-md cursor-pointer hover:bg-yellow-50"
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
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage error={errors.workedOnWeddings} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Share your portfolio or website (if any)
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      {...register("portfolio", registerOptions.portfolio)}
                      placeholder="https://"
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                <h2 className="text-xl font-semibold mb-6 text-pink-600 border-b border-yellow-200 pb-2">
                  📸 Upload Documents
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload your Government ID (Aadhar, PAN, etc.){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-yellow-300 rounded-md">
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
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                    <ErrorMessage error={errors.governmentId} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Business Certificate / GST (if available)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-yellow-300 rounded-md">
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
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                    <ErrorMessage error={errors.businessCertificate} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload any past work photos / sample projects
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-yellow-300 rounded-md">
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
                          <p className="pl-1">or drag and drop</p>
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
                <h2 className="text-xl font-semibold mb-6 text-pink-600 border-b border-yellow-200 pb-2">
                  💬 Additional Info
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Why do you want to partner with MarriageVendors.com?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="whyPartner"
                      {...register("whyPartner", registerOptions.whyPartner)}
                      rows="4"
                      required
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                    ></textarea>
                    <ErrorMessage error={errors.whyPartner} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred working model{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        "Salary + Incentives (Only for Planners)",
                        "Commission-based",
                        "Open to Both",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex items-center p-3 border border-yellow-200 rounded-md cursor-pointer hover:bg-yellow-50"
                        >
                          <input
                            type="radio"
                            name="workingModel"
                            {...register(
                              "workingModel",
                              registerOptions.workingModel
                            )}
                            value={option}
                            className="mr-2 text-pink-500 focus:ring-pink-400"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage error={errors.workingModel} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["Full Time", "Part Time", "Project Based"].map(
                        (option) => (
                          <label
                            key={option}
                            className="flex items-center p-3 border border-yellow-200 rounded-md cursor-pointer hover:bg-yellow-50"
                          >
                            <input
                              type="radio"
                              name="availability"
                              {...register(
                                "availability",
                                registerOptions.availability
                              )}
                              value={option}
                              className="mr-2 text-pink-500 focus:ring-pink-400"
                            />
                            <span>{option}</span>
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
                <h2 className="text-xl font-semibold mb-6 text-pink-600 border-b border-yellow-200 pb-2">
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
                        className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
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
                        className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
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
                        className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
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

                  <div className="mt-6 bg-yellow-50 p-4 rounded-md">
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
                        <h3 className="text-sm font-medium text-yellow-800">
                          Important Notice
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
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
              </motion.div>
            )}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Previous
                </motion.button>
              )}

              {currentStep < 5 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-md hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-medium rounded-md hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Submit Application
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
