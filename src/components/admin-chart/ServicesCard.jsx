

const ServicesCard = ({ title, count, increment , backgroundColor, image }) => {
  return (
    <div className="bg-[${bgColor}] rounded-xl shadow-md p-4 flex justify-between w-[90%] h-[156px]" style={{ backgroundColor: backgroundColor }}>
      <div className="flex justify-center items-center">
        <div>
          {image && (
          <div className="">
          <img
            src={image}
            className="w-20 h-20 ml-4"
          />
          </div>
          )}
        </div>
        <div className="ml-6">
          <p className="text-xl text-gray-700 font-medium ml-4 mt-2">{title}</p>
          <p className="text-[50px] font-medium text-gray-800 ml-4 mt-2 flex">
            {title === "Total Revenue" && "₹"}
            {count}
            <span className="text-green-500 text-[18px] mt-4 ml-2"> +{increment}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;