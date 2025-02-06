import { Plus } from "lucide-react";

const ServiceCategoriesCard = ({ title, description, image,  handleIsClicked}) => {

  const onClickOnCard = () => {
    handleIsClicked(true);
  }
  return (
    <div 
    onClick={() => onClickOnCard()}
    className="relative p-5 w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-300">
      {/* Background Image */}
      <div
        className="h-40 bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button className="text-foreground font-medium hover:underline">
            Know More
          </button>
          <button className="bg-gray-50 text-foreground p-2 rounded-full hover:bg-gray-200">
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategoriesCard;
