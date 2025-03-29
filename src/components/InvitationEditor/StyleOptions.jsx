import React from "react";
import { Menu, Layers } from "lucide-react";
import { motion } from "framer-motion";

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const StyleOptions = ({
  isStyleOptionsOpen,
  setIsStyleOptionsOpen,
  selectedColor,
  setSelectedColor,
  selectedFont,
  setSelectedFont,
  selectedAnimation,
  setSelectedAnimation,
  textShadow,
  setTextShadow,
  opacity,
  setOpacity,
  glowEffect,
  setGlowEffect,
  fontStyles,
  animations,
  updateSelectedElementStyle,
}) => {
  return (
    <div className={`w-full md:w-72 border-t md:border-l border-gray-300 p-4 md:p-6 overflow-y-auto relative bg-gray-100 ${isStyleOptionsOpen ? "block" : "md:hidden"}`}>
      <button className="md:hidden flex items-center gap-2 text-pink-600 mb-4" onClick={() => setIsStyleOptionsOpen(!isStyleOptionsOpen)}>
        <Menu className="w-6 h-6" /> Style Options
      </button>
      <div className={`${isStyleOptionsOpen ? "block" : "hidden"} md:block space-y-6 md:space-y-6 h-[20vh]`}>
        <h2 className="text-lg font-medium mb-4 text-gray-800">Style Options</h2>
        <hr/>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-blue-600">Color Theme</label>
            <div className="grid grid-cols-6 gap-2">
              {["#F43F5E", "#8B5CF6", "#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#728156", "#ffffff", "#073a4b", "#990302", "#b950c1", "#036d59"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${selectedColor === color ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setSelectedColor(color);
                    updateSelectedElementStyle({ color: hexToRgb(color) });
                  }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-blue-600">Font Style</label>
            <div className="space-y-2">
              {Object.keys(fontStyles).map((font) => (
                <button
                  key={font}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedFont === font ? "bg-gray-300 text-gray-800" : "hover:bg-gray-200 text-gray-700"}`}
                  onClick={() => {
                    setSelectedFont(font);
                    updateSelectedElementStyle({ fontFamily: fontStyles[font] });
                  }}
                  style={{ fontFamily: fontStyles[font] }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-blue-600">Animation</label>
            <div className="space-y-2">
              {animations.map((anim) => (
                <button
                  key={anim.name}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedAnimation.name === anim.name ? "bg-gray-300 text-gray-800" : "hover:bg-gray-200 text-gray-700"}`}
                  onClick={() => {
                    setSelectedAnimation(anim);
                    updateSelectedElementStyle({ animation: anim });
                  }}
                >
                  {anim.name}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm text-blue-600">Text Shadow</label>
            <select
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={textShadow}
              onChange={(e) => {
                setTextShadow(e.target.value);
                updateSelectedElementStyle({ textShadow: e.target.value });
              }}
            >
              <option value="none">None</option>
              <option value="1px 1px 2px rgba(0,0,0,0.3)">Soft Shadow</option>
              <option value="2px 2px 4px rgba(0,0,0,0.5)">Bold Shadow</option>
              <option value="0 0 10px rgba(0,0,0,0.7)">Glow Shadow</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-sm text-blue-600">Text Opacity</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => {
                setOpacity(parseFloat(e.target.value));
                updateSelectedElementStyle({ opacity: parseFloat(e.target.value) });
              }}
              className="w-full accent-blue-500"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm text-blue-600 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Glow Effect
            </label>
            <motion.button
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${glowEffect ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700"}`}
              onClick={() => {
                setGlowEffect(!glowEffect);
                updateSelectedElementStyle({ glow: !glowEffect });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {glowEffect ? "On" : "Off"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleOptions;