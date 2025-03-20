import React, { useState } from "react";
import { motion } from "framer-motion";
import EditableText from "./EditableText";

const CustomTextElement = ({ text, onChange, onRemove, initialPosition, index, textStyle, defaultSize }) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState(defaultSize || 16);
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
      style={{ x: position.x, y: position.y, position: "absolute", zIndex: 20 , transformOrigin: "center" }}
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
          <input type="range" min="10" max="50" value={size} onChange={(e) => setSize(Number(e.target.value))} onClick={(e) => e.stopPropagation()} className="w-full accent-rose-400" />
        </div>
      )}
    </motion.div>
  );
};

export default CustomTextElement;