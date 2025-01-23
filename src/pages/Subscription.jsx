import React from "react";
import { useSelector } from "react-redux";
import Plan from "./vendorDashboard/component/Plan";
import { useCreateOrderMutation } from "../redux/payment";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Subscription() {
  const user = useSelector((state) => state.auth.user); // Get user info from Redux state
  const [createPlan, { isLoading, error }] = useCreateOrderMutation(); // Destructure to get loading state and potential errors

  async function displayRazorpay(planId) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load!");
      return;
    }

    try {
      const { order } = await createPlan({ planId }).unwrap();

      if (!order) {
        alert("Failed to create Razorpay order!");
        return;
      }

      console.log("Order Data:", order);

      const options = {
        key: import.meta.env.VITE_PAY_ID, // Razorpay API Key (do not expose sensitive keys in the frontend)
        amount: order.amount * 100, // Amount in paise (backend provides in rupees)
        currency: order.currency,
        name: "Wedd",
        description: `Subscription Plan: ${order.planName}`,
        image: "https://example.com/your_logo", // Your logo URL (optional)
        order_id: order.id, // Order ID from backend
        callback_url: "http://localhost:4000/api/v1/subscribe/verify-payment", // Backend verification endpoint
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: user?.phone_number || "0000000000",
        },
        notes: {
          address: "Razorpay Corporate Office", // Optional notes
        },
        theme: {
          color: "#d43fa6", // Theme color for the Razorpay popup
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      alert("Something went wrong! Please try again.");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-2xl font-bold text-primary mb-4">Select a Plan</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div> // Display error message if API call fails
        ) : (
          <Plan displayRazorpay={displayRazorpay} />
        )}
      </header>
    </div>
  );
}

export default Subscription;
