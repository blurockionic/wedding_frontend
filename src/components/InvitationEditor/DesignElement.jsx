import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, RotateCw, RotateCcw } from "lucide-react"; 

const DesignElement = ({
  src,
  onRemove,
  initialPosition,
  index,
  editorWidth, // Editor's inner div width
  editorHeight, // Editor's inner div height
}) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isSelected, setIsSelected] = useState(false);
  const [rotation, setRotation] = useState(0); // Rotation angle in degrees

  const handleDragEnd = (e, info) => {
    const newPosition = { x: position.x + info.delta.x, y: position.y + info.delta.y };
    setPosition(newPosition);
    setIsSelected(true);
    console.log(`DesignElement ${index} moved:`, { position: newPosition, size, rotation });
  };

  const handleResizeDrag = (e, info) => {
    const newWidth = Math.max(50, Math.min(editorWidth || 600, size.width + info.delta.x));
    const newHeight = Math.max(50, Math.min(editorHeight || 900, size.height + info.delta.y));
    setSize({ width: newWidth, height: newHeight });
  };

  const handleRotateForwardClick = (e) => {
    e.stopPropagation(); // Prevent click from toggling selection
    setRotation((prev) => (prev + 20) % 360); // Rotate clockwise by 20 degrees
  };

  const handleRotateReverseClick = (e) => {
    e.stopPropagation(); // Prevent click from toggling selection
    setRotation((prev) => (prev - 20 + 360) % 360); // Rotate counterclockwise by 20 degrees
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
      style={{
        x: position.x,
        y: position.y,
        rotate: rotation, // Apply rotation to the entire element
        position: "absolute",
        zIndex: 20,
      }}
      className={`relative ${isSelected ? "border-2 border-blue-500" : ""}`}
    >
      <motion.img
        src={src}
        alt="design"
        style={{ width: size.width, height: size.height }}
      />
      {isSelected && (
        <>
          {/* Forward Rotate Icon (Clockwise) */}
          <div
            onClick={handleRotateForwardClick} // Click to rotate clockwise
            style={{
              position: "absolute",
              top: -15, // Above the element
              left: -5,
              width: 25,
              height: 25,
              background: "#3b82f6",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RotateCw className="w-4 h-4 text-white" />
          </div>

          {/* Reverse Rotate Icon (Counterclockwise) */}
          <div
            onClick={handleRotateReverseClick} // Click to rotate counterclockwise
            style={{
              position: "absolute",
              top: -15, // Same vertical level as forward rotate
              left: 25, // Positioned to the right of forward rotate icon
              width: 25,
              height: 25,
              background: "#3b82f6",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </div>

          {/* Resize Handle */}
          <motion.div
            drag
            dragMomentum={false}
            onDrag={handleResizeDrag}
            style={{
              position: "absolute",
              bottom: -5,
              right: -5,
              width: 10,
              height: 10,
              background: "transparent",
              borderRadius: 2,
              cursor: "se-resize",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            style={{
              position: "absolute",
              bottom: -8,
              right: -8,
              width: 10,
              height: 10,
              background: "#3b82f6",
              borderRadius: 1,
            }}
          />

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="absolute -top-4 -right-4 bg-red-500 rounded-full p-1"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </>
      )}
    </motion.div>
  );
};

export default DesignElement;