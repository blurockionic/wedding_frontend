import React, { useState } from "react";

// Custom SVGs for chevrons
const ChevronDownSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-6 h-6 text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const ChevronUpSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-6 h-6 text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 15l7-7 7 7"
    />
  </svg>
);

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      {/* Button with aria-expanded for accessibility */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`answer-${question}`}  // Provides context for screen readers
        className="w-full text-left p-3 font-semibold text-gray-800 focus:outline-none flex items-center justify-between hover:bg-gray-100 transition duration-300"
      >
        <span className="truncate">{question}</span>

        {/* Conditionally render SVG chevrons */}
        {isOpen ? (
          <ChevronUpSVG className="transition-transform transform rotate-180" />
        ) : (
          <ChevronDownSVG className="transition-transform" />
        )}
      </button>

      {/* Reveal answer text with smooth transition */}
      <div
        id={`answer-${question}`}  // Link to the answer for better accessibility
        className={`overflow-hidden transition-all duration-500 ease-out max-h-0 ${isOpen ? "max-h-[200px] opacity-100" : "opacity-0"}`}
      >
        {isOpen && <p className="text-gray-600 py-4 pl-6 pb-3">{answer}</p>}
      </div>
    </div>
  );
};

export default Accordion;
