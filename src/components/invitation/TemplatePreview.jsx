import React, { useState } from 'react'

const EditableText = ({ value, onChange, className }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsEditing(true)}
      onBlur={(e) => {
        setIsEditing(false);
        onChange(e.target.innerText);
      }}
      className={`cursor-text outline-none border ${isEditing ? "border-pink-500" : "border-transparent"} transition-all duration-300 ${className}`}
    >
      {value}
    </div>
  );
};

const TemplatePreview = () => {
  const [formData, setFormData] = useState({
    eventHeading: "WE INVITE YOU",
    eventSubheading: "TO CELEBRATE OUR WEDDING",
    groomName: "Aarav",
    brideName: "Aarohi",
    eventDate: "Saturday, May 24th",
    weddingTime: "2:00 PM",
    weddingLocation: "Grace Church, Greentown",
    description: "A reception will follow immediately after the ceremony.",
  });

  const handleInputChange = (field, value) => setFormData({ ...formData, [field]: value });

  return (
      <div className="w-[30vh] md:w-[50vh] lg:w-[50%] flex items-center justify-center p-6 ms-[-20px] lg:ms-11  rounded-lg md:h-[80vh] h-[50vh] prev2_sec_53_1 ">
      <div className="text-center md:space-y-6 lg:h-[40vh] space-y-3]">
      <EditableText value={formData.eventHeading} onChange={(val) => handleInputChange("eventHeading", val)} className="text-[10px] md:text-[16px] font-bold text_edit" />
        <EditableText value={formData.eventSubheading} onChange={(val) => handleInputChange("eventSubheading", val)} className="text-[10px] md:text-[16px]" />
        <EditableText value={formData.groomName} onChange={(val) => handleInputChange("groomName", val)} className="text-[10px] md:text-[24px] font-semibold" />
        <p className="text-[10px] md:text-[16px] font-medium">and</p>
        <EditableText value={formData.brideName} onChange={(val) => handleInputChange("brideName", val)} className="text-[10px] md:text-[24px] font-semibold" />
        <div className="mt-4 text-[10px] md:text-[16px]">
          {["eventDate", "weddingTime", "weddingLocation"].map((field) => (
            <EditableText key={field} value={formData[field]} onChange={(val) => handleInputChange(field, val)} />
          ))}
        </div>
        <EditableText value={formData.description} onChange={(val) => handleInputChange("description", val)} className="mt-4 text-gray-600 text-[6px] md:text-[10px] lg:text-[8px] xl:text-[11px]" />
      </div>
    </div>
  );
};

export default TemplatePreview;
