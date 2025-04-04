import axios from "axios";
import React from "react";
import { IoIosLock } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineCreditScore } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useTemplateCreateOrderMutation } from "../../redux/payment";
import { toast } from "react-toastify";

function Payment() {
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { amount, template } = location.state || {};

  const [createRazorpayOrder, { isLoading: creatingOrderLoader }] =
    useTemplateCreateOrderMutation();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleCreateRazorpayOrder = async () => {
    try {
      const { order, success } = await createRazorpayOrder({
        tempId: template.id,
      }).unwrap();

      if (success) {
        handleRazorpayScreen(order);
      }
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("Error creating order");
    }
  };

  const handleRazorpayScreen = async (order) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Some error at Razorpay screen loading");
      return;
    }

    const options = {
      key: import.meta.env.VITE_PAY_ID,
      amount: order.amount * 100,
      currency: order.currency || "INR",
      name: "Marriage Vendors",
      description: "Payment to Marriage Vendors",
      image: "https://www.marriagevendors.com/assets/brandlogo-U4Jufhk5.png",
      order_id: order.orderId, // Pass Order ID from backend
      handler: async function (response) {
        try {
          // Send payment details to backend for verification
          const verifyRes = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/template/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: order.orderId,
                payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
              credentials: "include",
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setResponseId(response.razorpay_payment_id);
            setPaymentSuccess(true);
            navigate("/update_editor");
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("Error verifying payment");
        }
      },
      prefill: {
        name: order?.notes?.name || "Marriage Vendors",
        email: order?.notes?.email || "marriagevendorsworks@gmail.com",
      },
      theme: { color: "#F4C430" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios
      .get(`${import.meta.env.VITE_API_URL}/payment/${paymentId}`)
      .then((response) => {
        console.log(response.data);
        setResponseState(response.data);
      })
      .catch((error) => {
        console.log("error occurs", error);
      });
  };

  return (
    <>
      <div className="h-[100vh] w-[100%] flex justify-center items-center pay_image">
        <div className="h-[80vh] md:w-[60%]  w-[90%] relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden flex justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full transform -translate-x-1/2 translate-y-1/2" />
          <div className="md:w-[60%] w-[90%]">
            <div className="text-center mb-8 md:mt-0 mt-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-3 rounded-2xl shadow-lg relative group">
                  <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <MdOutlineCreditScore className="w-8 h-8 text-white" />
                </div>
                <pre> </pre>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 inline-block text-transparent bg-clip-text">
                  Payment Gateway
                </h1>
              </div>
              <p className="text-gray-600 mt-2">
                Complete your payment securely
              </p>
            </div>
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-indigo-100/50 relative overflow-hidden group mt-11">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-indigo-600/5 transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="text-center relative">
                <span className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 inline-block text-transparent bg-clip-text tracking-tight">
                  ₹{amount}
                </span>
                <p className="text-gray-600 mt-3 font-medium">
                  For your amazing service
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-11">
              <button
                onClick={handleCreateRazorpayOrder}
                className="md:w-[60%] w-[100%] group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 flex justify-center items-center"
              >
                <FaLock />
                <pre> </pre>Pay Now
                <div className="absolute inset-0 bg-white/20 transform origin-left -skew-x-12 transition-transform duration-500 ease-out group-hover:scale-x-100 scale-x-0"></div>
              </button>
            </div>
            <div className="md:flex md:items-center gap-2 text-gray-600 md:justify-evenly flex justify-center mt-7 w-[100%] md:ps-[22%] ps-0">
              <span className="text-sm flex items-center w-[60%]  text-gray-600 bg-gray-50/80 p-3 rounded-xl transition-colors duration-300 hover:bg-gray-100/80">
                <IoIosLock />
                <pre> </pre>Secure Payment
              </span>
              <div className="grid grid-cols-2 gap-4 text-sm w-[70%]">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/80 p-3 rounded-xl transition-colors duration-300 hover:bg-gray-100/80 w-[150px]">
                  <IoShieldCheckmarkOutline className="text-violet-600" />
                  <span className="">256-bit SSL</span>
                </div>
              </div>
            </div>
            {paymentSuccess && <div className="flex justify-center"></div>}
            <div className="mt-11 text-[15px] md:block hidden indent-4 text-gray-500">
              Experience premium service with our comprehensive package. Your
              payment includes full access to all premium features, priority
              support, and exclusive content. Satisfaction guaranteed.
            </div>
            <div className="md:mt-[5%] mt-[10%] pt-6 border-t border-gray-100 ">
              <div className="flex items-center justify-center text-sm text-gray-500 gap-2">
                <IoShieldCheckmarkOutline className="w-4 h-4 text-violet-600" />
                Protected by industry-leading encryption
              </div>
            </div>
            <div className="md:mt-5 flex justify-center mt-6 text-gray-500">
              © 2025 Marriage Vendors. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
