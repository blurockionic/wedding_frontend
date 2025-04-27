import React, { useState } from "react";

const TextSection = ({ addCustomTextElement, textEffects, setTextEffects }) => {
  const emojis = [
    "❤️", "🔥", "✨", "🎉", "⭐", "💍", "💞", "👑", "😊", "👀", "✌️", "👈", "🎇",
    "🎁", "🎀", "🎗️", "🎂", "🌸", "💫", "💥", "💝", "❤️‍🔥", "💖", "🦚", "🦋",
  ];

  const applyTextStyle = (text, size) => {
    const style = {
      fill: textEffects.gradient ? "#F43F5E" : "#000000", // Gradient fallback color
      shadow: textEffects.shadow !== "none" ? textEffects.shadow : "",
      fontSize: size,
      fontFamily: "Arial",
      textAlign: textEffects.alignment || "left",
      charSpacing: textEffects.letterSpacing * 100 || 0,
      lineHeight: textEffects.lineHeight || 1,
      angle: textEffects.curved ? 10 : 0, // Curved effect
    };

    // Apply glow effect
    if (textEffects.glow) {
      style.shadow = "0 0 8px rgba(244, 63, 94, 0.8)";
    }

    // Apply outline effect
    if (textEffects.outline !== "none") {
      style.stroke = textEffects.outline.split(" ")[1]; // e.g., "white"
      style.strokeWidth = parseInt(textEffects.outline.split(" ")[0]); // e.g., 1
    }

    const finalText = textEffects.emoji ? `${text} ${textEffects.emoji}` : text;
    addCustomTextElement(finalText, size, style);
  };

  const fancyTextStyles = [
    { text: "Forever Begins", size: 28, style: { fill: "#FFD700", textShadow: "2px 2px 4px rgba(255, 215, 0, 0.5)", fontFamily: "'Great Vibes', cursive", fontWeight: "bold", charSpacing: 200 } },
    { text: "Love & Joy", size: 24, style: { fill: "#FF69B4", textShadow: "1px 1px 3px rgba(255, 20, 147, 0.6)", fontFamily: "'Dancing Script', cursive", fontWeight: "bold" } },
    { text: "Happily Ever After", size: 26, style: { fill: "#FF4500", textShadow: "0 0 6px rgba(255, 69, 0, 0.8)", fontFamily: "'Parisienne', cursive", charSpacing: 100 } },
    { text: "Stylish", size: 30, style: { fill: "#00CED1", textShadow: "2px 2px 5px rgba(0, 206, 209, 0.7)", fontFamily: "'Sacramento', cursive", fontWeight: "bold" } },
    { text: "Blissful Union", size: 29, style: { fill: "#32CD32", textShadow: "0 0 5px rgba(50, 205, 50, 0.8)", fontFamily: "'Tangerine', cursive" } },
    { text: "Wedding Bells", size: 28, style: { fill: "#4682B4", textShadow: "2px 2px 4px rgba(70, 130, 180, 0.6)", fontFamily: "'Pinyon Script', cursive", fontStyle: "italic" } },
    { text: "Joyful Hearts", size: 25, style: { fill: "#FFFFFF", textShadow: "0 0 8px rgba(255, 165, 0, 0.8)", fontFamily: "'Rochester', cursive", fontWeight: "bold" } },
  { text: "Cherished Moments", size: 25, style: { fill: "#DAA520", textShadow: "1px 1px 3px rgba(218, 165, 32, 0.6)", fontFamily: "'Alex Brush', cursive", fontStyle: "italic" } },
  { text: "Forever & Always", size: 27, style: { fill: "#20B2AA", textShadow: "0 0 6px rgba(32, 178, 170, 0.8)", fontFamily: "'Qwigley', cursive", charSpacing: 200 ,fontStyle: "italic" } },
  { text: "Love Story", size: 24, style: { fill: "#FF1493", textShadow: "0 0 5px rgba(255, 20, 147, 0.8)", fontFamily: "'Cedarville Cursive', cursive", fontWeight: "bold",fontStyle: "italic" } },
  { text: "Golden Days", size: 26, style: { fill: "#FFDAB9", stroke: "#8B4513", strokeWidth: 0.5, fontFamily: "'Marck Script', cursive", charSpacing: 100,fontStyle: "italic" } },
  { text: "Timeless Love", size: 29, style: { fill: "#7B68EE", textShadow: "2px 2px 5px rgba(123, 104, 238, 0.7)", fontFamily: "'Bilbo', cursive", fontStyle: "italic",fontStyle: "italic" } },
  { text: "Hearts Entwined", size: 25, style: { fill: "#FF4500", textShadow: "3px 3px 6px rgba(255, 69, 0, 0.5)", fontFamily: "'Amatic SC', cursive", fontWeight: "bold",fontStyle: "italic" } },
  { text: "Magic Moments", size: 28, style: { fill: "#00FA9A", textShadow: "0 0 5px rgba(0, 250, 154, 0.8)", fontFamily: "'Shadows Into Light', cursive",fontStyle: "italic" } },
  { text: "Vows & Kisses", size: 27, style: { fill: "#FF69B4", stroke: "#FFFFFF", strokeWidth: 1, fontFamily: "'Dawning of a New Day', cursive", charSpacing: 150,fontStyle: "italic" } },
  { text: "Eternal Flame", size: 26, style: { fill: "#FFA500", textShadow: "1px 1px 2px rgba(255, 165, 0, 0.8)", fontFamily: "'Nothing You Could Do', cursive", fontStyle: "italic" } },
  { text: "Sweet Memories", size: 28, style: { fill: "#FF69B4", textShadow: "2px 2px 4px rgba(255, 105, 180, 0.5)", fontFamily: "'Cookie', cursive", fontWeight: "bold", charSpacing: 150 ,fontStyle: "italic"} },
  { text: "Pure Romance", size: 25, style: { fill: "#FFD700", textShadow: "1px 1px 3px rgba(255, 215, 0, 0.6)", fontFamily: "'Lovers Quarrel', cursive", fontStyle: "italic" } },
  { text: "Endless Love", size: 27, style: { fill: "#00CED1", textShadow: "0 0 6px rgba(0, 206, 209, 0.8)", fontFamily: "'Satisfy', cursive", charSpacing: 200,fontStyle: "italic" } },
  { text: "Moonlit Vows", size: 24, style: { fill: "#FF4500", textShadow: "0 0 5px rgba(255, 69, 0, 0.8)", fontFamily: "'Calligraffitti', cursive", fontWeight: "bold",fontStyle: "italic" } },
  { text: "Whispered Promises", size: 26, style: { fill: "#DDA0DD", stroke: "#4B0082", strokeWidth: 0.5, fontFamily: "'Reenie Beanie', cursive", charSpacing: 100 ,fontStyle: "italic"} },
  { text: "Everlasting Joy", size: 29, style: { fill: "#32CD32", textShadow: "2px 2px 5px rgba(50, 205, 50, 0.7)", fontFamily: "'Handlee', cursive", fontStyle: "italic" } },
  { text: "Starry Nights", size: 25, style: { fill: "#FF6347", textShadow: "3px 3px 6px rgba(255, 99, 71, 0.5)", fontFamily: "'Indie Flower', cursive", fontWeight: "bold",fontStyle: "italic" } },
  { text: "Serenity Forever", size: 28, style: { fill: "#4682B4", textShadow: "0 0 5px rgba(70, 130, 180, 0.8)", fontFamily: "'La Belle Aurore', cursive" ,fontStyle: "italic"} },
  { text: "Heartfelt Union", size: 27, style: { fill: "#FF1493", textShadow: "1px 1px 3px rgba(218, 165, 32, 0.6)" , strokeWidth: 1, fontFamily: "'Covered By Your Grace', cursive", charSpacing: 150 ,fontStyle: "italic"} },
  { text: "Dreamy Nights", size: 26, style: { fill: "#FFA07A", textShadow: "1px 1px 2px rgba(255, 160, 122, 0.8)", fontFamily: "'Caveat', cursive", fontStyle: "italic",fontStyle: "italic" } },
  ];

  const applyFancyTextStyle = (text, size, style) => {
    let shadowValue = "";
    if (style.textShadow) {
      const shadowParts = style.textShadow.match(/(-?\d+px)\s(-?\d+px)\s(\d+px)\s(rgba?\([^)]+\))/);
      if (shadowParts) {
        const [, offsetX, offsetY, blur, color] = shadowParts;
        shadowValue = `${color} ${parseInt(offsetX)} ${parseInt(offsetY)} ${parseInt(blur)}`;
      }
    }

    const finalStyle = {
      fill: style.fill || "#000000",
      shadow: shadowValue || "",
      fontSize: size,
      fontFamily: style.fontFamily || "Arial",
      fontWeight: style.fontWeight || "normal",
      fontStyle: style.fontStyle || "normal",
      stroke: style.stroke || (style.WebkitTextStroke ? style.WebkitTextStroke.split(" ")[1] : null),
      strokeWidth: style.strokeWidth || (style.WebkitTextStroke ? parseInt(style.WebkitTextStroke.split(" ")[0]) : 0),
      charSpacing: style.charSpacing || (style.letterSpacing ? parseInt(style.letterSpacing) * 100 : 0),
    };

    const finalText = text; // No emoji applied
    addCustomTextElement(finalText, size, finalStyle);
  };

  return (
    <div className="bg-white text-black overflow-y-auto w-full">
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
        <div className="w-full bg-gray-50 p-4 border-l border-gray-200 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2 text-purple-500">Fancy Text Styles</h3>
          <div className="space-y-3">
            {fancyTextStyles.map((fancyText, index) => (
              <button
                key={index}
                className="w-full text-left px-2 py-1 bg-white rounded-lg shadow hover:bg-purple-100 transition-colors"
                onClick={() => applyFancyTextStyle(fancyText.text, fancyText.size, fancyText.style)}
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