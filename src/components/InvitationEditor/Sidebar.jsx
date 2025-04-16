import React, { useState } from "react";
import { BsGrid, BsCloudArrowUp, BsFolder } from "react-icons/bs";
import {
  FaLayerGroup,
  FaArrowUp,
  FaArrowDown,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { TbIcons } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import TemplatesSection from "./TemplatesSection";
import ElementsSection from "./ElementsSection";
import TextSection from "./TextSection";
import UploadsSection from "./UploadsSection";
import AdminPanel from "./AdminPanel";
import { SiAdminer } from "react-icons/si";
import { MdUpdate } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetTemplateWatchHistoryQuery } from "../../redux/TemplateSlice";
import { TemplateCard } from "../../pages/EditTemplate/TemplateList";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  templates,
  designs,
  handleImageUpload,
  addTemplateToCanvas,
  downloadImage,
  saveTemplate,
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
  handleOnUpdateDesign,
  isLoading,
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const userRole = useSelector((state) => state?.auth?.user);

  const { data: watchTemplateData, isLoading: watchLoading } =
    useGetTemplateWatchHistoryQuery();

  const navigate = useNavigate();

  const sidebarItems = [
    {
      id: "templates",
      label: "Templates",
      icon: <BsGrid className="w-6 h-6 text-rose-500" />,
    },
    {
      id: "elements",
      label: "Elements",
      icon: <TbIcons className="w-6 h-6 text-rose-500" />,
    },
    {
      id: "text",
      label: "Text",
      icon: <TfiText className="w-6 h-6 text-rose-500" />,
    },
    {
      id: "uploads",
      label: "Uploads",
      icon: <BsCloudArrowUp className="w-6 h-6 text-rose-500" />,
    },
    {
      id: "projects",
      label: "My Template",
      icon: <BsFolder className="w-6 h-6 text-rose-500" />,
    },
    {
      id: "positions",
      label: "Positions",
      icon: <FaLayerGroup className="w-6 h-6 text-rose-500" />,
    },
    ...(userRole === "ADMIN" || userRole === "SUPER_ADMIN"
      ? [
          {
            id: "admin",
            label: "Admin",
            icon: <SiAdminer className="w-6 h-6 text-rose-500" />,
          },
        ]
      : []),
    {
      id: "update",
      label: "Save design",
      icon: <MdUpdate className="w-6 h-6 text-rose-500" />,
    },
  ];

  const handleSectionToggle = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    addTemplateToCanvas(template);
  };

  const toggleDownloadDropdown = () => {
    setIsDownloadOpen(!isDownloadOpen);
  };

  const handleDownload = (format) => {
    console.log(`Downloading as ${format}`); // Debug log to confirm format
    downloadImage(format);
    setIsDownloadOpen(false);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
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
      case "admin":
        if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
          return <AdminPanel saveTemplate={saveTemplate} />;
        }
        return null;
      case "update":
        return (
          <div className="space-y-3 p-4">
            <button
              className="bg-primary px-7 py-2 rounded-lg text-white w-full"
              onClick={handleOnUpdateDesign}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Update Design"
              )}
<<<<<<< HEAD
            </button>
            <button
              onClick={saveTemplate}
              className="p-2 bg-purple-500 text-white rounded-lg w-full hover:bg-purple-600"
            >
              Save Template
=======
>>>>>>> 40f341c487a709d1b3d69dedde55841447c43d54
            </button>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-3 p-4">
            <div className="relative">
              <button
                onClick={toggleDownloadDropdown}
                className="p-2 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 w-full hover:bg-red-600"
              >
                <FiDownload /> Download
              </button>
              {isDownloadOpen && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleDownload("png")}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => handleDownload("jpeg")}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    JPG
                  </button>
                </div>
              )}
            </div>
            <h2 className="capitalize text-center font-semibold">
              template history
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {watchTemplateData?.lenght > 0 ? (
                watchTemplateData?.watchHistory.map((item) => (
                  <TemplateCard
                    key={item.id}
                    template={item.template}
                    onClick={() =>
                      navigate("/update_editor", {
                        state: { template: item.template },
                      })
                    }
                  />
                ))
              ) : (
                <p>No templates available.</p>
              )}
            </div>
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
    <div className="flex h-screen overflow-y-scroll">
      <div className="p-2 flex md:flex-col flex-row items-center md:py-6 py-2 space-x-4 md:space-x-0 space-y-6 border-r border-gray-200 overflow-x-auto md:overflow-x-visible ">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionToggle(item.id)}
            className={`w-full p-2 bg-white rounded-lg ${
              activeSection === item.id ? "bg-purple-100" : "hover:bg-gray-200"
            }`}
            title={item.label}
          >
            <div className="flex items-center justify-center">{item.icon}</div>
            <p className="text-[12px] mt-1 text-pink-500">{item.label}</p>
          </button>
        ))}
      </div>
      <div
        className={`md:w-[320px] w-full bg-white flex flex-col gap-4 transition-all duration-300 ${
          activeSection ? "block" : "hidden"
        } md:${
          activeSection ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default Sidebar;
