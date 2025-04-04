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
  fontStyles,
  animations,
  updateSelectedElementStyle,
  selectedTextStyle,
  setSelectedTextStyle,
  setSelectedTextBackgroundColor,
  setBackgroundColor,
  setSelectedFontSize,
  selectedFontSize,
}) => {
  return (
    <div
      className={`w-full md:w-72 border-t md:border-l border-gray-300 p-4 md:p-6 overflow-y-auto relative bg-gray-100 ${
        isStyleOptionsOpen ? "block" : "md:hidden"
      }`}
    >
      <button
        className="md:hidden flex items-center gap-2 text-pink-600 mb-4"
        onClick={() => setIsStyleOptionsOpen(!isStyleOptionsOpen)}
      >
        <Menu className="w-6 h-6" /> Style Options
      </button>
      <div
        className={`${
          isStyleOptionsOpen ? "block" : "hidden"
        } md:block space-y-6 md:space-y-6 h-[20vh]`}
      >
        <h2 className="text-lg font-medium mb-4 text-gray-800">
          Style Options
        </h2>
        <hr />
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-blue-600">Text Style</label>
            <select
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTextStyle}
              onChange={(e) => {
                setSelectedTextStyle(e.target.value);
                updateSelectedElementStyle({
                  fontWeight: e.target.value === "Bold" ? "bold" : "normal",
                  fontStyle: e.target.value === "Italic" ? "italic" : "normal",
                  textDecoration:
                    e.target.value === "Underline"
                      ? "underline"
                      : e.target.value === "Strikethrough"
                      ? "line-through"
                      : "none",
                  underline: e.target.value === "Underline",
                  linethrough: e.target.value === "Strikethrough",
                });
              }}
            >
              <option value="">Normal</option>
              <option value="Bold">Bold</option>
              <option value="Italic">Italic</option>
              <option value="Underline">Underline</option>
              <option value="Strikethrough">Strikethrough</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-blue-600">Text Color </label>
            <div className="grid grid-cols-6 gap-2">
              {
                <input
                  type="color"
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110  "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100" : ""}`}
                  onChange={(e) => {
                    setSelectedColor(e.target.value);
                    updateSelectedElementStyle({
                      color: hexToRgb(e.target.value),
                    });
                  }}
                />
              }
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-blue-600"> Background Color </label>
            <div className=" gap-2">
              {
                <div className="flex items-center justify-start gap-2">
                  {/* Color Picker */}
                  <input
                    type="color"
                    className="w-8 h-8 rounded-full transition-transform hover:scale-110 ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100"
                    onChange={(e) => {
                      setSelectedTextBackgroundColor(e.target.value);
                      updateSelectedElementStyle({
                        textBackgroundColor: hexToRgb(e.target.value),
                      });
                    }}
                  />

                  {/* Transparent Option */}
                  <button
                    className="px-3 py-1 text-sm border rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => {
                      setSelectedTextBackgroundColor("transparent");
                      updateSelectedElementStyle({
                        textBackgroundColor: "transparent",
                      });
                    }}
                  >
                    Transparent
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font Size Slider */}
            <input
              type="number"
              min="10"
              max="50"
              value={selectedFontSize}
              onChange={(e) => {
                setSelectedFontSize(e.target.value);
                updateSelectedElementStyle({ fontSize: `${e.target.value}px` });
              }}
              className="cursor-pointer"
            />
            <span className="text-sm">{selectedFontSize}px</span>
          </div>

          {/* <div className="space-y-2">
            <label className="text-sm text-blue-600">Cnavas Background Color </label>
            <div className="grid grid-cols-6 gap-2">
              {
                <input
                  type="color"
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110  "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100" : ""}`}
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateSelectedElementStyle({
                      backgroundColor: hexToRgb(e.target.value),
                    });
                  }}
                />
              }
            </div>
          </div> */}
          <div className="space-y-2">
            <label className="text-sm text-blue-600">Font Style</label>
            <select
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedFont}
              onChange={(e) => {
                setSelectedFont(e.target.value);
                updateSelectedElementStyle({
                  fontFamily: fontStyles[e.target.value],
                });
              }}
            >
              {Object.keys(fontStyles).map((font) => (
                <option
                  key={font}
                  value={font}
                  style={{ fontFamily: fontStyles[font] }}
                >
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="space-y-2">
              <label className="text-sm text-blue-600">Animation</label>
              <select
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedAnimation.name}
                onChange={(e) => {
                  const selectedAnim = animations.find(
                    (anim) => anim.name === e.target.value
                  );
                  setSelectedAnimation(selectedAnim);
                  updateSelectedElementStyle({ animation: selectedAnim });
                }}
              >
                {animations.map((anim) => (
                  <option key={anim.name} value={anim.name}>
                    {anim.name}
                  </option>
                ))}
              </select>
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
                updateSelectedElementStyle({
                  opacity: parseFloat(e.target.value),
                });
              }}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleOptions;
