import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { FiImage, FiDownload, FiType } from "react-icons/fi";
import { Square } from "lucide-react";

const templates = [
  { id: 1, name: "Floral Wedding", src: "/Logo.png" },
  { id: 2, name: "Modern Wedding", src: "/image_1.jpg" },
  { id: 3, name: "Classic Wedding", src: "/image_2.jpg" },
];

const Editor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textDecoration, setTextDecoration] = useState("none");
  const [indent, setIndent] = useState(0);
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 600,
      backgroundColor: "#fff",
    });

    setCanvas(fabricCanvas);

    // Event listener for selecting text
    fabricCanvas.on("selection:created", (event) => {
      if (event.target && event.target.type === "i-text") {
        setSelectedText(event.target);
        setFontSize(event.target.fontSize);
        setFontColor(event.target.fill);
        setFontFamily(event.target.fontFamily);
        setFontWeight(event.fontWeight || "normal");
        setFontStyle(event.fontStyle || "normal");
        setTextDecoration(event.underline ? "underline" : "none");
        setIndent(event.left || 0);
      }
    });

    fabricCanvas.on("selection:updated", (event) => {
      if (event.target && event.target.type === "i-text") {
        setSelectedText(event.target);
        setFontSize(event.target.fontSize);
        setFontColor(event.target.fill);
        setFontFamily(event.target.fontFamily);
        setFontWeight(event.fontWeight || "normal");
        setFontStyle(event.fontStyle || "normal");
        setTextDecoration(event.underline ? "underline" : "none");
        setIndent(event.left || 0);
      }
    });

    fabricCanvas.on("selection:cleared", () => {
      setSelectedText(null);
    });

    return () => fabricCanvas.dispose();
  }, []);

  console.log(selectedText);

  // Add Text
  const addText = () => {
    const text = new fabric.IText("Your Text Here", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "#000",
      fontFamily: "Arial",
      selectable: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setSelectedText(text);
  };

  // Upload Image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("File uploaded:", file);

    const reader = new FileReader();
    reader.onload = () => {
      console.log("FileReader result:", reader.result);

      fabric.util.loadImage(reader.result, (img) => {
        if (!img) {
          console.error("Failed to load image.");
          return;
        }

        const fabricImage = new fabric.Image(img, {
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true,
        });

        if (canvas) {
          canvas.add(fabricImage);
          canvas.renderAll();
        } else {
          console.error("Canvas is not initialized.");
        }
      });
    };

    reader.readAsDataURL(file);
  };

  // Add Template to Canvas
  const addTemplateToCanvas = (src) => {
    if (!canvas) return;

    // Load the main template image
    fabric.Image.fromURL(src, { crossOrigin: "anonymous" }).then(
      (templateImg) => {
        templateImg.set({
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true,
        });

        canvas.add(templateImg);
        canvas.renderAll();
      }
    );
  };

  const updateTextProperty = (property, value) => {
    if (selectedText && canvas) {
      selectedText.set(property, value);
      canvas.renderAll();

      // Update state accordingly
      switch (property) {
        case "fontSize":
          setFontSize(value);
          break;
        case "fill":
          setFontColor(value);
          break;
        case "fontFamily":
          setFontFamily(value);
          break;
        case "fontWeight":
          setFontWeight(value);
          break;
        case "fontStyle":
          setFontStyle(value);
          break;
        case "underline":
          setTextDecoration(value ? "underline" : "none");
          break;
        case "left":
          setIndent(value);
          break;
        default:
          break;
      }
    }
  };

  // Download as Image
  const downloadImage = () => {
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "wedding-template.png";
    link.click();
  };

  const addRectangle = () => {
    const rect = new fabric.Rect({
      top: 100,
      left: 50,
      width: 100,
      height: 60,
      fill: "#aaa",
    });

    canvas.add(rect);
  };

  const saveTemplate = () => {
    if (!canvas) return;
    const json = canvas.toJSON();
    localStorage.setItem("savedTemplate", JSON.stringify(json));
    alert("Template saved successfully!");
    console.log(json);
  };

  const loadTemplate = () => {
    if (!canvas) return;
    console.log("Loading template..."); // Debugging
    const savedJson = localStorage.getItem("savedTemplate");
    if (savedJson) {
      canvas.loadFromJSON(savedJson, () => {
        canvas.renderAll();
        console.log("Template loaded successfully!");
        alert("Template loaded successfully!");
      });
    } else {
      console.log("No saved template found!");
      alert("No saved template found!");
    }
};


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold">Editor Tools</h2>

        <button
          onClick={saveTemplate}
          className="px-4 py-2 bg-purple-500 rounded flex items-center gap-2 mt-4"
        >
          Save Template
        </button>
        <button
          onClick={loadTemplate}
          className="px-4 py-2 bg-orange-500 rounded flex items-center gap-2 mt-2"
        >
          Load Template
        </button>
        {/* Tools */}
        <div>
          <Square onClick={addRectangle} />
        </div>

        {/* Add Text Button */}
        <button
          onClick={addText}
          className="px-4 py-2 bg-blue-500 rounded flex items-center gap-2"
        >
          <FiType /> Add Text
        </button>

        {/* Upload Image */}
        <label className="px-4 py-2 bg-green-500 rounded flex items-center gap-2 cursor-pointer">
          <FiImage /> Upload Image
          <input type="file" onChange={handleImageUpload} className="hidden" />
        </label>

        {/* Templates Section */}
        <h2 className="text-lg font-bold mt-4">Templates</h2>
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-2 bg-white rounded-lg shadow cursor-pointer hover:scale-105 transition"
              onClick={() => addTemplateToCanvas(template.src)}
            >
              <img
                src={template.src}
                alt={template.name}
                className="w-full h-24 object-cover rounded"
              />
              <p className="text-sm text-center mt-1 text-black">
                {template.name}
              </p>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <button
          onClick={downloadImage}
          className="px-4 py-2 bg-red-500 rounded flex items-center gap-2 mt-4"
        >
          <FiDownload /> Download
        </button>
      </div>

      {/* Canvas Area with Top Toolbar */}
      <div className="flex flex-col flex-grow">
        {/* Toolbar at the top */}
        {selectedText && (
          <div className="flex items-center space-x-3 bg-gray-200 p-3 border-b">
            {/* Font Selector */}
            <label>Font:</label>
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                updateTextProperty("fontFamily", e.target.value);
              }}
              className="border p-1"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
            </select>

            {/* Font Size */}
            <label>Size:</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                updateTextProperty("fontSize", parseInt(e.target.value, 10));
              }}
              className="border p-1 w-16"
            />

            {/* Font Color */}
            <label>Color:</label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => {
                setFontColor(e.target.value);
                updateTextProperty("fill", e.target.value);
              }}
              className="border p-1"
            />

            {/* Bold Button */}
            <button
              onClick={() =>
                updateTextProperty(
                  "fontWeight",
                  fontWeight === "bold" ? "normal" : "bold"
                )
              }
              className={`border p-1 ${
                fontWeight === "bold" ? "bg-gray-400" : ""
              }`}
            >
              B
            </button>

            {/* Italic Button */}
            <button
              onClick={() =>
                updateTextProperty(
                  "fontStyle",
                  fontStyle === "italic" ? "normal" : "italic"
                )
              }
              className={`border p-1 ${
                fontStyle === "italic" ? "bg-gray-400" : ""
              }`}
            >
              <i>I</i>
            </button>

            {/* Underline Button */}
            <button
              onClick={() =>
                updateTextProperty(
                  "textDecoration",
                  textDecoration === "underline" ? "none" : "underline"
                )
              }
              className={`border p-1 ${
                textDecoration === "underline" ? "bg-gray-400" : ""
              }`}
            >
              <u>U</u>
            </button>

            {/* Indentation (Increase) */}
            <button
              onClick={() => updateTextProperty("indent", (indent || 0) + 10)}
              className="border p-1"
            >
              ➡
            </button>

            {/* Indentation (Decrease) */}
            <button
              onClick={() =>
                updateTextProperty("indent", Math.max((indent || 0) - 10, 0))
              }
              className="border p-1"
            >
              ⬅
            </button>
          </div>
        )}

        {/* Canvas Container */}
        <div className="flex-grow flex justify-center items-center">
          <div className="border-2 border-gray-300 shadow-lg bg-white">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
