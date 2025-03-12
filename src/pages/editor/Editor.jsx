import React, { useEffect, useRef, useState } from "react";
import * as fabric  from "fabric";
import { FiImage, FiDownload, FiType } from "react-icons/fi";

const templates = [
  { id: 1, name: "Floral Wedding", src: "/Logo.png" },
  { id: 2, name: "Modern Wedding", src: "/image_1.jpg" },
  { id: 3, name: "Classic Wedding", src: "/image_2.jpg" },
];

const Editor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: "#fff",
    });
    setCanvas(fabricCanvas);

    return () => fabricCanvas.dispose();
  }, []);

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
    canvas.renderAll();
  };

  // Upload Image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    console.log(file)

    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true,
        });
        canvas.add(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  // Add Template to Canvas
  const addTemplateToCanvas = (src) => {
    if (!canvas) return;

    fabric.Image.fromURL(src, (img) => {
      img.set({
        left: 0,
        top: 0,
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
        selectable: false, // Lock template in place
      });

      canvas.clear(); // Remove previous elements
      canvas.add(img);
      canvas.renderAll();
    }, { crossOrigin: "anonymous" }); // Fix CORS issue if needed
  };

  // Download as Image
  const downloadImage = () => {
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "wedding-template.png";
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold">Editor Tools</h2>

        {/* Add Text Button */}
        <button onClick={addText} className="px-4 py-2 bg-blue-500 rounded flex items-center gap-2">
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
              <img src={template.src} alt={template.name} className="w-full h-24 object-cover rounded" />
              <p className="text-sm text-center mt-1 text-black">{template.name}</p>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <button onClick={downloadImage} className="px-4 py-2 bg-red-500 rounded flex items-center gap-2 mt-4">
          <FiDownload /> Download
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-grow flex justify-center items-center">
        <div className="border-2 border-gray-300 shadow-lg bg-white">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Editor;
