import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = ({ images }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const slideCard = [
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4},
    { id: 5},
    { id: 6},
  ];

  return (
    <div className="relative w-full px-16">
      <button onClick={scrollLeft} className="absolute left-5 lg:left-16 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg z-10">
        <ChevronLeft size={24} className='md:block hidden' />
      </button>

      <div className="lg:w-full w-[280px] ms-[-40px] lg:ms-0 overflow-hidden ">
        <motion.div ref={scrollRef} className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide gap-[1%]" whileTap={{ cursor: "grabbing" }}>
          {slideCard.map((item) => (
            <motion.div key={item.id} className=" shadow-lg rounded-lg p-2 flex-shrink-0 border border-gray-300 shadow_1 " whileHover={{ scale: 1.05 }}>
              <img className="lg:w-[200px] w-[100px] h-[100px] lg:h-[200px] rounded-md object-cover browse_image_card" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <button onClick={scrollRight} className="absolute right-2 lg:right-16 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg z-10">
        <ChevronRight size={24} className='md:block hidden' />
      </button>
    </div>
  );
};

export default ImageSlider;