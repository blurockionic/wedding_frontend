import React, { useState } from "react";
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

  const handleDragEnd = (e, info) => {
    setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
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
        e.stopPropagation(); // Prevent editor click from deselecting
        onSelect(); // Trigger selection to open StyleOptions
      }}
      style={{ x: position.x, y: position.y, position: "absolute", zIndex: 20, transformOrigin: "center" }}
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
        <div className="absolute top-full left-0 w-full space-y-2">
          <input
            type="range"
            min="10"
            max="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()} // Prevent range click from bubbling
            className="w-full accent-rose-400"
          />
        </div>
      )}
    </motion.div>
  );
};

export default CustomTextElement;