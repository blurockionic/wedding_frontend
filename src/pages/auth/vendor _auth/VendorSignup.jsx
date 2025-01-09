import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { useVendorSignupMutation } from "../../../redux/vendorSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VendorRegistration() {
  const [currentStep, setCurrentStep] = useState(1);

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
  const navigate = useNavigate();

  const [vendorSignup, { isLoading, isError, error }] =
    useVendorSignupMutation();

  const nextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Handle form submission
  const handleSubmit = async (data) => {
    try {
      console.log("Data submitted: ", data);

      // Call the vendorSignup mutation function
      const vendorData = await vendorSignup(data).unwrap();
      console.log("Vendor registration successful: ", vendorData);
      toast.success(vendorData?.message);

      // Reset form state if needed
      methods.reset();
      // setCurrentStep(1);
      navigate("/vendorLogin", { replace: true });
      
    } catch (error) {
      console.error("Vendor registration failed: ", error);
      toast.error("Vendor registration failed. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Vendor Registration
            </h1>
            <p className="text-gray-600">Step {currentStep} of 6</p>
          </div>

          <div className="relative w-full my-2 h-2 bg-gray-200 rounded">
            <div
              className="absolute h-2 bg-green-500 rounded"
              style={{
                width: `${(currentStep / 6) * 100}%`, // Dynamically set width based on step
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
          </div>

          {/* Render Step Components */}
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}
          {currentStep === 6 && (
            <Step6 onSubmit={methods.handleSubmit(handleSubmit)} />
          )}

          {/* Error and Loading State */}
          {isLoading && (
            <div className="mt-4 text-center text-green-500">
              <p>Submitting...</p>
            </div>
          )}
          {isError && error?.data?.errors && (
            <div className="mt-4 text-center text-red-500">
              {error?.data?.errors.map((err, index) => (
                <p key={index}>{err.message}</p>
              ))}
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Back
              </button>
            )}
            {currentStep < 6 && (
              <button
                onClick={nextStep}
                className="bg-dustyRose hover:bg-dustyRose-dark text-white py-2 px-4 rounded"
              >
                Next
              </button>
            )}
            {currentStep === 6 && (
              <button
                type="submit"
                onClick={methods.handleSubmit(handleSubmit)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default VendorRegistration;
