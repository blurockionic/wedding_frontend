import React, { useState, useRef } from "react";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
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
  { id: 1, image: image_7, name: "Classic Elegance", invitationData: { eventHeading: "WE INVITE YOU", eventSubheading: "TO CELEBRATE OUR WEDDING", groomName: "Aarav", brideName: "Aarohi", eventDate: "Saturday, May 24th", weddingTime: "2:00 PM", weddingLocation: "Grace Church, Greentown", description: "A reception will follow immediately after the ceremony." } },
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
  { id: 1, type: "simple", src: "https://media-public.canva.com/klens/MAGLrqklens/1/wm_s.png", name: "Simple" },
  { id: 2, type: "simple", src: "https://media-public.canva.com/oAk6E/MAGdkaoAk6E/1/wm_s.png", name: "Simple" },
  { id: 3, type: "simple", src: "https://media-public.canva.com/A1cqE/MAFUCvA1cqE/1/wm_s.png", name: "Simple" },
  { id: 4, type: "simple", src: "https://cdn-icons-png.freepik.com/128/833/833472.png", name: "Heart" },
  { id: 5, type: "flower", src: "https://media-public.canva.com/9Flno/MAE3p19Flno/1/s.png", name: "Flower" },
  { id: 6, type: "simple", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPunu0maTxQ0HJubMobBDJWFZ8enKyuue7_C_-p9Nl6hmpZ2Xzdww2EGzHFYYRzSs8Ug8&usqp=CAU", name: "Butterfly" },
  { id: 7, type: "simple", src: "https://media-public.canva.com/f9DYg/MAFAAcf9DYg/1/wm_s.png", name: "Butterfly" },
  { id: 8, type: "flower", src: "https://media-public.canva.com/FM-T4/MAFTTIFM-T4/1/s.png", name: "Daisy" },
  { id: 6, type: "flower", src: "https://media-public.canva.com/_CllM/MAEGoA_CllM/1/s.png", name: "Floral Border" },
  { id: 9, type: "decoration", src: "https://media-public.canva.com/r94T4/MAFSXar94T4/1/t.png", name: "Floral Border" },
  { id: 10, type: "decoration", src: "https://media-public.canva.com/a9H5E/MAFSXUa9H5E/1/t.png", name: "Floral Border" },

  { id: 11, type: "decoration", src: "https://media-public.canva.com/Thm7M/MAEpaoThm7M/1/tl.png", name: "Floral Border" },
  { id: 12, type: "decoration", src: "https://media-public.canva.com/Bc9E4/MAFy8mBc9E4/1/tl.png", name: "Floral Border" },
  { id: 13, type: "decoration", src: "https://media-public.canva.com/yp8ok/MAFy8nyp8ok/1/tl.png", name: "Floral Border" },
  { id: 14, type: "decoration", src: "https://media-public.canva.com/8yOyw/MAFxKe8yOyw/1/t.png", name: " Border" },
  { id: 15, type: "decoration", src: "https://media-public.canva.com/P_fWc/MAGbc2P_fWc/1/t.png", name: " Border" },

  { id: 16, type: "border", src: "https://media-public.canva.com/eEzrc/MAELm9eEzrc/1/s.png", name: "Simple Border" },
  { id: 17, type: "border", src: "https://media-public.canva.com/xAZGw/MAEzsgxAZGw/1/s.png", name: "Elegant Border" },
  { id: 18, type: "border", src: "https://media-public.canva.com/MADdwktn_NQ/1/screen.png", name: "Curved Border" },
  { id: 19, type: "flower", src: "https://media-public.canva.com/b5rno/MAF2Mbb5rno/1/tl.png", name: "Orchid" },
  { id: 20, type: "flower", src: "https://media-public.canva.com/ZLivU/MADbgtZLivU/2/t.png", name: "Orchid" },
  { id: 21, type: "flower", src: "https://media-public.canva.com/vXATQ/MAFoZRvXATQ/1/wm_s.png", name: "Yellow Rose" },
  { id: 22, type: "flower", src: "https://media-public.canva.com/BrHgo/MAFoZSBrHgo/1/wm_s.png", name: "White Rose" },
  { id: 23, type: "flower", src: "https://media-public.canva.com/MAAvXYuX-EI/2/screen.png", name: "Calendula" },
  { id: 24, type: "wallpaper", src: "https://cdn.pixabay.com/photo/2022/11/10/00/57/lake-7581726_1280.jpg", name: "Floral Elegance" },
  { id: 25, type: "wallpaper", src: "https://media-public.canva.com/Y7uKQ/MAEg9SY7uKQ/1/s.jpg", name: "Pastel Waves" },
  { id: 26, type: "wallpaper", src: "https://cdn.pixabay.com/photo/2022/10/05/00/52/fantasy-7499397_1280.jpg", name: "Golden Leaves" },
  { id: 27, type: "wallpaper", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoEcBW_r4jp9FgBXkwf_ktk5j29wv6KBsp6g&s", name: "Soft Sky" },
  { id: 28, type: "wallpaper", src: "https://wallpapers.com/images/high/simple-pink-ehl0ihj3mdbrrgnu.webp", name: "Pink Bloom" },
  { id: 29, type: "wallpaper", src: "https://cdn.pixabay.com/photo/2022/08/09/16/19/sea-7375377_960_720.jpg", name: "Abstract Art" },
  { id: 30, type: "flower", src: "https://media-public.canva.com/aWWeU/MAErZ0aWWeU/1/t.png", name: "Daisy" },
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
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const editorRef = useRef(null);

  const defaultTextStyle = {
    color: "#000000",
    fontFamily: fontStyles["Classic"],
    textShadow: "none",
    opacity: 1,
    filter: "none",
  };

  const handleDownload = async (format) => {
    setShowDownloadMenu(false);
    if (!editorRef.current) {
      console.error("Editor reference is not available.");
      return;
    }
    try {
      // Store original styles and clean up oklch
      const elements = editorRef.current.getElementsByTagName("*");
      const originalStyles = [];
  
      Array.from(elements).forEach((el) => {
        const computedStyle = window.getComputedStyle(el);
        const bgColor = computedStyle.backgroundColor;
        const color = computedStyle.color;
        const filter = computedStyle.filter;
  
        if (bgColor.includes("oklch") || color.includes("oklch") || (filter.includes("oklch") && !filter.includes("drop-shadow"))) {
          originalStyles.push({
            element: el,
            bgColor: el.style.backgroundColor,
            color: el.style.color,
            filter: el.style.filter,
          });
  
          if (bgColor.includes("oklch")) {
            el.style.backgroundColor = "rgb(30, 41, 59)"; // Safe fallback
          }
          if (color.includes("oklch")) {
            el.style.color = "rgb(0, 0, 0)"; // Safe fallback
          }
          if (filter.includes("oklch") && !filter.includes("drop-shadow")) {
            el.style.filter = "none"; // Only remove invalid filters
          }
        }
  
        // Clean inline styles with oklch, preserve drop-shadow
        if (el.style.cssText.includes("oklch")) {
          originalStyles.push({
            element: el,
            cssText: el.style.cssText,
          });
          el.style.cssText = el.style.cssText.replace(/oklch\([^)]*\)/g, "rgb(0, 0, 0)");
        }
      });
  
      // Wait for styles to apply
      await new Promise((resolve) => setTimeout(resolve, 150));
  
      // Capture the editor
      const canvas = await html2canvas(editorRef.current, {
        useCORS: true,
        scale: 2,
        logging: true,
        backgroundColor: "#1E293B",
        onclone: (doc) => {
          const clonedElements = doc.getElementsByTagName("*");
          Array.from(clonedElements).forEach((el) => {
            const clonedStyle = window.getComputedStyle(el);
            if (clonedStyle.backgroundColor.includes("oklch")) {
              el.style.backgroundColor = "rgb(30, 41, 59)";
            }
            if (clonedStyle.color.includes("oklch")) {
              el.style.color = "rgb(0, 0, 0)";
            }
            if (clonedStyle.filter.includes("oklch") && !clonedStyle.filter.includes("drop-shadow")) {
              el.style.filter = "none";
            }
            if (el.style.cssText.includes("oklch")) {
              el.style.cssText = el.style.cssText.replace(/oklch\([^)]*\)/g, "rgb(0, 0, 0)");
            }
            // Explicitly preserve drop-shadow filter
            if (clonedStyle.filter.includes("drop-shadow")) {
              el.style.filter = clonedStyle.filter; // Ensure filter is copied as-is
            }
          });
        },
      });
  
      // Restore original styles
      originalStyles.forEach(({ element, bgColor, color, filter, cssText }) => {
        if (cssText !== undefined) {
          element.style.cssText = cssText;
        } else {
          element.style.backgroundColor = bgColor || "";
          element.style.color = color || "";
          element.style.filter = filter || "";
        }
      });
  
      const dataUrl = format === "png" ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `invitation.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error capturing the image:", error);
      console.log("Falling back to manual canvas rendering...");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = editorRef.current.offsetWidth;
      canvas.height = editorRef.current.offsetHeight;
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL(format === "png" ? "image/png" : "image/jpeg");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `invitation-fallback.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
    setIsStyleOptionsOpen(false);
    setBackgroundImage(null);
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

  const handleWallpaperSelect = (wallpaperUrl) => {
    setBackgroundImage(wallpaperUrl);
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen text-white">
      <header className="py-1 px-4 md:py-1 md:px-8 flex items-center justify-between border-b border-white/10 bg-gray-300">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-[#F20574]"></h1>
        </div>
        <div className="relative">
          <button
            className="px-11 py-2 bg-[#F20574] hover:bg-rose-600 rounded-md flex items-center gap-2 transition-colors"
            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
          >
            Download
          </button>
          {showDownloadMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleDownload("png")}
              >
                PNG
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleDownload("jpg")}
              >
                JPG
              </button>
            </div>
          )}
        </div>
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
                    addDesignElement={(design) => setDesignElements([...designElements, { ...design, initialPosition: { x: 100, y: 100 } }])}
                    onWallpaperSelect={handleWallpaperSelect}
                  />
                )}
                {activeSection === "text" && (
                  <TextSection
                    addCustomTextElement={(text, size, style, id) =>
                      setCustomTextElements([...customTextElements, { text, initialPosition: { x: 100, y: 100 }, defaultSize: size, style, id }])
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
                <motion.div className="bg-white w-full max-w-md max-h-[80vh] rounded-xl shadow-2xl overflow-y-auto relative">
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
                        addDesignElement={(design) => setDesignElements([...designElements, { ...design, initialPosition: { x: 50, y: -300 } }])}
                        onWallpaperSelect={handleWallpaperSelect}
                      />
                    )}
                    {activeSection === "text" && (
                      <TextSection
                        addCustomTextElement={(text, size, style, id) =>
                          setCustomTextElements([...customTextElements, { text, initialPosition: { x: 100, y: 100 }, defaultSize: size, style, id }])
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
          backgroundImage={backgroundImage}
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
              if (invitationText[selectedElement]) {
                setInvitationText((prev) => ({
                  ...prev,
                  [selectedElement]: {
                    ...prev[selectedElement],
                    style: { ...prev[selectedElement].style, ...newStyle },
                    animation: selectedAnimation.variant,
                  },
                }));
              } else {
                setCustomTextElements((prev) =>
                  prev.map((el) =>
                    el.id === selectedElement ? { ...el, style: { ...el.style, ...newStyle } } : el
                  )
                );
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default UpdateImageEditor;