import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const DesignElement = ({ src, onRemove, initialPosition, index }) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState(30);
  const [isSelected, setIsSelected] = useState(false);

  const handleDragEnd = (e, info) => {
    setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
    setIsSelected(true);
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
      style={{ x: position.x, y: position.y, position: "absolute", zIndex: 20 }}
      className="relative"
    >
      <img src={src} alt="design" style={{ width: size, height: "auto" }} />
      {isSelected && (
        <div className="absolute top-full left-0 w-full">
          <input
            type="range"
            min="50"
            max="300"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-full accent-rose-400"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="absolute -top-6 -right-2 bg-red-500 rounded-full p-1"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DesignElement;