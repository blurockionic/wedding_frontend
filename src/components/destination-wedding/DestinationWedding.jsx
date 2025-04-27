import React from "react";
import { Link } from "react-router-dom";

const DestinationWedding = () => {
  return (
    <div
      className="relative w-full h-[400px] lg:h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/destination_wedding/destination_wedding.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex flex-col items-center justify-center text-white px-6 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight max-w-4xl">
          Deliver Seamless Weddings.
          <br className="hidden sm:block" />
          Earn with Every Booking.
        </h1>
        <Link
          to="/partnership"
          className="mt-6 bg-blue-600 hover:bg-blue-700 transition duration-300 px-6 py-3 rounded-full text-base sm:text-lg font-medium shadow-lg"
        >
          Join the MarriageVendors.com Partner Network
        </Link>
      </div>
    </div>
  );
};

export default DestinationWedding;
