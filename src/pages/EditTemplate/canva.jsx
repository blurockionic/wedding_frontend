import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import Sidebar from "../../components/InvitationEditor/Sidebar";
import CanvasArea from "../../components/InvitationEditor/CanvasArea";
import StyleOptions from "../../components/InvitationEditor/StyleOptions";
import MobileSidebar from "../../components/InvitationEditor/MobileSidebar";
import { MdContentCopy, MdContentPaste } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import image_7 from "../../../public/image_7.jpg";
import image_5 from "../../../public/image_5.jpg";
import image_2 from "../../../public/image_2.jpg";
import { useCreateTemplateMutation, useUpdateTemplateMutation } from "../../redux/invitationTemplateForAdminSlice";
import { useSelector } from "react-redux";
import { useUplMutation } from "../../redux/uploadSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import TemplateOtherDetails from "./component/TemplateOtherDetails";
import { Loader2 } from "lucide-react";

const templates = [];
const designs = [];

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

const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const Canva = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [isStyleOptionsOpen, setIsStyleOptionsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedAnimation, setSelectedAnimation] = useState(animations[0]);
  const [textShadow, setTextShadow] = useState("none");
  const [opacity, setOpacity] = useState(1);
  const [glowEffect, setGlowEffect] = useState(false);
  const [textStyle, setTextStyle] = useState("normal");
  const [textBackgroundColor, setTextBackgroundColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [selectedFontSize, setSelectedFontSize] = useState(0);
  const [updateTemplate, { isLoading }] = useUpdateTemplateMutation();

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
  const [showModal, setShowModal] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const [templateId, setTemplateId] =  useState("")
  const initialJsonRef = useRef(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  const [clipboard, setClipboard] = useState(null); // To store the copied object
  const [showIcons, setShowIcons] = useState(false); // Toggle icon visibility

  const location = useLocation();
  const template = location.state?.template;

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 600,
      backgroundColor: "#fff",
      preserveObjectStacking: true,
    });
    setCanvas(fabricCanvas);
  
    const updateTextProperties = (activeObject) => {
      if (activeObject) {
        console.log("Active Object:", activeObject.type, activeObject);
        setSelectedText(activeObject.type === "i-text" ? activeObject : null);
        setSelectedColor(activeObject.fill || "#000000");
        setSelectedFont(activeObject.fontFamily || "Arial");
        setOpacity(activeObject.opacity || 1);
        setTextStyle(
          `${activeObject.fontWeight === "bold" ? "Bold " : ""}${
            activeObject.fontStyle === "italic" ? "Italic " : ""
          }${activeObject.textDecoration === "underline" ? "Underline " : ""}${
            activeObject.textDecoration === "line-through" ? "Strikethrough" : ""
          }`.trim()
        );
        setSelectedFontSize(activeObject.fontSize);
        setTextBackgroundColor(activeObject.textBackgroundColor);
        setTextShadow(activeObject.shadow ? activeObject.shadow.toString() : "none");
        setBackgroundColor(activeObject.backgroundColor);
        setIsStyleOptionsOpen(true); // Har object ke liye khulega

        // Simply show the icons without calculating position
        setShowIcons(true);

        updateCanvasOrder();
      }
    };
  
    fabricCanvas.on("selection:created", (event) => {
      updateTextProperties(event.target);
    });
  
    fabricCanvas.on("selection:updated", (event) => {
      updateTextProperties(event.target);
    });
  
    fabricCanvas.on("object:modified", (event) => {
      updateTextProperties(event.target);
    });
  
    fabricCanvas.on("selection:cleared", () => {
      setSelectedText(null);
      setSelectedColor("#000000");
      setSelectedFont("Arial");
      setTextStyle("normal");
      setOpacity(1);
      setTextShadow("none");
      setGlowEffect(false);
      setIsStyleOptionsOpen(false);
      setShowIcons(false); // Hide icons when selection is cleared
    });
  
    // Handle re-selection of any element
    fabricCanvas.on("mouse:down", (event) => {
      const activeObject = event.target;
      if (activeObject) {
        const validTypes = ["i-text", "circle", "rect", "triangle", "image"];
        if (validTypes.includes(activeObject.type)) {
          updateTextProperties(activeObject);
          fabricCanvas.setActiveObject(activeObject);
          fabricCanvas.renderAll();
        }
      }
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

  //load the template on canvas
  useEffect(() => {
    if (!canvas || !template?.jsonData) {
      console.log("Canvas or template not ready yet:", { canvas, template });
      return;
    }

    canvas.clear();

    // Load the JSON data onto the canvas
    canvas.loadFromJSON(
      template.jsonData,
      () => {
        console.log("Template loaded successfully");

        const objects = canvas.getObjects();
        objects.forEach((obj) => {
          if (obj.type === "image" && obj.src) {
            fabric.Image.fromURL(
              obj.src,
              (img) => {
                img.set({
                  left: obj.left || 0,
                  top: obj.top || 0,
                  scaleX: obj.scaleX || 1,
                  scaleY: obj.scaleY || 1,
                });
                canvas.add(img);
                canvas.renderAll();
              },
              { crossOrigin: "anonymous" }
            );
          }
        });

        canvas.renderAll();
        canvas.requestRenderAll();
      },
      (error) => {
        console.error("Error loading template:", error);
      }
    );

    setTimeout(() => {
      canvas.requestRenderAll();
    }, 0);

    //load initial template
    const json = canvas.toJSON();
    initialJsonRef.current = JSON.stringify(json);
  }, [canvas, template]);

  // Detect refresh or close tab
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const currentJson = JSON.stringify(canvas.toJSON());
      const initialJson = initialJsonRef.current;

      if (currentJson !== initialJson) {
        setShowSavePrompt(true); // Show custom modal

        // Browser fallback to show warning
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
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

  const updateCanvasOrder = () => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    objects.forEach((obj, index) => {
      obj.zIndex = index;
    });
    // Sort by zIndex, ensuring locked objects stay on top
    canvas._objects.sort((a, b) => {
      if (a.lockMovementX && !b.lockMovementX) return 1; // Locked a stays above unlocked b
      if (!a.lockMovementX && b.lockMovementX) return -1; // Locked b stays above unlocked a
      return a.zIndex - b.zIndex; // Normal sorting for unlocked objects
    });
    canvas.renderAll();
  };

  const bringToFront = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      console.warn("No object selected to bring to front");
      return;
    }
    const objects = canvas.getObjects();
    const lockedObjects = objects.filter((obj) => obj.lockMovementX);
    const index = objects.indexOf(activeObject);
    if (
      index === objects.length - 1 ||
      (lockedObjects.length > 0 &&
        index === objects.length - lockedObjects.length - 1)
    ) {
      console.log("Object is already at the front or below locked objects");
      return;
    }
    canvas.remove(activeObject);
    if (lockedObjects.length > 0) {
      canvas._objects.splice(
        objects.length - lockedObjects.length,
        0,
        activeObject
      );
    } else {
      canvas.add(activeObject);
    }
    updateCanvasOrder();
    canvas.setActiveObject(activeObject);
    console.log(
      "Object brought to front:",
      activeObject,
      "New order:",
      canvas.getObjects()
    );
  };

  const sendToBack = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      console.warn("No object selected to send to back");
      return;
    }
    const objects = canvas.getObjects();
    const index = objects.indexOf(activeObject);
    if (index === 0) {
      console.log("Object is already at the back");
      return;
    }
    canvas.remove(activeObject);
    canvas._objects.unshift(activeObject);
    updateCanvasOrder();
    canvas.setActiveObject(activeObject);
    console.log(
      "Object sent to back:",
      activeObject,
      "New order:",
      canvas.getObjects()
    );
  };

  const bringForward = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      console.warn("No object selected to bring forward");
      return;
    }
    const objects = canvas.getObjects();
    const lockedObjects = objects.filter((obj) => obj.lockMovementX);
    const index = objects.indexOf(activeObject);
    if (
      index === objects.length - 1 ||
      (lockedObjects.length > 0 &&
        index === objects.length - lockedObjects.length - 1)
    ) {
      console.log("Object is already at the front or below locked objects");
      return;
    }
    objects.splice(index, 1);
    objects.splice(index + 1, 0, activeObject);
    canvas._objects = objects;
    updateCanvasOrder();
    canvas.setActiveObject(activeObject);
    console.log(
      "Object brought forward:",
      activeObject,
      "New order:",
      canvas.getObjects()
    );
  };

  const sendBackward = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      console.warn("No object selected to send backward");
      return;
    }
    const objects = canvas.getObjects();
    const index = objects.indexOf(activeObject);
    if (index === 0) {
      console.log("Object is already at the back");
      return;
    }
    objects.splice(index, 1);
    objects.splice(index - 1, 0, activeObject);
    canvas._objects = objects;
    updateCanvasOrder();
    canvas.setActiveObject(activeObject);
    console.log(
      "Object sent backward:",
      activeObject,
      "New order:",
      canvas.getObjects()
    );
  };

  const lockObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      console.warn("No object selected to lock");
      return;
    }
    activeObject.set({
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      hasControls: false,
      selectable: true,
    });
    bringToFront(); // Bring locked object to front but below other locked objects
    updateCanvasOrder();
    canvas.renderAll();
    console.log("Object locked and brought to front:", activeObject);
  };

  const unlockObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      console.warn("No object selected to unlock");
      return;
    }
    activeObject.set({
      lockMovementX: false,
      lockMovementY: false,
      lockRotation: false,
      lockScalingX: false,
      lockScalingY: false,
      hasControls: true,
      selectable: true,
    });
    canvas.renderAll();
    console.log("Object unlocked:", activeObject);
  };

  //handle to add image on canvas
  //element adding on canvas by maintaining the cors policy
  const handleImageUpload = (imageUrl) => {
    if (!canvas) return;
  
    const imgElement = new Image();
    imgElement.crossOrigin = "anonymous"; // ✅ Enables CORS
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
  
    imgElement.onerror = () => {
      console.error("Failed to load image. Make sure the URL allows CORS.");
    };
  };
  

  //add template to the canvas
  const addTemplateToCanvas = (template) => {
    const jsonData = template.jsonData
    setTemplateId(template.id)
    if (!canvas) {
      console.error("Canvas is not initialized");
      return;
    }
  
    if (!jsonData || !jsonData.objects || !Array.isArray(jsonData.objects)) {
      console.error("Invalid JSON data:", jsonData);
      return;
    }
  
    canvas.clear();
    console.log("🟡 Loading template...");
  
    console.log(jsonData)
    // Load the JSON onto canvas
    canvas.loadFromJSON(
      jsonData,
      () => {
        console.log("✅ Template JSON loaded");
    
        setTimeout(() => {
          const allObjects = canvas.getObjects();
          console.log("🔍 Objects on canvas after delay:", allObjects);
    
          allObjects.forEach((obj, index) => {
            console.log(`➡️ Object ${index + 1}:`, obj);
    
            if (obj.type.toLowerCase() === "image") {
              const imageUrl = obj.src || obj._originalElement?.src || obj._element?.currentSrc;
              console.log(imageUrl);
    
              if (imageUrl) {
                fabric.Image.fromURL(
                  imageUrl,
                  (img) => {
                    img.set({
                      left: obj.left || 0,
                      top: obj.top || 0,
                      scaleX: obj.scaleX || 1,
                      scaleY: obj.scaleY || 1,
                    });
                    canvas.remove(obj); // remove placeholder image
                    canvas.add(img); // add fresh image
                    canvas.renderAll();
                  },
                  { crossOrigin: "anonymous" }
                );
              }
            }
          });
    
          canvas.renderAll();
        }, 100); // Give it 100ms to complete loading
      },
      (error) => {
        console.error("❌ Error loading template:", error);
      }
    );
    // Force re-render as fallback
    setTimeout(() => {
      canvas.requestRenderAll();
    }, 0);
  };
  

  const applyAnimation = (object, animation) => {
    if (!object || object.type !== "i-text") return;

    if (object.__animation) {
      fabric.util.cancelAnimFrame(object.__animation);
      delete object.__animation;
    }

    const { name, variant } = animation;
    const { transition } = variant;
    const duration = transition.duration * 1000;
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

    object.originalTop = object.top;
    object.originalLeft = object.left;

    object.__animation = fabric.util.requestAnimFrame(animateFrame);
  };

  //update style
  const updateSelectedElementStyle = (styles) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
  
    // Include 'polygon' and 'path' in validTypes
    const validTypes = ["i-text", "circle", "rect", "triangle", "image", "polygon", "path"];
    if (!validTypes.includes(activeObject.type)) return;
  
    // Apply common styles for all valid types
    if (styles.color) activeObject.set("fill", styles.color); // Works for shapes (including polygon, path) and text
    if (styles.opacity !== undefined) activeObject.set("opacity", styles.opacity); // Works for all
  
    // Text-specific styles
    if (activeObject.type === "i-text") {
      if (styles.fontFamily) activeObject.set("fontFamily", styles.fontFamily);
      if (styles.textShadow !== undefined) {
        activeObject.set("shadow", styles.textShadow === "none" ? null : styles.textShadow);
      }
      if (styles.animation) applyAnimation(activeObject, styles.animation);
      if (styles.glow !== undefined) {
        if (styles.glow) {
          activeObject.set("shadow", `0 0 8px ${selectedColor}`);
        } else {
          activeObject.set("shadow", styles.textShadow === "none" ? null : styles.textShadow);
        }
      }
      if (styles.fontStyle) activeObject.set("fontStyle", styles.fontStyle);
      if (styles.fontWeight) activeObject.set("fontWeight", styles.fontWeight);
      if (styles.textDecoration) activeObject.set("textDecoration", styles.textDecoration);
      if (styles.underline !== undefined) activeObject.set("underline", styles.underline);
      if (styles.linethrough !== undefined) activeObject.set("linethrough", styles.linethrough);
      if (styles.textBackgroundColor) activeObject.set("textBackgroundColor", styles.textBackgroundColor);
      if (styles.backgroundColor) activeObject.set("backgroundColor", styles.backgroundColor);
      if (styles.fontSize) activeObject.set("fontSize", parseInt(styles.fontSize));
    }
  
    canvas.renderAll();
  };

  const downloadImage = (format) => {
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }
    const normalizedFormat = format.toLowerCase() === "jpeg" ? "jpeg" : "png";
    const mimeType = `image/${normalizedFormat}`;
    const fileExtension = normalizedFormat === "jpeg" ? "jpg" : "png";
    const quality = normalizedFormat === "jpeg" ? 0.9 : undefined;
    const dataURL = canvas.toDataURL({ format: normalizedFormat, quality });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `wedding-template.${fileExtension}`;
    link.click();
  };

  //save template on cloud
  const saveTemplate = async () => {
    if (!canvas) return;

    await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure all DOM updates are complete

    const targetElement = document.querySelector("canvas"); // Selects the first <canvas> element
    if (!targetElement) return console.error("Capture area not found");


    try {
      const screenshot = await html2canvas(targetElement, {
        allowTaint: false, // Ensures only properly loaded images are included
        useCORS: true, // Allows fetching CORS-enabled images
        backgroundColor: null,
        logging: false,
      });
      // document.body.appendChild(screenshot);

      // return;

      const blob = await new Promise((resolve) =>
        screenshot.toBlob(resolve, "image/png")
      );

      if (!blob) return console.error("Failed to create image blob");

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "your_upload_preset"); // 🔥 Required for unsigned uploads

      const cloudinaryData = await upl(formData).unwrap(); // Your RTK Query mutation
      const url = cloudinaryData.file?.path || cloudinaryData.secure_url;

      const jsonData = canvas.toJSON();

      setTemplateData({
        name: "",
        description: "",
        userId: user?.id,
        jsonData: jsonData,
        price: 0.0,
        categoryByAmount: "FREE",
        categoryByMood: "WEDDING",
        categoryByRequirement: "LATEST",
        additionalTags: [],
        designedBy: user?.user_name,
        thumbnailUrl: url,
        rating: 0.0,
        status: "DRAFT",
        paymentDetails: [],
        orderDetails: [],
      });

      setShowModal(true);
    } catch (err) {
      console.error("Error saving template:", err);
    }
  };

 

  //element adding on canvas by maintaining the cors policy
  const addDesignElement = (design) => {
    if (!canvas) return;
  
    if (design.type === "shape") {
      let shape;
      switch (design.name) {
        case "Circle":
          shape = new fabric.Circle({
            radius: 50,
            left: 100,
            top: 100,
            fill: "#000000",
            selectable: true,
            hasControls: true,
          });
          break;
        case "Square":
          shape = new fabric.Rect({
            width: 100,
            height: 100,
            left: 100,
            top: 100,
            fill: "#000000",
            selectable: true,
            hasControls: true,
          });
          break;
        case "Rectangle":
          shape = new fabric.Rect({
            width: 150,
            height: 100,
            left: 100,
            top: 100,
            fill: "#000000",
            selectable: true,
            hasControls: true,
          });
          break;
        case "Triangle":
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            left: 100,
            top: 100,
            fill: "#000000",
            selectable: true,
            hasControls: true,
          });
          break;
          case "Pentagon":
            shape = new fabric.Polygon(
              [
                { x: 50, y: 0 },
                { x: 100, y: 38 },
                { x: 82, y: 100 },
                { x: 18, y: 100 },
                { x: 0, y: 38 },
              ],
              {
                left: 100,
                top: 100,
                fill: "#000000",
                selectable: true,
                hasControls: true,
              }
            );
            break;
          case "Hexagon":
            shape = new fabric.Polygon(
              [
                { x: 50, y: 0 },
                { x: 93, y: 25 },
                { x: 93, y: 75 },
                { x: 50, y: 100 },
                { x: 7, y: 75 },
                { x: 7, y: 25 },
              ],
              {
                left: 150,
                top: 150,
                fill: "#000000",
                selectable: true,
                hasControls: true,
              }
            );
            break;
          case "Star":
            shape = new fabric.Polygon(
              [
                { x: 50, y: 0 },
                { x: 61, y: 35 },
                { x: 98, y: 35 },
                { x: 68, y: 57 },
                { x: 79, y: 91 },
                { x: 50, y: 70 },
                { x: 21, y: 91 },
                { x: 32, y: 57 },
                { x: 2, y: 35 },
                { x: 39, y: 35 },
              ],
              {
                left: 150,
                top: 150,
                fill: "#000000",
                selectable: true,
                hasControls: true,
              }
            );
            break;
          case "Location":
            shape = new fabric.Path(
              "M 50 10 C 70 10 90 30 90 50 C 90 70 70 90 50 110 C 30 90 10 70 10 50 C 10 30 30 10 50 10 Z",
              {
                left: 150,
                top: 150,
                fill: "#000000",
                selectable: true,
                hasControls: true,
                scaleX: 0.5,
                scaleY: 0.5,
              }
            );
            break;
          case "Diamond":
            shape = new fabric.Polygon(
              [
                { x: 50, y: 0 },
                { x: 100, y: 50 },
                { x: 50, y: 100 },
                { x: 0, y: 50 },
              ],
              {
                left: 150,
                top: 150,
                fill: "#000000",
                selectable: true,
                hasControls: true,
              }
            );
            break;
          case "Octagon":
            shape = new fabric.Polygon(
              [
                { x: 35, y: 0 },
                { x: 65, y: 0 },
                { x: 100, y: 35 },
                { x: 100, y: 65 },
                { x: 65, y: 100 },
                { x: 35, y: 100 },
                { x: 0, y: 65 },
                { x: 0, y: 35 },
              ],
              {
                left: 150,
                top: 150,
                fill: "#000000",
                selectable: true,
                hasControls: true,
              }
            );
          break;
          default:
          return;
      }
      canvas.add(shape);
      canvas.setActiveObject(shape);
      setIsStyleOptionsOpen(true);
      canvas.renderAll();
    } else {
      const imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = design?.url;
  
      imgElement.onload = () => {
        const fabricImage = new fabric.Image(imgElement, {
          left: 100,
          top: 100,
          scaleX: 0.2,
          scaleY: 0.2,
          selectable: true,
          hasControls: true,
        });
        canvas.add(fabricImage);
        canvas.renderAll();
      };
  
      imgElement.onerror = () => {
        console.error("Failed to load image. Make sure the URL allows CORS.");
      };
    }
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

  const handleDelete = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
  
    canvas.remove(activeObject);
    canvas.renderAll();
    toast.success("Element deleted!");
  };

  // Copy function
  const handleCopy = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    activeObject.clone().then((cloned) => {
      setClipboard(cloned);
      toast.success("Element copied!");
    });
  };

  // Paste function
  const handlePaste = async () => {
    if (!canvas || !clipboard) return;

    const clonedObj = await clipboard.clone();
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10, // Offset by 10px
      top: clonedObj.top + 10,
      evented: true,
    });

    if (clonedObj instanceof fabric.ActiveSelection) {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject((obj) => {
        canvas.add(obj);
      });
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }

    clipboard.top += 10;
    clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.renderAll();
    toast.success("Element pasted!");
  };
  

  //finaly save to cloud
  const saveTemplateToCloud = (finalTemplateData) => {
    try {
      createTemplate(finalTemplateData)
        .unwrap()
        .then(() => {
          toast.success("Template saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving template:", error);
          toast.error("Failed to save template. Please try again.");
        });
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template. Please try again.");
    }
  };

  // handle on update the latest desing 
  const handleOnUpdateDesign = async () => {
    try {
      const jsonData = canvas.toJSON();
      const id = templateId;

      await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure all DOM updates are complete

    const targetElement = document.querySelector("canvas"); // Selects the first <canvas> element
    if (!targetElement) return console.error("Capture area not found");


    
      const screenshot = await html2canvas(targetElement, {
        allowTaint: false, // Ensures only properly loaded images are included
        useCORS: true, // Allows fetching CORS-enabled images
        backgroundColor: null,
        logging: false,
      });
      // document.body.appendChild(screenshot);

      // return;

      const blob = await new Promise((resolve) =>
        screenshot.toBlob(resolve, "image/png")
      );

      if (!blob) return console.error("Failed to create image blob");

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "your_upload_preset"); // 🔥 Required for unsigned uploads

      const cloudinaryData = await upl(formData).unwrap(); // Your RTK Query mutation
      const url = cloudinaryData.file?.path || cloudinaryData.secure_url;


      if (!id) {
        console.error("User ID is missing");
        return;
      }

      const response = await updateTemplate({ id, updatedData:{jsonData,
        thumbnailUrl: url
      } }).unwrap();
      toast.success("Template updated successfully:");
      setShowSavePrompt(false); // Close modal if open
    } catch (error) {
      console.error("Failed to update template:", error);
    }
  };

    // Clear canvas function
    const clearCanvas = () => {
      if (!canvas) return;
      canvas.clear();
      canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));
      setBackgroundColor("#ffffff");
      toast.success("Canvas cleared!");
    };



  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <div className="block md:hidden w-full flex-shrink-0">
        <MobileSidebar
          templates={templates}
          designs={designs}
          handleImageUpload={handleImageUpload}
          addTemplateToCanvas={addTemplateToCanvas}
          downloadImage={downloadImage}
          saveTemplate={saveTemplate}
          addDesignElement={addDesignElement}
          onWallpaperSelect={onWallpaperSelect}
          addCustomTextElement={addCustomTextElement}
          textEffects={textEffects}
          setTextEffects={setTextEffects}
          bringToFront={bringToFront}
          sendToBack={sendToBack}
          bringForward={bringForward}
          sendBackward={sendBackward}
          lockObject={lockObject}
          unlockObject={unlockObject}
        />
      </div>
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        <div className="hidden md:flex md:h-full md:flex-shrink-0">
          <Sidebar
            templates={templates}
            designs={designs}
            handleImageUpload={handleImageUpload}
            addTemplateToCanvas={addTemplateToCanvas}
            downloadImage={downloadImage}
            saveTemplate={saveTemplate}
            addDesignElement={addDesignElement}
            onWallpaperSelect={onWallpaperSelect}
            addCustomTextElement={addCustomTextElement}
            textEffects={textEffects}
            setTextEffects={setTextEffects}
            bringToFront={bringToFront} // Added layering functions
            sendToBack={sendToBack}
            bringForward={bringForward}
            sendBackward={sendBackward}
            lockObject={lockObject}
            unlockObject={unlockObject}
            handleOnUpdateDesign={()=>handleOnUpdateDesign()}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-grow bg-slate-300 relative">
          <CanvasArea canvasRef={canvasRef} />
          <button
            onClick={clearCanvas}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            title="Clear Canvas"
          >
            Clear Canvas
          </button>

          {showIcons && (
            <div
              className="absolute flex space-x-2"
              style={{
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            >
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                title="Copy"
              >
                <MdContentCopy size={20} />
              </button>
              <button
                onClick={handlePaste}
                className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                title="Paste"
              >
                <MdContentPaste size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                title="Delete"
              >
                <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
        <div className="flex flex-col md:flex-row overflow-hidden bg-black">
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
            selectedTextStyle={textStyle}
            setSelectedTextStyle={setTextStyle}
            setSelectedTextBackgroundColor={setTextBackgroundColor}
            setBackgroundColor={setBackgroundColor}
            selectedFontSize={selectedFontSize}
            setSelectedFontSize={setSelectedFontSize}
          />
        </div>
      </div>
      {showModal && (
        <TemplateOtherDetails
          onClose={() => setShowModal(false)}
          onSave={saveTemplateToCloud}
          templateData={templateData}
        />
      )}

      {/* <div className="absolute right-10 lg:right-96 top-24 md:top-1">
        <button className="bg-primary px-7 py-2 rounded-lg text-white" onClick={()=>handleOnUpdateDesign()}>
        {isLoading ? <Loader2 className="animate-spin"/> : "Save Design"}
        </button>
      </div> */}

      {/* Save Prompt Modal */}
      {showSavePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
            <h2 className="text-xl font-semibold">Unsaved Changes</h2>
            <p>Do you want to save your design before leaving?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleOnUpdateDesign}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {isLoading ? <Loader2 className="animate-spin"/> : "Save Design"}
              </button>
              <button
                onClick={() => setShowSavePrompt(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Leave Without Saving
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canva;