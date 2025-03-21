import React, { useState, useRef } from "react";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/InvitationEditor/Sidebar.jsx";
import Editor from "../../components/InvitationEditor/Editor.jsx";
import StyleOptions from "../../components/InvitationEditor/StyleOptions.jsx";
import TemplatesSection from "../../components/InvitationEditor/TemplatesSection.jsx";
import ElementsSection from "../../components/InvitationEditor/ElementsSection.jsx";
import TextSection from "../../components/InvitationEditor/TextSection.jsx";
import UploadsSection from "../../components/InvitationEditor/UploadsSection.jsx";
import image_7 from "../../../public/image_7.jpg";
import image_5 from "../../../public/image_5.jpg";
import image_2 from "../../../public/image_2.jpg";
import image_16 from "../../../public/image_6.jpg";

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
  { name: "Blinking", variant: { opacity: [1, 0, 1], transition: { duration: 1, repeat: Infinity } } },
  { name: "Wave", variant: { y: [0, -10, 0, 10, 0], transition: { duration: 1.5, repeat: Infinity } } },
];

const fontStyles = {
  Classic: "'Playfair Display', serif",
  Modern: "'Montserrat', sans-serif",
  Elegant: "'Cormorant Garamond', serif",
  Playful: "'Dancing Script', cursive",
  Minimal: "'Poppins', sans-serif",
};

const designs = [
  { id: 1, type: "simple", src: "https://img.icons8.com/?size=80&id=30ChaRYdaCFM&format=png", name: "Simple" },
  { id: 2, type: "simple", src: "https://cdn-icons-png.freepik.com/128/833/833472.png", name: "Heart" },
  { id: 3, type: "flower", src: "https://media-public.canva.com/9Flno/MAE3p19Flno/1/s.png", name: "Flower" },
  { id: 4, type: "simple", src: "https://media-public.canva.com/Z1J8g/MAFoaaZ1J8g/1/t.png", name: "Butterfly" },
  { id: 5, type: "flower", src: "https://media-public.canva.com/PPCBk/MADwe4PPCBk/1/t.png", name: "Daisy" },
  { id: 6, type: "border", src: "https://media-public.canva.com/_CllM/MAEGoA_CllM/1/s.png", name: "Floral Border" },
  { id: 7, type: "border", src: "https://media-public.canva.com/eEzrc/MAELm9eEzrc/1/s.png", name: "Simple Border" },
  { id: 8, type: "border", src: "https://media-public.canva.com/h_nZI/MAFUO2h_nZI/1/s.png", name: "Elegant Border" },
  { id: 9, type: "border", src: "https://media-public.canva.com/MADdwktn_NQ/1/screen.png", name: "Curved Border" },
  { id: 10, type: "flower", src: "https://media-public.canva.com/b5rno/MAF2Mbb5rno/1/tl.png", name: "Orchid" },
  { id: 11, type: "flower", src: "https://media-public.canva.com/ZLivU/MADbgtZLivU/2/t.png", name: "Orchid" },
  { id: 12, type: "flower", src: "https://media-public.canva.com/vXATQ/MAFoZRvXATQ/1/wm_s.png", name: "Yellow Rose" },
  { id: 13, type: "flower", src: "https://media-public.canva.com/BrHgo/MAFoZSBrHgo/1/wm_s.png", name: "White Rose" },
  { id: 14, type: "flower", src: "https://media-public.canva.com/MAAvXYuX-EI/2/screen.png", name: "Calendula" },
];

const UpdateImageEditor = () => {
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
  const [activeSection, setActiveSection] = useState(null);

  const editorRef = useRef(null);

  const defaultTextStyle = {
    color: "#000000",
    fontFamily: fontStyles["Classic"],
    textShadow: "none",
    opacity: 1,
    filter: "none",
  };

  const handleSaveImage = () => {
    console.log("Save image functionality to be implemented");
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
    setIsStyleOptionsOpen(false); 
  };

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleEditorClick = (e) => {
    if (e.target === editorRef.current || !e.target.closest(".group")) {
      setSelectedElement(null);
      setIsStyleOptionsOpen(false);
    }
  };

  const handleElementSelect = (elementId) => {
    setSelectedElement(elementId);
    setIsStyleOptionsOpen(true);
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="py-1 px-4 md:py-1 md:px-8 flex items-center justify-between border-b border-white/10 md:bg-gray-300 bg-white">
        <div className="flex items-center ">
          <h1 className="text-xl md:text-2xl font-bold text-[#F20574] bg-white"></h1>
        </div>
        <button
          className="px-11 py-2 bg-[#F20574] hover:bg-rose-600 rounded-md flex items-center gap-2 transition-colors"
          onClick={handleSaveImage}
        >
          Download
        </button>
      </header>
      
      <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)]">
        <Sidebar activeSection={activeSection} handleSectionToggle={handleSectionToggle} />

        <AnimatePresence>
          {activeSection && (
            <>
              <div className="hidden md:block w-1/6 bg-gray-300">
                {activeSection === "templates" && (
                  <TemplatesSection
                    templates={templates}
                    onTemplateClick={handleTemplateClick}
                    selectedTemplate={selectedTemplate}
                  />
                )}
                {activeSection === "elements" && (
                  <ElementsSection
                    designs={designs}
                    addDesignElement={(design) => setDesignElements([...designElements, { ...design, initialPosition: { x: 50, y: -250 } }])}
                  />
                )}
                {activeSection === "text" && (
                  <TextSection
                    addCustomTextElement={(text, size, style) =>
                      setCustomTextElements([...customTextElements, { text, initialPosition: { x: 100, y: 100 }, defaultSize: size, style }])
                    }
                  />
                )}
                {activeSection === "uploads" && (
                  <UploadsSection onImageUpload={(imageUrl) => setSelectedTemplate({ ...selectedTemplate, image: imageUrl })} />
                )}
              </div>

              <motion.div
                className="md:hidden fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={popupVariants}
              >
                <motion.div className="bg-white w-full max-w-md max-h-[80vh] rounded-xl shadow-2xl overflow-hidden relative">
                  <button
                    className="absolute top-3 right-3 p-1 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors z-10"
                    onClick={() => setActiveSection(null)}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <div className="h-full overflow-y-auto">
                    {activeSection === "templates" && (
                      <TemplatesSection
                        templates={templates}
                        onTemplateClick={handleTemplateClick}
                        selectedTemplate={selectedTemplate}
                      />
                    )}
                    {activeSection === "elements" && (
                      <ElementsSection
                        designs={designs}
                        addDesignElement={(design) => setDesignElements([...designElements, { ...design, initialPosition: { x: 50, y: -250 } }])}
                      />
                    )}
                    {activeSection === "text" && (
                      <TextSection
                        addCustomTextElement={(text, size, style) =>
                          setCustomTextElements([...customTextElements, { text, initialPosition: { x: 100, y: 100 }, defaultSize: size, style }])
                        }
                      />
                    )}
                    {activeSection === "uploads" && (
                      <UploadsSection onImageUpload={(imageUrl) => setSelectedTemplate({ ...selectedTemplate, image: imageUrl })} />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Editor
          editorRef={editorRef}
          selectedTemplate={selectedTemplate}
          invitationText={invitationText}
          setInvitationText={setInvitationText}
          designElements={designElements}
          customTextElements={customTextElements}
          setDesignElements={setDesignElements}
          setCustomTextElements={setCustomTextElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          onEditorClick={handleEditorClick}
          onElementSelect={handleElementSelect}
        />

        <StyleOptions
          isStyleOptionsOpen={isStyleOptionsOpen}
          setIsStyleOptionsOpen={setIsStyleOptionsOpen}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          selectedAnimation={selectedAnimation}
          setSelectedAnimation={setSelectedAnimation}
          textShadow={textShadow}
          setTextShadow={setTextShadow}
          opacity={opacity}
          setOpacity={setOpacity}
          glowEffect={glowEffect}
          setGlowEffect={setGlowEffect}
          fontStyles={fontStyles}
          animations={animations}
          updateSelectedElementStyle={(newStyle) => {
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
          }}
        />
      </div>
    </div>
  );
};

export default UpdateImageEditor;