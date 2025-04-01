import React, { useState } from "react";
import { BsGrid, BsCloudArrowUp, BsFolder } from "react-icons/bs";
import { TfiText } from "react-icons/tfi";
import { TbIcons } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import TemplatesSection from "./TemplatesSection";
import ElementsSection from "./ElementsSection"; // Import the new component
import TextSection from "./TextSection";
import UploadsSection from "./UploadsSection";

const Sidebar = ({
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
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const sidebarItems = [
    { id: "templates", label: "Templates", icon: <BsGrid className="w-6 h-6 text-rose-500" /> },
    { id: "elements", label: "Elements", icon: <TbIcons className="w-6 h-6 text-rose-500" /> },
    { id: "text", label: "Text", icon: <TfiText className="w-6 h-6 text-rose-500" /> },
    { id: "uploads", label: "Uploads", icon: <BsCloudArrowUp className="w-6 h-6 text-rose-500" /> },
    { id: "projects", label: "Projects", icon: <BsFolder className="w-6 h-6 text-rose-500" /> },
  ];

  const handleSectionToggle = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    addTemplateToCanvas(template.jsonData);
    console.log(template)
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
          <>
          <TextSection
          addCustomTextElement={addCustomTextElement}
          textEffects={textEffects}
          setTextEffects={setTextEffects}
        />
        </>
        );
      case "uploads":
        return (
          <UploadsSection onImageUpload={handleImageUpload} />
        );
      case "projects":
        return (
          <div className="space-y-3">
            <button
              onClick={saveTemplate}
              className="p-2 bg-purple-500 text-white rounded-lg w-full hover:bg-purple-600"
            >
              Save Template
            </button>
            <button
              onClick={loadTemplate}
              className="p-2 bg-orange-500 text-white rounded-lg w-full hover:bg-orange-600"
            >
              Load Template
            </button>
            {/* Download Button (visible except in TemplatesSection and ElementsSection) */}
        {activeSection !== "templates" && activeSection !== "elements" && (
          <button
            onClick={downloadImage}
            className="p-2 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 mt-4 mx-6 hover:bg-red-600"
          >
            <FiDownload /> Download
          </button>
        )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Icon Sidebar */}
      <div className="w-16 flex md:flex-col flex-row items-center md:py-6 py-2 space-x-4 md:space-x-0 space-y-6 border-r border-gray-200 overflow-x-auto md:overflow-x-visible">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionToggle(item.id)}
            className={`p-2 rounded-lg ${activeSection === item.id ? "bg-purple-100" : "hover:bg-gray-200"}`}
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