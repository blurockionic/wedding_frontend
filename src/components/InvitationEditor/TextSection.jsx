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

  const emojis = ["❤️", "🔥", "✨", "🎉", "⭐", "💍", "💞", "👑", "😊", "👀", "✌️", "👈", "🎇", "🎁", "🎀", "🎗️", "🎂", "🌸", "💫", "💥", "💝", "❤️‍🔥", "💖", "🦚", "🦋"];

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

  return (
    <div className="h-screen bg-white text-black overflow-y-auto w-full md:-mt-[50px]">
      <div className="p-4">
        <div className="mb-4">
          <input type="text" placeholder=" Search fonts....." className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-pink-500" />
        </div>
        <div className="mb-4">
          <button className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors" onClick={() => applyTextStyle("Enter text here", 16)}>
            Add a text box
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-purple-500">Text Styles</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors text-[30px]" onClick={() => applyTextStyle("Add a heading", 38)}>
              Add a heading
            </button>
            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors text-[22px]" onClick={() => applyTextStyle("Add a subheading", 24)}>
              Add a subheading
            </button>
            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors text-[12px]" onClick={() => applyTextStyle("Add a little bit of body text", 14)}>
              Add a little bit of body text
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-purple-500">Text Effects</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={textEffects.glow} onChange={(e) => setTextEffects({ ...textEffects, glow: e.target.checked })} />
              Glow Effect
            </label>
            <select value={textEffects.outline} onChange={(e) => setTextEffects({ ...textEffects, outline: e.target.value })} className="w-full p-2 rounded border">
              <option value="none">No Outline</option>
              <option value="1px white">White Outline</option>
              <option value="2px black">Black Outline</option>
            </select>
            <select value={textEffects.shadow} onChange={(e) => setTextEffects({ ...textEffects, shadow: e.target.value })} className="w-full p-2 rounded border">
              <option value="none">No Shadow</option>
              <option value="1px 1px 2px rgba(0,0,0,0.3)">Soft Shadow</option>
              <option value="2px 2px 4px rgba(0,0,0,0.5)">Bold Shadow</option>
            </select>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={textEffects.gradient} onChange={(e) => setTextEffects({ ...textEffects, gradient: e.target.checked })} />
              Gradient Text
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={textEffects.curved} onChange={(e) => setTextEffects({ ...textEffects, curved: e.target.checked })} />
              Curved Text
            </label>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-purple-500">Emojis & Stickers</h3>
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <button key={emoji} className="p-2 bg-gray-100 rounded hover:bg-purple-100" onClick={() => setTextEffects({ ...textEffects, emoji })}>
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSection;