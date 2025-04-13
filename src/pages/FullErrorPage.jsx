import React from 'react';
import { Link } from 'react-router-dom';
import sadface from '../../public/sadface.gif'; 

const FullErrorPage = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4 relative overflow-hidden">
      {/* Background Image with a dark overlay */}
      <div className="bg-cover bg-center h-[90%] z-0">
        <img 
          src={sadface}  
          alt="Sad Face" 
          className="object-cover h-full w-full" 
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full text-center text-white p-8">
        <h2 className="text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
          Oops! Something went wrong.
        </h2>

        <p className="text-2xl text-gray-200 mb-6 max-w-2xl mx-auto drop-shadow-lg">
          We encountered an issue while processing your request. Please try again later.
        </p>

        {/* Optional: Show error only in development */}
        {error && import.meta.env.DEV && (
          <pre className="bg-black bg-opacity-40 text-red-300 p-4 mt-4 text-left overflow-x-auto rounded">
            {error.toString()}
          </pre>
        )}

        <div className="mb-6">
          <button
            onClick={() => window.location.reload()}
            className="bg-pink-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-pink-500 transition duration-300"
          >
            Retry
          </button>
        </div>

        <p className="text-xl text-gray-300">
          Or go back to{" "}
          <Link to="/" className="text-blue-500 font-semibold hover:underline">
            Home Page
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default FullErrorPage;
