import React, { useState } from "react";

function Dropdown({ title, options }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative w-full lg:w-auto">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-3 rounded-full text-[12px] font-semibold transition-all duration-300 bg-pink-100 text-pink-600 shadow-md hover:bg-pink-50"
        >
          {title}<span className='text-pink-500'> ▼</span>
        </button>
        {isOpen && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg z-10">
            {options.map((option) => (
              <button
                key={option.id}
                className="w-full px-5 py-3 text-left hover:bg-pink-100 transition-all duration-300"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  export default Dropdown;
