import { IoPersonOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";

const QueryCard = ({ name, phoneNumber, query, actions }) => {
  return (
    <div className=" border border-gray-300 rounded-lg p-4 text-center bg-white h-[30vh]">
      <div className="flex justify-start items-center gap-4">
        <div className="w-10 h-10 bg-pink-50 rounded-full mb-2 flex justify-center items-center"><IoPersonOutline className="text-pink-600 text-[20px]"/></div>
        <div>
          <div className="flex justify-start items-start">
            <p className="text-gray-700">{name}</p>
          </div>
          <div className="flex justify-start items-start">
            <p className="text-gray-700 flex justify-center items-center gap-2"><BsTelephone className="text-[16px] text-pink-600"/>{phoneNumber}</p>
          </div>
        </div>
      </div>
      <p className="text-gray-700 min-h-[40px] mb-2 flex justify-start h-[140px] p-2 mt-2 border border-gray-100 rounded">{query}</p>
      <div className="flex justify-around">
        {actions.map((action, index) => (
          <button key={index} className="px-3 py-1 bg-[#f9006c] rounded text-sm w-full h-[45px] text-white font-semibold">
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QueryCard;