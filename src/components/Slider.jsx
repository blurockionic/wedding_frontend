import { useState, useEffect, useRef } from "react";
import { useDeleteMediaMutation } from "../redux/uploadSlice";
import { FiTrash } from "react-icons/fi";

const Slider = ({ data, type, serviceId,refetch }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const sliderRef = useRef(null);
  const [deleteMediaMutation] = useDeleteMediaMutation();

  // Track loading state per item
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setShowNavButtons(
          sliderRef.current.scrollWidth > sliderRef.current.clientWidth
        );
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount =
      direction === "next" ? slider.clientWidth : -slider.clientWidth;
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setScrollPosition(slider.scrollLeft);
  };

  const handleDelete = async (publicId) => {
    setLoadingStates((prev) => ({ ...prev, [publicId]: true })); // Set loading for this item

    try {
      await deleteMediaMutation({ publicId, serviceId }).unwrap();
      console.log(`Media with ID: ${publicId} has been deleted`);
      refetch();
    } catch (error) {
      console.error("Error deleting media:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [publicId]: false })); // Reset loading state
    }
  };

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-4 py-4 scroll-smooth"
      >
        {data?.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item.public_id}
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

              <button
                title="Delete Media"
                onClick={() => handleDelete(item.public_id)}
                className="absolute top-2 right-2 bg-slate-600 text-white p-2 rounded-full shadow-lg hover:bg-red-500"
              >
                {loadingStates[item.public_id] ? (
                  <svg
                    className="w-5 h-5 animate-spin text-white"
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
                ) : (
                  <FiTrash />
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

      {showNavButtons && (
        <button
          onClick={() => scroll("prev")}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        >
          &lt;
        </button>
      )}
      {showNavButtons && (
        <button
          onClick={() => scroll("next")}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Slider;
