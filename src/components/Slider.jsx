import { useState, useEffect, useRef } from "react";
import { useDeleteMediaMutation } from "../redux/uploadSlice";
import { FcDeleteDatabase } from "react-icons/fc";
import { FiDelete, FiTrash } from "react-icons/fi";

const Slider = ({ data, type, serviceId }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const sliderRef = useRef(null);
  const [deleteMediaMutation, { isLoading }] = useDeleteMediaMutation();

  // Track scroll position and determine overflow
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const isOverflowing =
          sliderRef.current.scrollWidth > sliderRef.current.clientWidth;
        setShowNavButtons(isOverflowing);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initially on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  // Smooth scroll to the left or right
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount =
      direction === "next" ? slider.clientWidth : -slider.clientWidth;
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    setScrollPosition(slider.scrollLeft);
  };

  // Delete media item
  const handleDelete = (publicId) => {
    deleteMediaMutation({ publicId, serviceId })
      .unwrap()
      .then(() => {
        console.log(`Media with ID: ${publicId} has been deleted`);
      })
      .catch((error) => {
        console.error("Error deleting media:", error);
      });
  };

  return (
    <div className="relative">
      {/* Scrollable Slider */}
      <div
        ref={sliderRef}
        id={`slider-${type}`}
        className="flex overflow-x-auto space-x-4 py-4 scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {data?.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="flex-none w-64 sm:w-72 lg:w-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative"
            >
              {type === "image" ? (
                <img
                  src={item.path}
                  alt={item.original_name}
                  className="object-cover w-full h-60 rounded-lg"
                />
              ) : type === "video" ? (
                <video
                  src={item.path}
                  controls
                  className="object-cover w-full h-60 rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}

              {/* Delete Button */}
              <button
              title="Delete Media"
                onClick={() => handleDelete(item.public_id)} // Assuming each item has an 'id'
                className="absolute top-2 right-2 bg-slate-600 text-white p-2 rounded-full shadow-lg hover:bg-red-500"
              >
                {!isLoading ? (
                  <FiTrash />
                ) : (
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="flex-none w-full sm:w-72 lg:w-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-white">
            No Media Available
          </div>
        )}
      </div>

      {/* Left Navigation Button */}
      {showNavButtons && (
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => scroll("prev")}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            &lt;
          </button>
        </div>
      )}

      {/* Right Navigation Button */}
      {showNavButtons && (
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
          <button
            onClick={() => scroll("next")}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
