import React, { useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SiDropbox } from "react-icons/si";
import { FiUpload } from "react-icons/fi";
import { FaGoogleDrive } from "react-icons/fa";

const UploadsSection = ({ onImageUpload }) => {
  const [activeTab, setActiveTab] = useState("Images");
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="h-screen bg-gray-100 text-black overflow-y-auto w-full p-4 md:-mt-[50px]">
      <div className="mb-4">
        <input type="text" placeholder="Search uploads..." className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500" />
        <div className="flex items-center gap-2">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors w-full mt-11" onClick={() => fileInputRef.current.click()}>
            Upload Files
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full mt-11">
            <BsThreeDots className="w-5 h-5" />
          </button>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*,audio/*" className="hidden" />
      </div>
      <div className="flex gap-4 mb-4">
        {["Images", "Videos", "Audio"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-semibold ${activeTab === tab ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-center h-84" onDrop={handleDrop} onDragOver={handleDragOver}>
        <p className="text-gray-600 mb-4">Drag media here to upload or connect an account...</p>
        <div className="flex gap-1 flex-wrap">
          <button className="p-2 hover:bg-gray-200 rounded-full"><FcGoogle className="w-8 h-8" /></button>
          <button className="p-2 hover:bg-gray-200 rounded-full"><SiDropbox className="w-8 h-8 text-blue-500" /></button>
          <button className="p-2 hover:bg-gray-200 rounded-full"><FaGoogleDrive className="w-8 h-8 text-blue-600" /></button>
          <button className="p-2 hover:bg-gray-200 rounded-full" onClick={() => fileInputRef.current.click()}><FiUpload className="w-8 h-8 text-gray-600" /></button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">You can upload images, videos, audio, and GIFs.</p>
    </div>
  );
};

export default UploadsSection;