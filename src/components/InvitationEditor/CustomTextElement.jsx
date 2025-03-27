import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import EditableText from "./EditableText";

const CustomTextElement = ({
  id,
  text,
  onChange,
  onRemove,
  initialPosition,
  index,
  textStyle,
  defaultSize,
  isSelected,
  onSelect,
}) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState(defaultSize || 16);
  const [value, setValue] = useState(text || "Enter text here");
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  const startSizeRef = useRef(size); // Store initial size when resizing starts
  const startPositionRef = useRef({ x: 0, y: 0 }); // Store mouse position when resizing starts

  const handleDragEnd = (e, info) => {
    setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
  };

  const handleTextChange = (newText) => {
    setValue(newText);
    onChange(newText);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    startSizeRef.current = size;
    startPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startPositionRef.current.x;
      const deltaY = e.clientY - startPositionRef.current.y;
      const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * (deltaX > 0 ? 1 : -1);
      const newSize = Math.max(10, Math.min(50, startSizeRef.current + dragDistance / 5));
      setSize(newSize);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Attach and clean up global mouse events
  React.useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isResizing) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    // Cleanup function runs when isResizing changes or component unmounts
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isResizing]); // Dependency on isResizing ensures cleanup when it changes

  return (
    <motion.div
      drag={!isResizing} // Disable drag while resizing
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{ x: position.x, y: position.y, position: "absolute", zIndex: 20 }}
      className={`relative ${isSelected ? "border-2 border-blue-500" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div ref={containerRef}>
        <EditableText
          value={value}
          onChange={handleTextChange}
          onDelete={() => onRemove(index)}
          className="text-white"
          style={{ ...textStyle, fontSize: `${size}px` }}
        />
      </div>
      {isSelected && (
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            bottom: -5,
            right: -5,
            width: 10,
            height: 10,
            background: "#3b82f6",
            borderRadius: 2,
            cursor: "se-resize",
          }}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </motion.div>
  );
};

export default CustomTextElement;