import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useProtectAfterLogin from "../../../hooks/useProtectAfterLogin";
import { useVendorSignupMutation } from "../../../redux/vendorSlice";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import signup_bg from "../../../../public/signup/sign-bg.jpg";
import brandlogo from "../../../../public/logo/brandlogo.png";

function VendorRegistration() {
  useProtectAfterLogin(["vendor"], "/VendorDashboard");
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      business_name: "",
      business_category: "",
      description: "",
      license_number: "",
      service_type: [],
      social_networks: { facebook: "", instagram: "" },
      logo_url: {},
    },
    mode: "onBlur",
  });

  const [vendorSignup, { isLoading, isError, error }] =
    useVendorSignupMutation();

  const nextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (data) => {
    try {
      const vendorData = await vendorSignup(data).unwrap();
      toast.success(vendorData?.message);
      methods.reset();
      navigate("/vendorLogin", { replace: true });
    } catch (error) {
      console.error("Vendor registration failed: ", error);
      toast.error("Vendor registration failed. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-[#f2f2f2]  px-4 grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 hidden md:block">
          {/* sign up  */}
          <div
            className="relative h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${signup_bg})` }}
          >
            {/* Overlay with backdrop blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Content on top of the image */}
            <div className="relative z-10 text-center text-white px-6 ">
              <NavLink
                to="/"
                className="cursor-pointer flex gap-3 justify-center w-full "
              >
                <img src={brandlogo} alt="brandlogo" className="w-16 h-16" />
                <div className="flex flex-col justify-start items-start">
                  <span className="text-background text-4xl">
                    Marriage Vendors
                  </span>
                  <span className="text-background text-xs">Wedding Orgniser</span>
                </div>
              </NavLink>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-10">
                Join Us Today!
              </h2>
              <p className="text-lg md:text-xl mb-6">
                Sign up now to connect with engaged couples and grow your
                business.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full px-10 my-auto">
          {/* Header Card */}
          <div className="bg-white rounded-t-lg shadow-sm p-6 border-b border-[#d6d6d6]">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold text-[#1a1a1a]">
                Vendor Registration
              </h1>
              <p className="text-[#666666] font-medium">
                Step {currentStep} of 6
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-[#e6e6e6] rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-[#d43fa6] rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-b-lg shadow-sm p-6 mb-6">
            {/* Step Components */}
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <Step4 />}
            {currentStep === 5 && <Step5 />}
            {currentStep === 6 && (
              <Step6 onSubmit={methods.handleSubmit(handleSubmit)} />
            )}

            {/* Loading and Error States */}
            {isLoading && (
              <div className="mt-6 text-center text-[#d43fa6]">
                <p className="font-medium">Processing your registration...</p>
              </div>
            )}
            {isError && error?.data?.errors && (
              <div className="mt-6 space-y-2">
                {error?.data?.errors.map((err, index) => (
                  <p key={index} className="text-center text-[#800000]">
                    {err.message}
                  </p>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-2.5 bg-[#e6e6e6] hover:bg-[#d6d6d6] text-[#1a1a1a] rounded-md transition-colors duration-200"
                >
                  Back
                </button>
              )}
              {currentStep < 6 && (
                <button
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-[#d43fa6] hover:bg-[#c23795] text-white rounded-md transition-colors duration-200 ml-auto"
                >
                  Next
                </button>
              )}
              {currentStep === 6 && (
                <button
                  onClick={methods.handleSubmit(handleSubmit)}
                  className="px-6 py-2.5 bg-[#d43fa6] hover:bg-[#c23795] text-white rounded-md transition-colors duration-200 ml-auto"
                >
                  Submit Registration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default VendorRegistration;
