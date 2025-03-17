import React, { useState, useRef } from "react";
import { Heart, Edit2, Layers, X, Type, Menu } from "lucide-react";
import image_7 from "../../../public/image_7.jpg"
import image_5 from "../../../public/image_5.jpg";
import image_2 from "../../../public/image_2.jpg";
import image_16 from "../../../public/image_6.jpg";
import { motion } from "framer-motion";

const templates = [
  {
    id: 1,
    image: image_7,
    name: "Classic Elegance",
    invitationData: {
      eventHeading: "WE INVITE YOU",
      eventSubheading: "TO CELEBRATE OUR WEDDING",
      groomName: "Aarav",
      brideName: "Aarohi",
      eventDate: "Saturday, May 24th",
      weddingTime: "2:00 PM",
      weddingLocation: "Grace Church, Greentown",
      description: "A reception will follow immediately after the ceremony.",
    },
  },
  { id: 2, image: image_5, name: "Modern Romance" },
  { id: 3, image: image_2, name: "Rustic Charm" },
  { id: 4, image: image_16, name: "Garden Party" },
];

const animations = [
  { name: "Bounce", variant: { y: [-10, 10, -5, 5, 0], transition: { duration: 0.6 } } },
  { name: "Fade In", variant: { opacity: [0, 1], transition: { duration: 0.6 } } },
  { name: "Scale Pop", variant: { scale: [0.8, 1.2, 1], transition: { duration: 0.6 } } },
  { name: "Slide In", variant: { x: [-50, 0], opacity: [0, 1], transition: { duration: 0.6 } } },
];

const fontStyles = {
  Classic: "'Playfair Display', serif",
  Modern: "'Montserrat', sans-serif",
  Elegant: "'Cormorant Garamond', serif",
  Playful: "'Dancing Script', cursive",
  Minimal: "'Poppins', sans-serif",
};

const designs = [
  { id: 1, type: "flower", src: "https://img.icons8.com/?size=80&id=30ChaRYdaCFM&format=png", name: "Simple" },
  { id: 2, type: "flower", src: "https://cdn-icons-png.freepik.com/128/833/833472.png", name: "Heart" },
  { id: 3, type: "flower", src: "https://media-public.canva.com/9Flno/MAE3p19Flno/1/s.png", name: "Flower" },
  { id: 4, type: "flower", src: "https://media-public.canva.com/Z1J8g/MAFoaaZ1J8g/1/t.png", name: "Butterfly" },
  { id: 5, type: "flower", src: "https://media-public.canva.com/PPCBk/MADwe4PPCBk/1/t.png", name: "Daisy" },
  { id: 6, type: "border", src: "https://media-public.canva.com/_CllM/MAEGoA_CllM/1/s.png", name: "Floral Border" },
  { id: 7, type: "border", src: "https://media-public.canva.com/eEzrc/MAELm9eEzrc/1/s.png", name: "Simple Border" },
  { id: 8, type: "border", src: "https://media-public.canva.com/h_nZI/MAFUO2h_nZI/1/s.png", name: "Elegant Border" },
  { id: 9, type: "border", src: "https://media-public.canva.com/MADdwktn_NQ/1/screen.png", name: "Curved Border" },
  { id: 10, type: "flower", src: "https://media-public.canva.com/b5rno/MAF2Mbb5rno/1/tl.png", name: "Orchid" },
];

const handleSaveImage = () => {
  const editorInstance = editorRef.current.getInstance();
  const imageURL = editorInstance.toDataURL();
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "wedding-invitation.png";
  link.click();
};

const EditableText = ({ value, onChange, className, style, animation, onDelete, isSelected, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(text);
  };

  return isEditing ? (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
      autoFocus
      className={`bg-transparent border-b border-gold focus:outline-none px-2 text-center ${className}`}
      style={{ ...style, width: "100%", textAlign: "center"}}
    />
  ) : (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
        onSelect();
      }}
      className={`cursor-text hover:bg-white/5 rounded px-2 py-1 group relative ${className} ${isSelected ? "ring-2 ring-rose-400" : ""}`}
      style={{ ...style, textAlign: "center", display: "inline-block", minWidth: "100%" }}
      animate={animation}
      key={animation ? JSON.stringify(animation) : "default"}
    >
      {text}
      <Edit2 className="w-4 h-4 absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute -right-100 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1"
      >
        <X className="w-3 h-3 text-white" />
      </button>
    </motion.div>
  );
};

const DesignElement = ({ src, onRemove, initialPosition, index }) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState(30);
  const [isSelected, setIsSelected] = useState(false);

  const handleDragEnd = (e, info) => {
    setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
    setIsSelected(true);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        setIsSelected(!isSelected);
      }}
      style={{ x: position.x, y: position.y, position: "absolute", zIndex: 20 }}
      className="relative"
    >
      <img src={src} alt="design" style={{ width: size, height: "auto" }} />
      {isSelected && (
        <div className="absolute top-full left-0 w-full">
          <input
            type="range"
            min="50"
            max="300"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-full accent-rose-400"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="absolute -top-6 -right-2 bg-red-500 rounded-full p-1"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

const CustomTextElement = ({ text, onChange, onRemove, initialPosition, index, textStyle }) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState(16);
  const [isSelected, setIsSelected] = useState(false);
  const [value, setValue] = useState(text || "Enter text here");

  const handleDragEnd = (e, info) => {
    setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
    setIsSelected(true);
  };

  const handleTextChange = (newText) => {
    setValue(newText);
    onChange(newText);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        setIsSelected(!isSelected);
      }}
      style={{ x: position.x, y: position.y, position: "absolute", zIndex: 20 }}
      className="relative"
    >
      <EditableText
        value={value}
        onChange={handleTextChange}
        onDelete={() => onRemove(index)}
        className="text-white"
        style={{ ...textStyle, fontSize: `${size}px` }}
      />
      {isSelected && (
        <div className="absolute top-full left-0 w-full">
          <input
            type="range"
            min="10"
            max="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-full accent-rose-400"
          />
        </div>
      )}
    </motion.div>
  );
};

const Preview_2 = () => {
  const [invitationText, setInvitationText] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#F43F5E");
  const [selectedFont, setSelectedFont] = useState("Classic");
  const [selectedAnimation, setSelectedAnimation] = useState(animations[0]);
  const [textShadow, setTextShadow] = useState("none");
  const [opacity, setOpacity] = useState(1);
  const [glowEffect, setGlowEffect] = useState(false);
  const [designElements, setDesignElements] = useState([]);
  const [customTextElements, setCustomTextElements] = useState([]);
  const [isStyleOptionsOpen, setIsStyleOptionsOpen] = useState(false);
  const [isDesignsModalOpen, setIsDesignsModalOpen] = useState(false);

  const editorRef = useRef(null);

  const defaultTextStyle = {
    color: "#ffffff",
    fontFamily: fontStyles["Classic"],
    textShadow: "none",
    opacity: 1,
    filter: "none",
  };

  const getSelectedTextStyle = () => ({
    color: selectedColor,
    fontFamily: fontStyles[selectedFont],
    textShadow: textShadow,
    opacity: opacity,
    filter: glowEffect ? `drop-shadow(0 0 8px ${selectedColor}80)` : "none",
  });

  const updateSelectedElementStyle = (newStyle) => {
    if (selectedElement) {
      setInvitationText((prev) => ({
        ...prev,
        [selectedElement]: {
          ...prev[selectedElement],
          style: { ...prev[selectedElement].style, ...newStyle },
          animation: selectedAnimation.variant,
        },
      }));
    }
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    if (template.invitationData) {
      setInvitationText(
        Object.fromEntries(
          Object.entries(template.invitationData).map(([key, value]) => [
            key,
            { text: value, style: defaultTextStyle, animation: animations[0].variant },
          ])
        )
      );
    } else {
      setInvitationText({});
    }
    setDesignElements([]);
    setCustomTextElements([]);
    setSelectedElement(null);
  };

  const updateTextField = (field, value) => {
    setInvitationText((prev) => ({
      ...prev,
      [field]: { ...prev[field], text: value },
    }));
  };

  const applyStyleToSelected = () => {
    if (selectedElement) {
      setInvitationText((prev) => ({
        ...prev,
        [selectedElement]: {
          ...prev[selectedElement],
          style: getSelectedTextStyle(),
          animation: selectedAnimation.variant,
        },
      }));
    }
  };

  const handleSelectElement = (field) => {
    setSelectedElement(field);
    if (invitationText[field]) {
      const { style, animation } = invitationText[field];
      setSelectedColor(style.color);
      setSelectedFont(Object.keys(fontStyles).find((key) => fontStyles[key] === style.fontFamily) || "Classic");
      setTextShadow(style.textShadow);
      setOpacity(parseFloat(style.opacity));
      setGlowEffect(style.filter !== "none");
      setSelectedAnimation(animations.find((anim) => JSON.stringify(anim.variant) === JSON.stringify(animation)) || animations[0]);
    }
  };

  const handleEditorClick = (e) => {
    if (e.target === editorRef.current || !e.target.closest(".group")) {
      
      setSelectedElement(null);
    }
  };

  const deleteInvitationTextField = (field) => {
    setInvitationText((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    if (selectedElement === field) setSelectedElement(null);
  };

  const addDesignElement = (design) => {
    setDesignElements([...designElements, { ...design, initialPosition: { x: 50, y: -250 } }]);
  };

  const removeDesignElement = (index) => {
    setDesignElements(designElements.filter((_, i) => i !== index));
  };

  const addCustomTextElement = () => {
    setCustomTextElements([...customTextElements, { text: "Enter text here", initialPosition: { x: 100, y: 100 } }]);
  };

  const updateCustomTextElement = (index, newText) => {
    const updatedElements = [...customTextElements];
    updatedElements[index].text = newText;
    setCustomTextElements(updatedElements);
  };

  const removeCustomTextElement = (index) => {
    setCustomTextElements(customTextElements.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="py-4 px-4 md:py-6 md:px-8 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-400" />
          <h1 className="text-xl md:text-2xl font-light"> Invitation Editor</h1>
        </div>
        <button
          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center gap-2 transition-colors"
          onClick={handleSaveImage}
        >
          Download
        </button>
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)]">
        {/* Templates Section */}
        <div className="w-full md:w-72 border-b md:border-r border-white/10 p-4 md:p-6 overflow-x-auto md:overflow-y-auto">
          <h2 className="text-lg font-medium mb-4">Templates</h2>
          <div className="flex md:grid md:grid-cols-1 gap-4 whitespace-nowrap md:whitespace-normal overflow-x-auto pb-4 md:pb-0">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`group relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] flex-shrink-0 w-40 md:w-full ${
                  selectedTemplate?.id === template.id ? "ring-2 ring-rose-400" : ""
                }`}
                onClick={() => handleTemplateClick(template)}
              >
                <img src={template.image} alt={template.name} className="w-full h-32 md:h-40 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-sm font-medium">{template.name}</span>
                  {template.invitationData && (
                    <div className="text-xs text-white/80 mt-2 hidden md:block">
                      <div>{template.invitationData.eventHeading}</div>
                      <div>{template.invitationData.eventSubheading}</div>
                      <div>{template.invitationData.groomName} & {template.invitationData.brideName}</div>
                      <div>{template.invitationData.eventDate}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Section */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto" onClick={handleEditorClick}>
        <div
          ref={editorRef}
          className="max-w-[90vw] md:max-w-[63vh] h-[65vh] md:h-[95vh] mx-auto rounded-xl p-6 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, rgb(30, 41, 59), rgb(15, 23, 42))",
          }}
        >
          {selectedTemplate && (
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
                zIndex: 0,
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
                        onSelect={() => handleSelectElement("eventHeading")}
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
                        onSelect={() => handleSelectElement("eventSubheading")}
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
                          onSelect={() => handleSelectElement("groomName")}
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
                          onSelect={() => handleSelectElement("brideName")}
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
                          onSelect={() => handleSelectElement("eventDate")}
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
                          onSelect={() => handleSelectElement("weddingTime")}
                        />
                      )}
                      {invitationText.weddingLocation && (
                        <EditableText
                          value={invitationText.weddingLocation.text}
                          onChange={(value) => updateTextField("weddingLocation", value)}
                          onDelete={() => deleteInvitationTextField("weddingLocation")}
                          style={invitationText.weddingLocation.style}
                          className="text-sm md:text-base italic "
                          animation={invitationText.weddingLocation.animation}
                          isSelected={selectedElement === "weddingLocation"}
                          onSelect={() => handleSelectElement("weddingLocation")}
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
                          onSelect={() => handleSelectElement("description")}
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
                  onRemove={removeDesignElement}
                  initialPosition={element.initialPosition}
                  index={index}
                />
              ))}
              {customTextElements.map((element, index) => (
                <CustomTextElement
                  key={index}
                  text={element.text}
                  onChange={(newText) => updateCustomTextElement(index, newText)}
                  onRemove={removeCustomTextElement}
                  initialPosition={element.initialPosition}
                  index={index}
                  textStyle={selectedElement === `custom-${index}` ? getSelectedTextStyle() : defaultTextStyle}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Style Options Section */}
        <div className="w-full md:w-72 border-t md:border-l border-white/10 p-4 md:p-6 overflow-y-auto relative">
          <button
            className="md:hidden flex items-center gap-2 text-rose-400 mb-4"
            onClick={() => setIsStyleOptionsOpen(!isStyleOptionsOpen)}
          >
            <Menu className="w-6 h-6" />
            Style Options
          </button>
          <div
            className={`${
              isStyleOptionsOpen ? "block" : "hidden"
            } md:block space-y-6 md:space-y-6 h-[20vh]`}
          >
            <h2 className="text-lg font-medium mb-4">Style Options</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Color Theme</label>
                <div className="grid grid-cols-6 gap-2">
                  {["#F43F5E", "#8B5CF6", "#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#728156", "#ffffff", "#073a4b", "#990302", "#b950c1", "#036d59"].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedColor(color);
                        updateSelectedElementStyle({ color });
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Font Style</label>
                <div className="space-y-2">
                  {Object.keys(fontStyles).map((font) => (
                    <button
                      key={font}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedFont === font ? "bg-white/10" : "hover:bg-white/5"}`}
                      onClick={() => {
                        setSelectedFont(font);
                        updateSelectedElementStyle({ fontFamily: fontStyles[font] });
                      }}
                      style={{ fontFamily: fontStyles[font] }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Animation</label>
                <div className="space-y-2">
                  {animations.map((anim) => (
                    <button
                      key={anim.name}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedAnimation.name === anim.name ? "bg-white/10" : "hover:bg-white/5"}`}
                      onClick={() => {
                        setSelectedAnimation(anim);
                        updateSelectedElementStyle({});
                      }}
                    >
                      {anim.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-rose-200">Text Shadow</label>
                <select
                  className="w-full bg-black/30 border border-rose-400/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                  value={textShadow}
                  onChange={(e) => {
                    setTextShadow(e.target.value);
                    updateSelectedElementStyle({ textShadow: e.target.value });
                  }}
                >
                  <option value="none">None</option>
                  <option value="1px 1px 2px rgba(0,0,0,0.3)">Soft Shadow</option>
                  <option value="2px 2px 4px rgba(0,0,0,0.5)">Bold Shadow</option>
                  <option value="0 0 10px rgba(0,0,0,0.7)">Glow Shadow</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-rose-200">Text Opacity</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => {
                    setOpacity(parseFloat(e.target.value));
                    updateSelectedElementStyle({ opacity: parseFloat(e.target.value) });
                  }}
                  className="w-full accent-rose-400"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-rose-200 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Glow Effect
                </label>
                <motion.button
                  className={`w-full px-4 py-3 rounded-lg border border-rose-400/50 ${glowEffect ? "bg-rose-500/20" : "bg-black/30"}`}
                  onClick={() => {
                    setGlowEffect(!glowEffect);
                    updateSelectedElementStyle({
                      filter: !glowEffect ? `drop-shadow(0 0 8px ${selectedColor}80)` : "none",
                    });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {glowEffect ? "On" : "Off"}
                </motion.button>
              </div>

              <div className="space-y-3">
                <button
                  className="w-full px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center gap-2 transition-colors md:hidden"
                  onClick={() => setIsDesignsModalOpen(true)}
                >
                  <Layers className="w-4 h-4" />
                  Designs
                </button>
                <div className="hidden md:block">
                  <h2 className="text-lg font-medium mb-4">Designs</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2 flex flex-col items-center justify-center"
                      onClick={addCustomTextElement}
                    >
                      <Type className="w-10 h-10 text-rose-400" />
                      <span className="text-xs text-center block mt-1">Add Text</span>
                    </div>
                    {designs.map((design) => (
                      <div
                        key={design.id}
                        className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2"
                        onClick={() => addDesignElement(design)}
                      >
                        <img src={design.src} alt={design.name} className="w-full h-20 object-contain" />
                        <span className="text-xs text-center block mt-1">{design.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Designs Modal for Small Screens */}
        {isDesignsModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Designs</h2>
                <button
                  className="text-rose-400"
                  onClick={() => setIsDesignsModalOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2 flex flex-col items-center justify-center"
                  onClick={() => {
                    addCustomTextElement();
                    setIsDesignsModalOpen(false);
                  }}
                >
                  <Type className="w-10 h-10 text-rose-400" />
                  <span className="text-xs text-center block mt-1">Add Text</span>
                </div>
                {designs.map((design) => (
                  <div
                    key={design.id}
                    className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2"
                    onClick={() => {
                      addDesignElement(design);
                      setIsDesignsModalOpen(false);
                    }}
                  >
                    <img src={design.src} alt={design.name} className="w-full h-20 object-contain" />
                    <span className="text-xs text-center block mt-1">{design.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview_2;