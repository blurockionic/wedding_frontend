const ServicesCard = ({ title, count, increment , bgColor = "#f5efec" }) => {
  return (
    <div className={`bg-[${bgColor}] rounded-xl shadow-md p-4 flex justify-between w-[360px] h-[156px]`}>
      <div>
        <p className="text-xl text-gray-700 font-medium ml-4 mt-2">{title}</p>
        <p className="text-[50px] font-medium text-gray-800 ml-4 mt-2 flex">
          {title === "Total Revenue" && "₹"}
          {count}
          <span className="text-green-500 text-[18px] mt-4 ml-2"> +{increment}</span>
        </p>
      </div>
    </div>
  );
};

export default ServicesCard;