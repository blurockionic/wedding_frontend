import { Plus } from "lucide-react";

const ServiceCategoriesCard = ({ title, description, image, handleOnPlusBtn, handleOnCategory, className }) => {
  const onClickOnPlusBtn = () => {
    handleOnPlusBtn(title);
  };

  const handleOnCategoryBtn = () => {
    handleOnCategory(title);
  };

  return (
    <div
      className={`relative p-5 w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-200 hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {/* Background Image with Overlay */}
      <div
        className="h-48 bg-cover bg-center rounded-t-2xl relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title with Elegant Font */}
        <h2
          onClick={handleOnCategoryBtn}
          className="text-2xl font-bold text-gray-800 hover:text-pink-600 transition-colors duration-300 cursor-pointer"
        >
          {title}
        </h2>

        {/* Description with Smaller Font */}
        <p className="text-gray-600 text-sm mt-2">{description}</p>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          {/* Know More Button */}
          <button
            onClick={handleOnCategoryBtn}
            className="text-pink-600 font-medium hover:underline hover:text-pink-700 transition-colors duration-300"
          >
            Know More
          </button>

          {/* Plus Button with Elegant Design */}
          <button
            onClick={onClickOnPlusBtn}
            className="bg-pink-50 text-pink-600 p-2 rounded-full hover:bg-pink-100 transition-colors duration-300"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Decorative Ribbon (Optional) */}
      <div className="absolute top-0 right-0 bg-pink-600 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
        New
      </div>
    </div>
  );
};

export default ServiceCategoriesCard;