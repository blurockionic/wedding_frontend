import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ElementsSection = ({ designs, addDesignElement }) => {
  const flowerRef = useRef(null);
  const borderRef = useRef(null);
  const simpleRef = useRef(null);

  const scrollLeft = (ref) => ref.current.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = (ref) => ref.current.scrollBy({ left: 200, behavior: "smooth" });

  const flowers = designs.filter((design) => design.type === "flower");
  const borders = designs.filter((design) => design.type === "border");
  const simples = designs.filter((design) => design.type === "simple");

  return (
    <div className="h-full text-black overflow-y-auto md:w-72 bg-white w-full">
      <div className="p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder=" Search Elements...."
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
          />
        </div>
        {/* Flowers Slider */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-500">Flowers</h3>
          <div className="relative flex items-center">
            <button onClick={() => scrollLeft(flowerRef)} className="absolute -left-2 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4">
              <FaArrowLeft className="w-3 h-3" />
            </button>
            <div ref={flowerRef} className="flex space-x-2 overflow-hidden pb-2 scroll-smooth w-full px-10">
              {flowers.map((design) => (
                <div key={design.id} className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2 flex-shrink-0" onClick={() => addDesignElement(design)}>
                  <img src={design.src} alt={design.name} className="w-16 h-16 object-contain" />
                  <span className="text-xs text-center block mt-1">{design.name}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollRight(flowerRef)} className="absolute -right-3 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4">
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        {/* Borders Slider */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-500">Borders</h3>
          <div className="relative flex items-center">
            <button onClick={() => scrollLeft(borderRef)} className="absolute -left-2 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4">
              <FaArrowLeft className="w-3 h-3" />
            </button>
            <div ref={borderRef} className="flex space-x-2 overflow-hidden pb-2 scroll-smooth w-full px-10">
              {borders.map((design) => (
                <div key={design.id} className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2 flex-shrink-0" onClick={() => addDesignElement(design)}>
                  <img src={design.src} alt={design.name} className="w-16 h-16 object-contain" />
                  <span className="text-xs text-center block mt-1">{design.name}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollRight(borderRef)} className="absolute -right-3 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4">
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        {/* Simple Slider */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-500">Simple</h3>
          <div className="relative flex items-center">
            <button onClick={() => scrollLeft(simpleRef)} className="absolute -left-2 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4">
              <FaArrowLeft className="w-3 h-3" />
            </button>
            <div ref={simpleRef} className="flex space-x-2 overflow-hidden pb-2 scroll-smooth w-full px-10">
              {simples.map((design) => (
                <div key={design.id} className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] bg-white/10 p-2 flex-shrink-0" onClick={() => addDesignElement(design)}>
                  <img src={design.src} alt={design.name} className="w-16 h-16 object-contain" />
                  <span className="text-xs text-center block mt-1">{design.name}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollRight(simpleRef)} className="absolute -right-3 p-1 bg-gray-500 text-white rounded-full hover:bg-rose-600 transition-transform transform hover:scale-110 z-10 -mt-4">
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementsSection;