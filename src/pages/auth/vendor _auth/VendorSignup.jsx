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
import signup_bg from "../../../../public/signup/sign-bg.webp";
import brandlogo from "../../../../public/logo/brandlogo.png";
import { Helmet } from "react-helmet";

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
    
      <Helmet>
        <title>
          Vendor Signup - Join Marriage Vendors & Grow Your Business
        </title>
        <meta
          name="description"
          content="Register as a vendor on Marriage Vendors, showcase your wedding services, and connect with engaged couples. Sign up today and grow your business!"
        />
        <meta
          name="keywords"
          content="vendor registration, wedding vendor signup, marriage vendors, wedding services, wedding business growth"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Vendor Signup - Marriage Vendors" />
        <meta
          property="og:description"
          content="Sign up to showcase your wedding services and connect with engaged couples."
        />
        <meta
          property="og:image"
          content="https://www.marriagevendors.com/signup-preview.jpg"
        />
        <meta
          property="og:url"
          content="https://www.marriagevendors.com/vendorSignup"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Marriage Vendors",
            url: "https://www.marriagevendors.com/vendorSignup",
            logo: "/",
            description:
              "Marriage Vendors helps wedding professionals connect with engaged couples and grow their businesses.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-6200932331",
              contactType: "customer support",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-yellow-100  to-pink-100  flex flex-col md:grid md:grid-cols-5">
        <div className="col-span-2  md:block "> 
          {/* sign up  */}
          <div
            className="relative md:h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${signup_bg})` }}
          >
            {/* Overlay with backdrop blur */}
            <div className="absolute inset-0  bg-black/50 backdrop-blur-sm"></div>

            {/* Content on top of the image */}
            <div className="relative z-10 p-10 text-center text-white px-6 ">
              <NavLink
                to="/"
                className="cursor-pointer flex flex-col items-center gap-3 justify-center w-full "
              >
                <img src={brandlogo} alt="brandlogo" className="w-16 h-16" />
                <div className="flex flex-col justify-start items-start">
                  <span className="text-background text-4xl">
                    Marriage Vendors
                  </span>
                  {/* <span className="text-background text-xs">Wedding Organiser</span> */}
                </div>
              </NavLink>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mt-20 mt-5">
                Join Us Today!
              </h2>
              <p className=" hidden md:block text-lg md:text-xl mb-6">
                Sign up now to connect with <br /> engaged couples and grow your
                business.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 w-full md:px-10 my-auto">
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

            {/* Progress Bar with Checkpoints */}
            <div className="relative w-full">
              {/* Checkpoints Container */}
              <div className="flex justify-between w-full absolute top-[-10px] z-10">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className="relative w-1/6 flex justify-center"
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full border-2 text-xs font-bold ${
                        currentStep >= step
                          ? "border-white bg-primary text-white"
                          : "border-gray-400 bg-white text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-[#e6e6e6] rounded-full overflow-hidden mt-4 relative">
                <div
                  className="absolute h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                />
              </div>
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
              <div className="mt-6 text-center text-primary">
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
                  className="px-6 py-2.5 bg-primary hover:border hover:border-dashed hover:border-primary hover:bg-white hover:text-primary  text-white rounded-md transition-colors duration-200 ml-auto"
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
