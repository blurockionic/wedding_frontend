import { useState } from "react";

const ImageGallery = ({ images }) => {
  // Ensure images is always an array
  const safeImages = Array.isArray(images) ? images : [];
  const [selectedImage, setSelectedImage] = useState(safeImages[0]?.path || "");

  return (
    <div className="w-full md:w-3/4  flex flex-col items-center">
      {/* Large Preview Image */}
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover  rounded-lg"
          />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>

      {/* Thumbnail Scrollable List */}
      <div className="mt-4 w-full overflow-x-auto flex gap-2">
        {safeImages.map((image, index) => (
          <div
            key={index}
            className={`h-24 w-24 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden cursor-pointer border-2 ${
              selectedImage === image.path ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(image.path)}
          >
            <img
              src={image.path}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
