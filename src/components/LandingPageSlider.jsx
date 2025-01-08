import React, { useRef, useState, useEffect, useCallback } from "react";
import ServiceCard from "../components/ServiceCard";
import CustomText from "../components/global/text/CustomText";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const LandingPageSlider = React.memo(({ title, services }) => {
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  // Check for overflow and show arrows accordingly
  const checkArrowsVisibility = useCallback(() => {
    if (sliderRef.current) {
      const isScrollable = sliderRef.current.scrollWidth > sliderRef.current.offsetWidth;
      setShowArrows(isScrollable);
    }
  }, []);

  // Autoplay configuration
  useEffect(() => {
    const autoplay = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(autoplay);
  }, []);

  // Scroll functions
  const scrollLeft = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  // Check for arrows visibility on mount and on resize
  useEffect(() => {
    checkArrowsVisibility();
    window.addEventListener("resize", checkArrowsVisibility);
    
    return () => {
      window.removeEventListener("resize", checkArrowsVisibility);
    };
  }, [services, checkArrowsVisibility]);



  return (
    <div
      className="relative   mx-auto sm:px-5 max-w-7xl py-10 text-black rounded-lg"
    >
      {/* Title */}
      {title && (
        <CustomText
          as="h1"
          text={title}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold capitalize mb-6 text-gray-900"
        />
      )}

      {/* Slider */}
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        ref={sliderRef}
      >
        {services &&
          services.ServiceResult.map((service) => (
            <div
              className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] flex-shrink-0"
              key={service.id}
            >
              <ServiceCard service={service} />
            </div>
          ))}
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-5 lg:left-24 flex items-center justify-center
            w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg z-10"
            onClick={scrollLeft}
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5 lg:right-24 flex items-center justify-center
            w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg z-10"
            onClick={scrollRight}
          >
            <FaChevronRight size={20}  />
          </button>
        </>
      )}
    </div>
  );
});

export default LandingPageSlider;
