import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomText from "../../components/global/text/CustomText";
import { GoCheck } from "react-icons/go";

const Success = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const location = useLocation();
  const message = location.state?.message || "Success";

  // Countdown timer and redirection
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
        {/* Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <span className="bg-green-500 p-4 rounded-full">
            <GoCheck className="text-4xl text-white" />
          </span>
        </div>

        {/* Success Message */}
        <CustomText
          text="Success"
          variant="heading"
          className="text-xl font-bold text-green-500 mb-2"
        />
        <CustomText
          text={message}
          variant="paragraph"
          className="text-sm text-muted-foreground mb-4"
        />

        {/* Countdown Message */}
        <CustomText
          text={`You will be redirected to the login page in ${countdown} second${
            countdown > 1 ? "s" : ""
          }`}
          variant="paragraph"
          className="text-sm text-red-500 mb-4"
        />
      </div>
    </div>
  );
};

export default Success;
