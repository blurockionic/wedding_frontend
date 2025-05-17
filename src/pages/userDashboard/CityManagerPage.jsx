import React from 'react';
import { SlLocationPin } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const CityManagerPage = () => {
  // Hardcoded manager data as per the image
  const manager = {
    name: "Aman Sharma",
    role: "Event Planner",
    city: "jammu",
    phone: "9876543210",
    email: "aman.citymanager@example.com",
    rating: "4/5",
  };

  return (
    <div className='flex justify-center items-center h-full w-full -mt-[80px]'>
    <div className="p-6 w-[40%] h-[50%] mx-auto bg-white rounded-lg shadow-md">
      <div className='w-full flex justify-between border-b border-gray-200 mb-3'>
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          City Manager for Your Event
        </h2>
        <div className='bg-gray-300 h-5 w-5 flex justify-center items-center rounded-3xl'><RxCross2 className='text-sm'/></div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-between w-full border-b border-gray-200 pb-2">
          {/* Circular Placeholder for Profile Picture */}
          <div className="flex">
            <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-400 flex justify-center items-center">
              <p className="flex justify-center items-center text-[46px] font-medium text-gray-500">
                A
              </p>
            </div>
            <div>
              {/* Manager Name */}
              <p className="text-lg font-bold text-black ms-2 mt-2">{manager.name}</p>
              <p className="text-xs ms-2">{manager.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-6 bg-gray-100 h-8 w-[137px] ps-2 rounded">
            <p className="text-xs text-gray-600">{manager.rating}</p>
            <div className="flex space-x-0.5">
              <FaStar className="w-4 h-4 text-yellow-300" />
              <FaStar className="w-4 h-4 text-yellow-300" />
              <FaStar className="w-4 h-4 text-yellow-300" />
              <FaStar className="w-4 h-4 text-yellow-300" />
              <FaStar className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Details with Icons */}
        <div className="w-full space-y-2">
          <div className="font-semibold">Contact</div>
          {/* City */}
          <div className="flex items-center space-x-2">
            <SlLocationPin className="text-[#F20574]" />
            <p className="text-black">{manager.city}</p>
          </div>

          {/* Contact */}
          <div className="flex items-center space-x-2">
            <IoCallOutline className="text-[#F20574]" />
            <p className="text-black">+{manager.phone}</p>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2">
            <MdEmail className="text-[#F20574]" />
            <p className="text-black">{manager.email}</p>
          </div>
        </div>
      </div>
      <div className=' h-[160px] flex justify-center items-end'>
        <button
          className="bg-[#F20574] text-white px-4 py-1 rounded-lg"
          style={{ width: '160px', height: '35px' }}
        >
          Got It
        </button>
      </div>
    </div>
    </div>
  );
};

export default CityManagerPage;