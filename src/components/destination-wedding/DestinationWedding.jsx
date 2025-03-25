import React from "react";

// Define a default state value (Change as needed)
const state = "Goa"; 

const DestinationWedding = () => {
  return (
    <div
      className="relative w-full h-64 lg:h-96 bg-cover bg-center"
      style={{
        backgroundImage: "url('/destination_wedding/destination_wedding.jpg')", // Direct reference to `public` folder
      }}
    >
      {/* Overlay and Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
        <h1 className="text-3xl lg:text-5xl font-bold">
          Plan Your Dream Destination Wedding
        </h1>
        <p className="mt-2 text-lg lg:text-xl">
          Contact us for more detail
        </p>
        <a
          href="tel:+916200932331"
          className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          📞 +91 6200932331
        </a>
      </div>
    </div>
  );
};

export default DestinationWedding;
