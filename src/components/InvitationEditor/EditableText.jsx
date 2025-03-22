import React, { useState } from "react";
import { Edit2, X } from "lucide-react";
import { motion } from "framer-motion";

const EditableText = ({ value, onChange, className, style, animation, onDelete, isSelected, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(text);
  };

  return isEditing ? (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
      autoFocus
      className={`bg-transparent border-b border-gold focus:outline-none px-2 text-center ${className}`}
      style={{ ...style, width: "100%", textAlign: "center" }}
    />
  ) : (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
        onSelect();
      }}
      className={`cursor-text hover:bg-white/5 rounded px-2 py-1 group relative ${className} ${isSelected ? "ring-2 ring-rose-400" : ""}`}
      style={{ ...style, textAlign: "center", display: "inline-block", minWidth: "100%" }}
      animate={animation}
      key={animation ? JSON.stringify(animation) : "default"}
    >
      {text}
      <Edit2 className="w-4 h-4 absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute -right-100 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1"
      >
        <X className="w-3 h-3 text-white" />
      </button>
    </motion.div>
  );
};

export default EditableText;