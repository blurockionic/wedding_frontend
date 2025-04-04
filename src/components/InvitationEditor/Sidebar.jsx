import React, { useState } from "react";
import { BsGrid, BsCloudArrowUp, BsFolder } from "react-icons/bs";
import { FaLayerGroup, FaArrowUp, FaArrowDown, FaLock, FaUnlock } from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { TbIcons } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import TemplatesSection from "./TemplatesSection";
import ElementsSection from "./ElementsSection"; // Import the new component
import TextSection from "./TextSection";
import UploadsSection from "./UploadsSection";
import AdminPanel from "./AdminPanel";
import { SiAdminer } from "react-icons/si";
import { MdUpdate } from "react-icons/md";
import { Loader2 } from "lucide-react";


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
  isLoading
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const sidebarItems = [
    { id: "templates", label: "Templates", icon: <BsGrid className="w-6 h-6 text-rose-500" /> },
    { id: "elements", label: "Elements", icon: <TbIcons className="w-6 h-6 text-rose-500" /> },
    { id: "text", label: "Text", icon: <TfiText className="w-6 h-6 text-rose-500" /> },
    { id: "uploads", label: "Uploads", icon: <BsCloudArrowUp className="w-6 h-6 text-rose-500" /> },
    { id: "projects", label: "Projects", icon: <BsFolder className="w-6 h-6 text-rose-500" /> },
    { id: "positions", label: "Positions", icon: <FaLayerGroup className="w-6 h-6 text-rose-500" /> },
    { id: "admin", label: "Admin", icon: <SiAdminer className="w-6 h-6 text-rose-500" /> },
    { id: "update", label: "Save design", icon: <MdUpdate className="w-6 h-6 text-rose-500" /> },
    
  ];

  const handleSectionToggle = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    addTemplateToCanvas(template);
    // console.log(template)
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
        return <AdminPanel saveTemplate={saveTemplate}/>;
      case "update":
        return (<>
        
        <button className="bg-primary px-7 py-2 rounded-lg text-white" onClick={handleOnUpdateDesign}>
        {isLoading ? <Loader2 className="animate-spin"/> : "Save Design"}
        </button>
      
        </>);
      case "projects":
        return (
          <div className="space-y-3 p-4">
            
            <button
              onClick={downloadImage}
              className="p-2 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
            >
              <FiDownload /> Download
            </button>
          </div>
        );
      case "positions":
        return (
          <div className="space-y-3 p-4">
            {/* Layering Section */}
            <div>
              <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                <FaLayerGroup /> Layering
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={bringToFront}
                  className="p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
                >
                  <FaArrowUp /> Bring to Front
                </button>
                <button
                  onClick={sendToBack}
                  className="p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
                >
                  <FaArrowDown /> Send to Back
                </button>
                <button
                  onClick={bringForward}
                  className="p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
                >
                  <FaArrowUp /> Bring Forward
                </button>
                <button
                  onClick={sendBackward}
                  className="p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
                >
                  <FaArrowDown /> Send Backward
                </button>
              </div>
            </div>

            {/* Lock/Unlock Section */}
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                <FaLock /> Lock/Unlock
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={lockObject}
                  className="p-2 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
                >
                  <FaLock /> Lock
                </button>
                <button
                  onClick={unlockObject}
                  className="p-2 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
                >
                  <FaUnlock /> Unlock
                </button>
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
      {/* Icon Sidebar */}
      <div className="p-2 flex md:flex-col flex-row items-center md:py-6 py-2 space-x-4 md:space-x-0 space-y-6 border-r border-gray-200 overflow-x-auto md:overflow-x-visible ">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionToggle(item.id)}
            className={`w-full p-2 bg-white rounded-lg ${activeSection === item.id ? "bg-purple-100" : "hover:bg-gray-200"}`}
            title={item.label}
          >
            <div className="flex items-center justify-center">{item.icon}</div>
            <p className="text-[12px] mt-1 text-pink-500">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div
        className={`md:w-[320px] w-full bg-white flex flex-col gap-4 transition-all duration-300 ${
          activeSection ? "block" : "hidden"
        } md:${activeSection ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
      >
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default Sidebar;