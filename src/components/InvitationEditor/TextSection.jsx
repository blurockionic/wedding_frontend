import React, { useState } from "react";

const TextSection = ({ addCustomTextElement }) => {
  const [textEffects, setTextEffects] = useState({
    glow: false,
    outline: "none",
    shadow: "none",
    gradient: false,
    curved: false,
    emoji: "",
    animation: "None",
    alignment: "center",
    letterSpacing: 0,
    lineHeight: 1,
    sticker: null,
  });

  const emojis = [
    "❤️", "🔥", "✨", "🎉", "⭐", "💍", "💞", "👑", "😊", "👀", "✌️", "👈", "🎇",
    "🎁", "🎀", "🎗️", "🎂", "🌸", "💫", "💥", "💝", "❤️‍🔥", "💖", "🦚", "🦋",
  ];

  const applyTextStyle = (text, size) => {
    const style = {
      textShadow: textEffects.shadow,
      WebkitTextStroke: textEffects.outline,
      background: textEffects.gradient ? "linear-gradient(45deg, #F43F5E, #8B5CF6)" : "none",
      WebkitBackgroundClip: textEffects.gradient ? "text" : "none",
      color: textEffects.gradient ? "transparent" : "#000000",
      filter: textEffects.glow ? "drop-shadow(0 0 8px #F43F5E)" : "none",
      transform: textEffects.curved ? "rotate(10deg)" : "none",
      textAlign: textEffects.alignment,
      letterSpacing: `${textEffects.letterSpacing}px`,
      lineHeight: textEffects.lineHeight,
    };
    const finalText = textEffects.emoji ? `${text} ${textEffects.emoji}` : text;
    addCustomTextElement(finalText, size, style, `custom-text-${Date.now()}`);
  };

  // Pre-styled text options for wedding card-like designs
  const fancyTextStyles = [
    // Original 5 styles
    {
      text: "Forever Begins",
      size: 28,
      style: {
        color: "#FFD700", // Gold
        textShadow: "2px 2px 4px rgba(255, 215, 0, 0.5)",
        fontFamily: "'Great Vibes', cursive",
        fontWeight: "bold",
        letterSpacing: "2px",
      },
    },
    {
      text: "Love & Joy",
      size: 24,
      style: {
        background: "linear-gradient(45deg, #FF69B4, #FF1493)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        textShadow: "1px 1px 3px rgba(255, 20, 147, 0.6)",
        fontFamily: "'Dancing Script', cursive",
        fontWeight: "bold",
      },
    },
    {
      text: "Happily Ever After",
      size: 26,
      style: {
        color: "#FF4500", // OrangeRed
        filter: "drop-shadow(0 0 6px #FF4500)",
        fontFamily: "'Parisienne', cursive",
        letterSpacing: "1px",
      },
    },
    {
      text: "Together Forever",
      size: 22,
      style: {
        color: "#FFFFFF",
        textShadow: "0 0 5px #8A2BE2, 0 0 10px #8A2BE2", // Purple glow
        fontFamily: "'Allura', cursive",
        fontStyle: "italic",
      },
    },
    {
      text: "Stylish",
      size: 30,
      style: {
        background: "linear-gradient(to right, #00CED1, #20B2AA)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        textShadow: "2px 2px 5px rgba(0, 206, 209, 0.7)",
        fontFamily: "'Sacramento', cursive",
        fontWeight: "bold",
      },
    },
    // 10 New Styles
    {
      text: "Eternal Vows",
      size: 27,
      style: {
        color: "#C71585", // MediumVioletRed
        WebkitTextStroke: "1px #FFFFFF", // White outline
        fontFamily: "'Cinzel', serif",
        fontWeight: "bold",
        letterSpacing: "1.5px",
      },
    },
    {
      text: "Soulmates",
      size: 25,
      style: {
        color: "#F0E68C", // Khaki
        textShadow: "3px 3px 6px rgba(139, 0, 139, 0.5)", // DarkMagenta shadow
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
      },
    },
    {
      text: "Blissful Union",
      size: 29,
      style: {
        color: "#32CD32", // LimeGreen
        filter: "drop-shadow(0 0 5px #32CD32)", // Green glow
        fontFamily: "'Tangerine', cursive",
        fontSize: "34px", // Slightly larger for elegance
      },
    },
    {
      text: "Sacred Bond",
      size: 26,
      style: {
        color: "#8B4513", // SaddleBrown
        textShadow: "1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.5)", // 3D effect
        fontFamily: "'Lora', serif",
        fontWeight: "bold",
      },
    },
    {
      text: "True Love",
      size: 24,
      style: {
        color: "#FF69B4", // HotPink
        background: "linear-gradient(90deg, #FF69B4, #FFB6C1)", // Gradient background
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontFamily: "'Kaushan Script', cursive",
        letterSpacing: "1px",
      },
    },
    {
      text: "Wedding Bells",
      size: 28,
      style: {
        color: "#4682B4", // SteelBlue
        textShadow: "2px 2px 4px rgba(70, 130, 180, 0.6)", // Matching shadow
        fontFamily: "'Pinyon Script', cursive",
        fontStyle: "italic",
      },
    },
    {
      text: "Joyful Hearts",
      size: 25,
      style: {
        color: "#FFFFFF",
        filter: "drop-shadow(0 0 8px #FFA500)", // Orange glow
        fontFamily: "'Rochester', cursive",
        fontWeight: "bold",
      },
    },
    {
      text: "Celebrate Us",
      size: 27,
      style: {
        color: "#9400D3", // DarkViolet
        WebkitTextStroke: "0.5px #FFD700", // Thin gold outline
        fontFamily: "'Herr Von Muellerhoff', cursive",
        letterSpacing: "2px",
      },
    },
    {
      text: "Dreamy Day",
      size: 26,
      style: {
        color: "#FFB6C1", // LightPink
        textShadow: "0 0 10px rgba(255, 182, 193, 0.7), 0 0 20px rgba(255, 182, 193, 0.5)", // Soft pink glow
        fontFamily: "'Petit Formal Script', cursive",
        fontStyle: "italic",
      },
    },
  ];

  const applyFancyTextStyle = (text, size, style) => {
    const finalText = textEffects.emoji ? `${text} ${textEffects.emoji}` : text;
    addCustomTextElement(finalText, size, { ...style, textAlign: "center" }, `fancy-text-${Date.now()}`);
  };

  return (
    <div className="h-screen bg-white text-black overflow-y-auto w-full md:-mt-[50px]">
      <div className="p-4 flex-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder=" Search fonts....."
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-pink-500"
          />
        </div>
        <div className="mb-4">
          <button
            className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
            onClick={() => applyTextStyle("Enter text here", 16)}
          >
            Add a text box
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-purple-500">Text Styles</h3>
          <div className="space-y-2">
            <button
              className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors text-[30px]"
              onClick={() => applyTextStyle("Add a heading", 38)}
            >
              Add a heading
            </button>
            <button
              className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors text-[22px]"
              onClick={() => applyTextStyle("Add a subheading", 24)}
            >
              Add a subheading
            </button>
            <button
              className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors text-[12px]"
              onClick={() => applyTextStyle("Add a little bit of body text", 14)}
            >
              Add a little bit of body text
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-purple-500">Text Effects</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={textEffects.glow}
                onChange={(e) => setTextEffects({ ...textEffects, glow: e.target.checked })}
              />
              Glow Effect
            </label>
            <select
              value={textEffects.outline}
              onChange={(e) => setTextEffects({ ...textEffects, outline: e.target.value })}
              className="w-full p-2 rounded border"
            >
              <option value="none">No Outline</option>
              <option value="1px white">White Outline</option>
              <option value="2px black">Black Outline</option>
            </select>
            <select
              value={textEffects.shadow}
              onChange={(e) => setTextEffects({ ...textEffects, shadow: e.target.value })}
              className="w-full p-2 rounded border"
            >
              <option value="none">No Shadow</option>
              <option value="1px 1px 2px rgba(0,0,0,0.3)">Soft Shadow</option>
              <option value="2px 2px 4px rgba(0,0,0,0.5)">Bold Shadow</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={textEffects.gradient}
                onChange={(e) => setTextEffects({ ...textEffects, gradient: e.target.checked })}
              />
              Gradient Text
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={textEffects.curved}
                onChange={(e) => setTextEffects({ ...textEffects, curved: e.target.checked })}
              />
              Curved Text
            </label>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-purple-500">Emojis & Stickers</h3>
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                className="p-2 bg-gray-100 rounded hover:bg-purple-100"
                onClick={() => setTextEffects({ ...textEffects, emoji })}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        {/* Vertical Div for Fancy Text Styles */}
      <div className="w-full bg-gray-50 p-4 border-l border-gray-200 overflow-y-auto">
        <h3 className="text-sm font-semibold mb-2 text-purple-500">Fancy Text Styles</h3>
        <div className="space-y-3">
          {fancyTextStyles.map((fancyText, index) => (
            <button
              key={index}
              className="w-full text-left px-2 py-1 bg-white rounded-lg shadow hover:bg-purple-100 transition-colors"
              onClick={() => applyFancyTextStyle(fancyText.text, fancyText.size, fancyText.style)}
              style={{ ...fancyText.style, display: "block" }} // Apply style for preview
            >
              {fancyText.text}
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default TextSection;