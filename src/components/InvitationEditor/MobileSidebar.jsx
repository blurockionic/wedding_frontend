import React, { useState } from "react";
import { BsGrid, BsCloudArrowUp, BsFolder } from "react-icons/bs";
import { FaLayerGroup, FaArrowUp, FaArrowDown, FaLock, FaUnlock } from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { TbIcons } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import TemplatesSection from "./TemplatesSection";
import { X } from "lucide-react";
import ElementsSection from "./ElementsSection";
import TextSection from "./TextSection";
import UploadsSection from "./UploadsSection";

const MobileSidebar = ({
  templates,
  designs,
  handleImageUpload,
  addTemplateToCanvas,
  downloadImage,
  saveTemplate,
  loadTemplate,
  addDesignElement,
  onWallpaperSelect,
  addCustomTextElement,
  textEffects,
  setTextEffects,
  bringToFront,
  sendToBack,
  bringForward,
  sendBackward,
  lockObject,
  unlockObject,
}) => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const sidebarItems = [
    { id: "templates", label: "Templates", icon: <BsGrid className="w-6 h-6 text-rose-500" /> },
    { id: "elements", label: "Elements", icon: <TbIcons className="w-6 h-6 text-rose-500" /> },
    { id: "text", label: "Text", icon: <TfiText className="w-6 h-6 text-rose-500" /> },
    { id: "uploads", label: "Uploads", icon: <BsCloudArrowUp className="w-6 h-6 text-rose-500" /> },
    { id: "projects", label: "Projects", icon: <BsFolder className="w-6 h-6 text-rose-500" /> },
    { id: "positions", label: "Positions", icon: <FaLayerGroup className="w-6 h-6 text-rose-500" /> }, // New Positions section
  ];

  const handleSectionToggle = (sectionId) => {
    setOpenSection(sectionId);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    addTemplateToCanvas(template.image);
    setOpenSection(null);
  };

  const renderPopupContent = () => {
    switch (openSection) {
      case "templates":
        return (
          <TemplatesSection
            templates={templates}
            onTemplateClick={handleTemplateClick}
            selectedTemplate={selectedTemplate}
          />
        );
      case "elements":
        return (
          <ElementsSection
            designs={designs}
            addDesignElement={addDesignElement}
            onWallpaperSelect={onWallpaperSelect}
          />
        );
      case "text":
        return (
          <TextSection
            addCustomTextElement={addCustomTextElement}
            textEffects={textEffects}
            setTextEffects={setTextEffects}
          />
        );
      case "uploads":
        return <UploadsSection onImageUpload={handleImageUpload} />;
      case "projects":
        return (
          <div className="space-y-3 p-4">
            <button
              onClick={() => {
                saveTemplate();
                setOpenSection(null);
              }}
              className="p-2 bg-purple-500 text-white rounded-lg w-full hover:bg-purple-600"
            >
              Save Template
            </button>
            <button
              onClick={() => {
                loadTemplate();
                setOpenSection(null);
              }}
              className="p-2 bg-orange-500 text-white rounded-lg w-full hover:bg-orange-600"
            >
              Load Template
            </button>
            <button
              onClick={() => {
                downloadImage();
                setOpenSection(null);
              }}
              className="p-2 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
            >
              <FiDownload /> Download
            </button>
          </div>
        );
      case "positions":
            return (
              <div className="space-y-3 p-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl space-y-6">
                  <div>
                    <h3 className="text-md font-bold mb-4 flex items-center gap-3 animate-slide-in text-purple-500">
                      <FaLayerGroup className="text-purple-500" /> Layering
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={bringToFront}
                        className="w-full p-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center gap-3 hover:from-rose-400 hover:to-pink-400 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg animate-slide-in border border-rose-300/50 hover:shadow-rose-400/50"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <FaArrowUp className="text-white transform transition-transform hover:scale-110" /> Bring to Front
                      </button>
                      <button
                        onClick={sendToBack}
                        className="w-full p-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center gap-3 hover:from-rose-400 hover:to-pink-400 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg animate-slide-in border border-rose-300/50 hover:shadow-rose-400/50"
                        style={{ animationDelay: "0.2s" }}
                      >
                        <FaArrowDown className="text-white transform transition-transform hover:scale-110" /> Send to Back
                      </button>
                      <button
                        onClick={bringForward}
                        className="w-full p-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center gap-3 hover:from-rose-400 hover:to-pink-400 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg animate-slide-in border border-rose-300/50 hover:shadow-rose-400/50"
                        style={{ animationDelay: "0.3s" }}
                      >
                        <FaArrowUp className="text-white transform transition-transform hover:scale-110" /> Bring Forward
                      </button>
                      <button
                        onClick={sendBackward}
                        className="w-full p-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center gap-3 hover:from-rose-400 hover:to-pink-400 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg animate-slide-in border border-rose-300/50 hover:shadow-rose-400/50"
                        style={{ animationDelay: "0.4s" }}
                      >
                        <FaArrowDown className="text-white transform transition-transform hover:scale-110" /> Send Backward
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-bold mb-4 flex items-center gap-3 animate-slide-in text-purple-500">
                      <FaLock className="text-purple-500" /> Lock/Unlock
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={lockObject}
                        className="w-full p-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-xl flex items-center justify-center gap-3 hover:from-gray-500 hover:to-gray-400 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg animate-slide-in border border-gray-300/50 hover:shadow-gray-400/50"
                        style={{ animationDelay: "0.5s" }}
                      >
                        <FaLock className="text-white transform transition-transform hover:scale-110" /> Lock
                      </button>
                      <button
                        onClick={unlockObject}
                        className="w-full p-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-xl flex items-center justify-center gap-3 hover:from-gray-500 hover:to-gray-400 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg animate-slide-in border border-gray-300/50 hover:shadow-gray-400/50"
                        style={{ animationDelay: "0.6s" }}
                      >
                        <FaUnlock className="text-white transform transition-transform hover:scale-110" /> Unlock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full bg-white border-b border-gray-200">
      <div className="flex flex-row items-center py-2 space-x-4 overflow-x-auto">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionToggle(item.id)}
            className={`p-2 rounded-lg ${openSection === item.id ? "bg-purple-100" : "hover:bg-gray-200"}`}
            title={item.label}
          >
            <div className="flex items-center justify-center">{item.icon}</div>
            <p className="text-[12px] mt-1 text-pink-500">{item.label}</p>
          </button>
        ))}
      </div>

      {openSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-lg h-3/4 rounded-lg shadow-lg flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-100">
              <h2 className="text-lg font-semibold">{openSection.charAt(0).toUpperCase() + openSection.slice(1)}</h2>
              <button
                onClick={() => setOpenSection(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">{renderPopupContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;