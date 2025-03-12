import { Plus } from "lucide-react";

const ServiceCategoriesCard = ({
  title,
  description,
  image,
  handleOnPlusBtn,
  handleOnCategory,
  className,
}) => {
  const onClickOnPlusBtn = () => {
    handleOnPlusBtn(title);
  };

  const handleOnCategoryBtn = () => {
    handleOnCategory(title);
  };

  return (
    <div
      onClick={onClickOnPlusBtn}
      className={`relative p-5 w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-200 hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
     
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
      </div>

      <div className="absolute top-1 right-1 bg-pink-600 text-white px-4 py-1 text-sm font-semibold transform rotate-45 translate-x-6 -translate-y-2 shadow-md">
        New
      </div>
    </div>
  );
};

export default ServiceCategoriesCard;
