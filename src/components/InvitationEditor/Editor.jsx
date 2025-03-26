import React from "react";
import EditableText from "./EditableText";
import DesignElement from "./DesignElement";
import CustomTextElement from "./CustomTextElement";

const Editor = ({
  editorRef,
  selectedTemplate,
  invitationText,
  setInvitationText,
  designElements,
  customTextElements,
  setDesignElements,
  setCustomTextElements,
  selectedElement,
  setSelectedElement,
  onEditorClick,
  onElementSelect,
  backgroundImage,
}) => {
  //log for states rendering
  console.log("Editor rendered with props:", {
    selectedTemplate,
    backgroundImage,
    invitationText,
    designElementsCount: designElements.length,
    customTextElementsCount: customTextElements.length,
    selectedElement,
  });
  const updateTextField = (field, value) => {
    setInvitationText((prev) => ({
      ...prev,
      [field]: { ...prev[field], text: value },
    }));
    console.log(`Updated invitationText field '${field}':`, updated);
      return updated;
  };

  const deleteInvitationTextField = (field) => {
    setInvitationText((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    if (selectedElement === field) setSelectedElement(null);
  };

  // Log props for debugging
  console.log("Editor - backgroundImage:", backgroundImage, "selectedTemplate:", selectedTemplate);

  // Inner div background style: Prioritize wallpaper if it exists
  const innerBackgroundStyle = backgroundImage
    ? { 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }
    : selectedTemplate
    ? { background: "transparent" } // Allow template image to show if no wallpaper
    : { background: "linear-gradient(to bottom, rgb(30, 41, 59), rgb(15, 23, 42))" };

  return (
    <div
      className="flex-1 p-4 md:p-8 overflow-y-auto h-[91.6vh]"
      style={{ backgroundColor: "#D1D5DB" }}
      onClick={onEditorClick}
    >
      <div
        ref={editorRef}
        className="max-w-[90vw] md:max-w-[63vh] h-[65vh] md:h-[95vh] mx-auto rounded-xl p-6 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden"
        style={innerBackgroundStyle}
      >
        {selectedTemplate && !backgroundImage && ( // Show template image only if no wallpaper
          <img
            src={selectedTemplate.image}
            alt="Background"
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              objectFit: "100% 100%", 
              objectPosition: "center", 
              zIndex: 0 
            }}
          />
        )}
        <div className="relative z-10">
          {selectedTemplate && (
            <div className="text-center space-y-4 md:space-y-8">
              <div className="text-center space-y-2 md:space-y-4">
                {invitationText.eventHeading && (
                  <EditableText
                    value={invitationText.eventHeading.text}
                    onChange={(value) => updateTextField("eventHeading", value)}
                    onDelete={() => deleteInvitationTextField("eventHeading")}
                    className="text-[12px] md:text-2xl font-bold text_edit mt-[40%] md:mt-[30%] italic"
                    style={invitationText.eventHeading.style}
                    animation={invitationText.eventHeading.animation}
                    isSelected={selectedElement === "eventHeading"}
                    onSelect={() => onElementSelect("eventHeading")}
                  />
                )}
                {invitationText.eventSubheading && (
                  <EditableText
                    value={invitationText.eventSubheading.text}
                    onChange={(value) => updateTextField("eventSubheading", value)}
                    onDelete={() => deleteInvitationTextField("eventSubheading")}
                    className="text-[10px] md:text-lg italic"
                    style={invitationText.eventSubheading.style}
                    animation={invitationText.eventSubheading.animation}
                    isSelected={selectedElement === "eventSubheading"}
                    onSelect={() => onElementSelect("eventSubheading")}
                  />
                )}
                <div className="space-y-4 md:space-y-8">
                  {invitationText.groomName && (
                    <EditableText
                      value={invitationText.groomName.text}
                      onChange={(value) => updateTextField("groomName", value)}
                      onDelete={() => deleteInvitationTextField("groomName")}
                      style={invitationText.groomName.style}
                      className="text-xl md:text-3xl italic mt-0 md:mt-6"
                      animation={invitationText.groomName.animation}
                      isSelected={selectedElement === "groomName"}
                      onSelect={() => onElementSelect("groomName")}
                    />
                  )}
                  {invitationText.brideName && (
                    <EditableText
                      value={invitationText.brideName.text}
                      onChange={(value) => updateTextField("brideName", value)}
                      onDelete={() => deleteInvitationTextField("brideName")}
                      style={invitationText.brideName.style}
                      className="text-xl md:text-3xl italic"
                      animation={invitationText.brideName.animation}
                      isSelected={selectedElement === "brideName"}
                      onSelect={() => onElementSelect("brideName")}
                    />
                  )}
                  {invitationText.eventDate && (
                    <EditableText
                      value={invitationText.eventDate.text}
                      onChange={(value) => updateTextField("eventDate", value)}
                      onDelete={() => deleteInvitationTextField("eventDate")}
                      style={invitationText.eventDate.style}
                      className="text-sm md:text-base italic"
                      animation={invitationText.eventDate.animation}
                      isSelected={selectedElement === "eventDate"}
                      onSelect={() => onElementSelect("eventDate")}
                    />
                  )}
                  {invitationText.weddingTime && (
                    <EditableText
                      value={invitationText.weddingTime.text}
                      onChange={(value) => updateTextField("weddingTime", value)}
                      onDelete={() => deleteInvitationTextField("weddingTime")}
                      style={invitationText.weddingTime.style}
                      className="text-sm md:text-base italic"
                      animation={invitationText.weddingTime.animation}
                      isSelected={selectedElement === "weddingTime"}
                      onSelect={() => onElementSelect("weddingTime")}
                    />
                  )}
                  {invitationText.weddingLocation && (
                    <EditableText
                      value={invitationText.weddingLocation.text}
                      onChange={(value) => updateTextField("weddingLocation", value)}
                      onDelete={() => deleteInvitationTextField("weddingLocation")}
                      style={invitationText.weddingLocation.style}
                      className="text-sm md:text-base italic"
                      animation={invitationText.weddingLocation.animation}
                      isSelected={selectedElement === "weddingLocation"}
                      onSelect={() => onElementSelect("weddingLocation")}
                    />
                  )}
                  {invitationText.description && (
                    <EditableText
                      value={invitationText.description.text}
                      onChange={(value) => updateTextField("description", value)}
                      onDelete={() => deleteInvitationTextField("description")}
                      style={invitationText.description.style}
                      className="text-[10px] md:text-sm italic"
                      animation={invitationText.description.animation}
                      isSelected={selectedElement === "description"}
                      onSelect={() => onElementSelect("description")}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {designElements.map((element, index) => (
            <DesignElement
              key={index}
              src={element.src}
              onRemove={() => setDesignElements(designElements.filter((_, i) => i !== index))}
              initialPosition={element.initialPosition}
              index={index}
            />
          ))}
          {customTextElements.map((element, index) => (
            <CustomTextElement
              key={element.id || index}
              id={element.id || `custom-${index}`}
              text={element.text}
              onChange={(newText) => {
                const updatedElements = [...customTextElements];
                updatedElements[index].text = newText;
                setCustomTextElements(updatedElements);
              }}
              onRemove={() => {
                setCustomTextElements(customTextElements.filter((_, i) => i !== index));
                if (selectedElement === (element.id || `custom-${index}`)) setSelectedElement(null);
              }}
              initialPosition={element.initialPosition}
              index={index}
              textStyle={element.style}
              defaultSize={element.defaultSize}
              isSelected={selectedElement === (element.id || `custom-${index}`)}
              onSelect={() => onElementSelect(element.id || `custom-${index}`)}
            />
          ))}
        </div>
        </div>
        </div>
      );
    };
    
    export default Editor;