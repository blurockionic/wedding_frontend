import React from "react";
import { BsGrid, BsCloudArrowUp, BsFolder } from "react-icons/bs";
import { TfiText } from "react-icons/tfi";
import { TbIcons } from "react-icons/tb";

const Sidebar = ({ activeSection, handleSectionToggle }) => {
  const sidebarItems = [
    { id: "templates", label: "Templates", icon: <BsGrid className="w-6 h-6 text-rose-500" /> },
    { id: "elements", label: "Elements", icon: <TbIcons  className="w-6 h-6 text-rose-500" /> },
    { id: "text", label: "Text", icon: <TfiText className="w-6 h-6 text-rose-500" /> },
    { id: "uploads", label: "Uploads", icon: <BsCloudArrowUp className="w-6 h-6 text-rose-500" /> },
    { id: "projects", label: "Projects", icon: <BsFolder className="w-6 h-6 text-rose-500" /> },
  ];

  return (
    <div className="w-full md:w-16 bg-white flex md:flex-col items-center py-2 md:py-6 space-x-3 md:space-x-0 md:space-y-6 border-r border-gray-200 md:-mt-[49px]">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleSectionToggle(item.id)}
          className={`p-2 rounded-lg ${activeSection === item.id ? "bg-purple-100" : "hover:bg-gray-200"}`}
          title={item.label}
        >
          <div className="flex items-center justify-center">{item.icon}</div>
          <p className="text-[12px] mt-3 text-pink-500">{item.label}</p>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;