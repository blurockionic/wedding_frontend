import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsSliderOpen(true);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="relative w-full h-40 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.path}
              alt={`Service Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-5xl font-bold">
                  +{images.length - 3}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Manual slider */}
      {isSliderOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={closeSlider}
            >
              ✕
            </button>
            <img
              src={images[currentIndex].path}
              alt={`Service Image ${currentIndex + 1}`}
              className="w-full h-auto max-h-[90vh] rounded-lg"
            />
           
          </div>
          <div className="px-10 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex justify-between mt-2">
              <button
                className="bg-background py-1 px-2 text-5xl text-primary rounded-full"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
              >
                ◀ 
              </button>
              <button
                className="bg-background py-1 px-2 text-5xl text-primary rounded-full"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                ▶ 
              </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
