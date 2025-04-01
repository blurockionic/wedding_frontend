import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import Sidebar from "../../components/InvitationEditor/Sidebar";
import CanvasArea from "../../components/InvitationEditor/CanvasArea";
import StyleOptions from "../../components/InvitationEditor/StyleOptions";
import MobileSidebar from "../../components/InvitationEditor/MobileSidebar";
import { MdDelete } from "react-icons/md";
import image_7 from "../../../public/image_7.jpg";
import image_5 from "../../../public/image_5.jpg";
import image_2 from "../../../public/image_2.jpg";
import { useCreateTemplateMutation } from "../../redux/invitationTemplateForAdminSlice";
import { useSelector } from "react-redux";
import { useUplMutation } from "../../redux/uploadSlice";
import { toast } from "react-toastify";

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
  { id: 4, image: image_2, name: "Garden Party" },
];
const designs = [
  {
    id: 1,
    type: "simple",
    src: "https://media-public.canva.com/klens/MAGLrqklens/1/wm_s.png",
    name: "Simple",
  },
  {
    id: 2,
    type: "simple",
    src: "https://media-public.canva.com/oAk6E/MAGdkaoAk6E/1/wm_s.png",
    name: "Simple",
  },
  {
    id: 3,
    type: "simple",
    src: "https://media-public.canva.com/A1cqE/MAFUCvA1cqE/1/wm_s.png",
    name: "Simple",
  },
  {
    id: 4,
    type: "simple",
    src: "https://cdn-icons-png.freepik.com/128/833/833472.png",
    name: "Heart",
  },
  {
    id: 5,
    type: "flower",
    src: "https://media-public.canva.com/9Flno/MAE3p19Flno/1/s.png",
    name: "Flower",
  },
  {
    id: 6,
    type: "simple",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPunu0maTxQ0HJubMobBDJWFZ8enKyuue7_C_-p9Nl6hmpZ2Xzdww2EGzHFYYRzSs8Ug8&usqp=CAU",
    name: "Butterfly",
  },
  {
    id: 7,
    type: "simple",
    src: "https://media-public.canva.com/f9DYg/MAFAAcf9DYg/1/wm_s.png",
    name: "Butterfly",
  },
  {
    id: 8,
    type: "flower",
    src: "https://media-public.canva.com/FM-T4/MAFTTIFM-T4/1/s.png",
    name: "Daisy",
  },
  {
    id: 6,
    type: "flower",
    src: "https://media-public.canva.com/_CllM/MAEGoA_CllM/1/s.png",
    name: "Floral Border",
  },
  {
    id: 9,
    type: "decoration",
    src: "https://media-public.canva.com/r94T4/MAFSXar94T4/1/t.png",
    name: "Floral Border",
  },
  {
    id: 10,
    type: "decoration",
    src: "https://media-public.canva.com/a9H5E/MAFSXUa9H5E/1/t.png",
    name: "Floral Border",
  },
  {
    id: 11,
    type: "decoration",
    src: "https://media-public.canva.com/Thm7M/MAEpaoThm7M/1/tl.png",
    name: "Floral Border",
  },
  {
    id: 12,
    type: "decoration",
    src: "https://media-public.canva.com/Bc9E4/MAFy8mBc9E4/1/tl.png",
    name: "Floral Border",
  },
  {
    id: 13,
    type: "decoration",
    src: "https://media-public.canva.com/yp8ok/MAFy8nyp8ok/1/tl.png",
    name: "Floral Border",
  },
  {
    id: 14,
    type: "decoration",
    src: "https://media-public.canva.com/8yOyw/MAFxKe8yOyw/1/t.png",
    name: " Border",
  },
  {
    id: 15,
    type: "decoration",
    src: "https://media-public.canva.com/P_fWc/MAGbc2P_fWc/1/t.png",
    name: " Border",
  },
  {
    id: 16,
    type: "border",
    src: "https://media-public.canva.com/eEzrc/MAELm9eEzrc/1/s.png",
    name: "Simple Border",
  },
  {
    id: 17,
    type: "border",
    src: "https://media-public.canva.com/xAZGw/MAEzsgxAZGw/1/s.png",
    name: "Elegant Border",
  },
  {
    id: 18,
    type: "border",
    src: "https://media-public.canva.com/MADdwktn_NQ/1/screen.png",
    name: "Curved Border",
  },
  {
    id: 19,
    type: "flower",
    src: "https://media-public.canva.com/b5rno/MAF2Mbb5rno/1/tl.png",
    name: "Orchid",
  },
  {
    id: 20,
    type: "flower",
    src: "https://media-public.canva.com/ZLivU/MADbgtZLivU/2/t.png",
    name: "Orchid",
  },
  {
    id: 21,
    type: "flower",
    src: "https://media-public.canva.com/vXATQ/MAFoZRvXATQ/1/wm_s.png",
    name: "Yellow Rose",
  },
  {
    id: 22,
    type: "flower",
    src: "https://media-public.canva.com/BrHgo/MAFoZSBrHgo/1/wm_s.png",
    name: "White Rose",
  },
  {
    id: 23,
    type: "flower",
    src: "https://media-public.canva.com/MAAvXYuX-EI/2/screen.png",
    name: "Calendula",
  },
  {
    id: 24,
    type: "wallpaper",
    src: "https://cdn.pixabay.com/photo/2022/11/10/00/57/lake-7581726_1280.jpg",
    name: "Floral Elegance",
  },
  {
    id: 25,
    type: "wallpaper",
    src: "https://media-public.canva.com/Y7uKQ/MAEg9SY7uKQ/1/s.jpg",
    name: "Pastel Waves",
  },
  {
    id: 26,
    type: "wallpaper",
    src: "https://cdn.pixabay.com/photo/2022/10/05/00/52/fantasy-7499397_1280.jpg",
    name: "Golden Leaves",
  },
  {
    id: 27,
    type: "wallpaper",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoEcBW_r4jp9FgBXkwf_ktk5j29wv6KBsp6g&s",
    name: "Soft Sky",
  },
  {
    id: 29,
    type: "wallpaper",
    src: "https://cdn.pixabay.com/photo/2022/08/09/16/19/sea-7375377_960_720.jpg",
    name: "Abstract Art",
  },
  {
    id: 30,
    type: "flower",
    src: "https://media-public.canva.com/aWWeU/MAErZ0aWWeU/1/t.png",
    name: "Daisy",
  },
];

const fontStyles = {
  Arial: "Arial, sans-serif",
  "Times New Roman": "Times New Roman, serif",
  "Courier New": "Courier New, monospace",
  Georgia: "Georgia, serif",
};

const animations = [
  {
    name: "Bounce",
    variant: { y: [-10, 10, -5, 5, 0], transition: { duration: 0.6 } },
  },
  {
    name: "Fade In",
    variant: { opacity: [0, 1], transition: { duration: 0.6 } },
  },
  {
    name: "Scale Pop",
    variant: { scale: [0.8, 1.2, 1], transition: { duration: 0.6 } },
  },
  {
    name: "Slide In",
    variant: { x: [-50, 0], opacity: [0, 1], transition: { duration: 0.6 } },
  },
  {
    name: "Blinking",
    variant: {
      opacity: [1, 0, 1],
      transition: { duration: 1, repeat: Infinity },
    },
  },
  {
    name: "Wave",
    variant: {
      y: [0, -10, 0, 10, 0],
      transition: { duration: 1.5, repeat: Infinity },
    },
  },
];

const Canva = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [isStyleOptionsOpen, setIsStyleOptionsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#F43F5E");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedAnimation, setSelectedAnimation] = useState(animations[0]);
  const [textShadow, setTextShadow] = useState("none");
  const [opacity, setOpacity] = useState(1);
  const [glowEffect, setGlowEffect] = useState(false);

  const [textEffects, setTextEffects] = useState({
    glow: false,
    outline: "none",
    shadow: "none",
    gradient: false,
    curved: false,
    emoji: "",
    alignment: "center",
    letterSpacing: 0,
    lineHeight: 1,
  });

  const [createTemplate] = useCreateTemplateMutation();
  const { user } = useSelector((state) => state.auth);
  const [upl] = useUplMutation();

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 600,
      backgroundColor: "#fff",
    });
    setCanvas(fabricCanvas);

    fabricCanvas.on("selection:created", (event) => {
      const activeObject = event.target;
      if (activeObject) {
        setSelectedText(activeObject.type === "i-text" ? activeObject : null);
        setSelectedColor(activeObject.fill || "#F43F5E");
        setSelectedFont(activeObject.fontFamily || "Arial");
        setOpacity(activeObject.opacity || 1);
        setTextShadow(
          activeObject.shadow ? activeObject.shadow.toString() : "none"
        );
        setGlowEffect(
          activeObject.shadow && activeObject.shadow.includes("8px")
        );
        if (activeObject.type === "i-text") {
          setIsStyleOptionsOpen(true);
        } else {
          setIsStyleOptionsOpen(false);
        }
      }
    });

    fabricCanvas.on("selection:updated", (event) => {
      const activeObject = event.target;
      if (activeObject) {
        setSelectedText(activeObject.type === "i-text" ? activeObject : null);
        setSelectedColor(activeObject.fill || "#F43F5E");
        setSelectedFont(activeObject.fontFamily || "Arial");
        setOpacity(activeObject.opacity || 1);
        setTextShadow(
          activeObject.shadow ? activeObject.shadow.toString() : "none"
        );
        setGlowEffect(
          activeObject.shadow && activeObject.shadow.includes("8px")
        );
        if (activeObject.type === "i-text") {
          setIsStyleOptionsOpen(true);
        } else {
          setIsStyleOptionsOpen(false);
        }
      }
    });

    fabricCanvas.on("selection:cleared", () => {
      setSelectedText(null);
      setSelectedColor("#F43F5E");
      setSelectedFont("Arial");
      setOpacity(1);
      setTextShadow("none");
      setGlowEffect(false);
      setIsStyleOptionsOpen(false);
    });

    const handleKeyDown = (e) => {
      if (e.key === "Delete") {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject) {
          fabricCanvas.remove(activeObject);
          fabricCanvas.renderAll();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      fabricCanvas.dispose();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const addCustomTextElement = (text, size, style) => {
    if (!canvas) return;
    const fabricText = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontSize: size,
      fill: style.fill || selectedColor,
      fontFamily: style.fontFamily || fontStyles[selectedFont],
      fontWeight: style.fontWeight || "normal",
      fontStyle: style.fontStyle || "normal",
      textAlign: style.textAlign || "left",
      selectable: true,
      hasControls: true,
      shadow: style.shadow || "",
      stroke: style.stroke || null,
      strokeWidth: style.strokeWidth || 0,
      angle: style.angle || 0,
      charSpacing: style.charSpacing || 0,
      lineHeight: style.lineHeight || 1,
    });
    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();
    setSelectedText(fabricText);
    setIsStyleOptionsOpen(true);
  };

  const handleImageUpload = (imageUrl) => {
    if (!canvas) return;
    const imgElement = new Image();
    imgElement.src = imageUrl;
    imgElement.onload = () => {
      const fabricImage = new fabric.Image(imgElement, {
        left: 100,
        top: 100,
        scaleX: 0.06,
        scaleY: 0.1,
        selectable: true,
        hasControls: true,
      });
      canvas.add(fabricImage);
      canvas.renderAll();
    };
  };

  const addTemplateToCanvas = (image) => {
    if (!canvas) return;
    const imgElement = new Image();
    imgElement.src = image;
    const templateImg = new fabric.Image(imgElement, {
      left: 50,
      top: 50,
      scaleX: 0.5,
      scaleY: 0.5,
      selectable: true,
      hasControls: true,
    });
    canvas.add(templateImg);
    canvas.renderAll();
  };

  const applyAnimation = (object, animation) => {
    if (!object || object.type !== "i-text") return;

    // Stop any existing animations
    if (object.__animation) {
      fabric.util.cancelAnimFrame(object.__animation);
      delete object.__animation;
    }

    const { name, variant } = animation;
    const { transition } = variant;
    const duration = transition.duration * 1000; // Convert to ms
    const repeat = transition.repeat === Infinity;

    const animateFrame = (timestamp) => {
      if (!object.__animationStart) object.__animationStart = timestamp;
      const elapsed = timestamp - object.__animationStart;
      const progress = Math.min(elapsed / duration, 1);

      switch (name) {
        case "Bounce":
          const bounceY =
            variant.y[Math.floor(progress * (variant.y.length - 1))];
          object.set("top", object.originalTop + bounceY);
          break;
        case "Fade In":
          const fadeOpacity =
            variant.opacity[0] +
            (variant.opacity[1] - variant.opacity[0]) * progress;
          object.set("opacity", fadeOpacity);
          break;
        case "Scale Pop":
          const scaleValue =
            variant.scale[Math.floor(progress * (variant.scale.length - 1))];
          object.set("scaleX", scaleValue);
          object.set("scaleY", scaleValue);
          break;
        case "Slide In":
          const slideX =
            variant.x[0] + (variant.x[1] - variant.x[0]) * progress;
          const slideOpacity =
            variant.opacity[0] +
            (variant.opacity[1] - variant.opacity[0]) * progress;
          object.set("left", object.originalLeft + slideX);
          object.set("opacity", slideOpacity);
          break;
        case "Blinking":
          const blinkOpacity =
            variant.opacity[
              Math.floor((elapsed / duration) % variant.opacity.length)
            ];
          object.set("opacity", blinkOpacity);
          break;
        case "Wave":
          const waveY =
            variant.y[Math.floor((elapsed / duration) % variant.y.length)];
          object.set("top", object.originalTop + waveY);
          break;
        default:
          break;
      }

      canvas.renderAll();

      if (repeat || progress < 1) {
        object.__animation = fabric.util.requestAnimFrame(animateFrame);
      } else {
        delete object.__animation;
        delete object.__animationStart;
      }
    };

    // Store original positions
    object.originalTop = object.top;
    object.originalLeft = object.left;

    // Start animation
    object.__animation = fabric.util.requestAnimFrame(animateFrame);
  };

  const updateSelectedElementStyle = (styles) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== "i-text") return;

    if (styles.color) {
      activeObject.set("fill", styles.color);
    }
    if (styles.fontFamily) {
      activeObject.set("fontFamily", styles.fontFamily);
    }
    if (styles.textShadow) {
      activeObject.set(
        "shadow",
        styles.textShadow === "none" ? null : styles.textShadow
      );
    }
    if (styles.opacity !== undefined) {
      activeObject.set("opacity", styles.opacity);
    }
    if (styles.animation) {
      applyAnimation(activeObject, styles.animation);
    }
    if (styles.glow !== undefined) {
      if (styles.glow) {
        activeObject.set("shadow", `0 0 8px ${selectedColor}`);
      } else {
        activeObject.set(
          "shadow",
          styles.textShadow === "none" ? null : styles.textShadow
        );
      }
    }
    canvas.renderAll();
  };

  const downloadImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "wedding-template.png";
    link.click();
  };

  //save the template on cloud
  const saveTemplate = async () => {
    if (!canvas || !user?.id) {
      console.error("Canvas or user ID is missing!");
      return;
    }
  
    console.log("Saving template...");
  
    try {
      // Convert Fabric.js canvas to JSON
      const jsonData = canvas.toJSON();
  
      // Ensure all images have crossOrigin set to avoid CORS issues
      canvas.getObjects().forEach((obj) => {
        if (obj.type === "image" && !obj.crossOrigin) {
          obj.crossOrigin = "anonymous";
        }
      });
  
      // Convert canvas to Base64 image
      const dataURL = canvas.toDataURL("image/png");
  
      // Convert Base64 to Blob
      const response = await fetch(dataURL);
      const blob = await response.blob();
  
      console.log("Blob Data:", blob); // Debugging
  
      if (blob.size === 0) {
        console.error("Blob is empty!");
        return;
      }
  
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", blob, "thumbnail.png");
  
      console.log("Uploading file...");
  
      // Upload the image to Cloudinary or backend storage
      const uploadResponse = await upl(formData);
      
      // Ensure the response is valid
      if (!uploadResponse) {
        throw new Error("Thumbnail upload failed!");
      }
  
      // Ensure response structure is correct
    const data =  uploadResponse.data 

    console.log("Upload response:", data.file?.path);

    if (!data?.file?.path) {
      throw new Error("Thumbnail upload did not return a valid URL!");
    }

    console.log("Thumbnail uploaded successfully:", data.file?.path);
  
      // Construct the template object
      const newTemplate = {
        name: "True Love",
        jsonData,
        price: 0,
        categoryByMood: "LOVE",
        additionalTags: ["elegant", "romantic", "love"],
        userId: user?.id,
        thumbnailUrl: data.file?.path, // Use uploaded image URL
      };
  
      console.log("Saving template to DB...", newTemplate);
  
      // Save the template in the database
      const saveResponse = await createTemplate(newTemplate);
  
      const {success, message} = saveResponse.data 
      if (success) {
        toast.success(message)
      }
  
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };
  

  const loadTemplate = () => {
    if (!canvas) return;
    const savedJson = localStorage.getItem("savedTemplate");
    if (savedJson) {
      canvas.loadFromJSON(savedJson, () => {
        canvas.renderAll();
        alert("Template loaded successfully!");
      });
    } else {
      alert("No saved template found!");
    }
  };

  const addDesignElement = (design) => {
    if (!canvas) return;
    const imgElement = new Image();
    imgElement.src = design.src;
    const designImg = new fabric.Image(imgElement, {
      left: 150,
      top: 150,
      scaleX: 0.3,
      scaleY: 0.3,
      selectable: true,
      hasControls: true,
    });
    canvas.add(designImg);
    canvas.renderAll();
  };

  const onWallpaperSelect = (src) => {
    if (!canvas) return;
    fabric.Image.fromURL(
      src,
      (img) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      },
      { crossOrigin: "anonymous" }
    );
  };
  const deleteSelectedObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Mobile Sidebar (Visible only on mobile) */}
      <div className="block md:hidden w-full flex-shrink-0">
        <MobileSidebar
          templates={templates}
          designs={designs}
          handleImageUpload={handleImageUpload}
          addTemplateToCanvas={addTemplateToCanvas}
          downloadImag
          saveTemplate={saveTemplate}
          loadTemplate={loadTemplate}
          addDesignElement={addDesignElement}
          onWallpaperSelect={onWallpaperSelect}
          addCustomTextElement={addCustomTextElement}
          textEffects={textEffects}
          setTextEffects={setTextEffects}
        />
      </div>
      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Original Sidebar (Visible only on large screens) */}
        <div className="hidden md:flex md:h-full md:flex-shrink-0">
          <Sidebar
            templates={templates}
            designs={designs}
            handleImageUpload={handleImageUpload}
            addTemplateToCanvas={addTemplateToCanvas}
            downloadImage={downloadImage}
            saveTemplate={saveTemplate}
            loadTemplate={loadTemplate}
            addDesignElement={addDesignElement}
            onWallpaperSelect={onWallpaperSelect}
            addCustomTextElement={addCustomTextElement}
            textEffects={textEffects}
            setTextEffects={setTextEffects}
          />
        </div>
        <div className="flex flex-grow bg-slate-300">
          <CanvasArea canvasRef={canvasRef} />
        </div>
        {/* Canvas and StyleOptions */}
        <div className="flex flex-col md:flex-row  overflow-hidden bg-black">
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
            updateSelectedElementStyle={updateSelectedElementStyle}
          />
        </div>
        <button
          onClick={deleteSelectedObject}
          className="absolute top-1 right-1 bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 z-10 md:hidden block"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Canva;
