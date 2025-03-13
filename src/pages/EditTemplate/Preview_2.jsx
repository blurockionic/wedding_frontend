import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { RiEdit2Fill } from "react-icons/ri";
import ImageSlider from '../../components/invitation/ImageSlider';
import TemplateSidebar from '../../components/invitation/TemplateSidebar';
import TemplatePreview from '../../components/invitation/TemplatePreview';

function Preview_2({ pricing}) {
  const navigate = useNavigate();


  const handleSave = async () => {
    
    const templateData = {
      eventHeading: formData.eventHeading || "WE INVITE YOU", 
      eventSubheading: formData.eventSubheading || "TO CELEBRATE OUR WEDDING", 
      brideName: formData.brideName || "Arohi", 
      groomName: formData.groomName || "Aarav", 
      eventDate: formData.eventDate ? new Date(formData.eventDate).toISOString() : "2025-02-10", 
      weddingTime: formData.weddingTime || "12:00 PM",
      weddingLocation: formData.weddingLocation || "Grace Church432 Thurston Ave, Greentown",
      description: formData.description || "A reception will follow immediately after the ceremony."
    };
    localStorage.setItem("invitationTemplate", JSON.stringify(templateData));

    try {
      const response = await addTemplate(templateData).unwrap();

      toast.success("Data saved successfully!");
      navigate(pricing === "Paid" ? "/payment" : "/card");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data.");
    }
  };

return (
  <>
      <ImageSlider/>
  <div className="flex flex-col lg:flex-row lg:h-screen lg:max-w-full items-center justify-around p-11 gap-0 mt-4">
      <div className="flex lg:flex-col flex-row w-full lg:w-[41%] xl:w-[21%] lg:h-screen h-auto border-2 border-pink-100 bg-white">
        <TemplateSidebar/>
      </div>
    <div className="flex flex-col lg: lg:h-screen lg:w-[70%] items-center justify-center p-4  lg:shadow_1 lg:mt-0 mt-11 lg:bg-slate-800 lg:border-2 border-blue-400 ms-[20px] lg:ms-0 relative">
      <div className="lg:flex items-center gap-2 text-gray-600 bg-slate-400 p-3 w-full top-0 absolute hidden">
              < RiEdit2Fill className="w-5 h-5 text-white" />
              <p className="text-sm text-white ">Click any text below to edit and personalize your invitation</p>
            </div>
      <TemplatePreview/>
    </div>
    </div>
  </>
  )
}

export default Preview_2
