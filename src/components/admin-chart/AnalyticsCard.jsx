import { PiArrowUpRightBold } from "react-icons/pi";
import ChartBar from "./ChartBar";

const AnalyticsCard = ({ title, count, increment , bgColor = "#f5efec" }) => {
  return (
    <div className={`bg-[${bgColor}] rounded-xl shadow-md p-4 flex justify-between w-[360px] h-[280px]`}>
      <div>
        <p className="text-xl text-gray-700 font-medium ml-11 mt-4">{title}</p>
        <p className="text-[50px] font-medium text-gray-800 ml-11 mt-1 mb-2 flex">
          {count}
          <span className="text-green-500 text-[18px] mt-4 ml-2"> +{increment}</span>
        </p>
        <ChartBar />
      </div>
      <div className="text-xl text-[#f8cb83] bg-white rounded-3xl w-6 h-6 flex items-center justify-center mr-4 mt-4">
        <PiArrowUpRightBold />
      </div>
    </div>
  );
};

export default AnalyticsCard;