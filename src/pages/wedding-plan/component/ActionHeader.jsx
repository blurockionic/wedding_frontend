import { Download, Plus, Share } from "lucide-react";

const ActionHeader = ({ handleOnEventActive, handleOnDownloadPlan, handleOnShare}) => {
  return (
    <div className="flex justify-end items-center px-4 py-3 my-5 border-b gap-4">
       <div
        onClick={handleOnShare} 
        className="flex justify-center items-center border border-dashed border-green-500 text-green-500 px-5 py-2 rounded-md cursor-pointer"
      >
        <Share />
        <p className="ml-2">Share</p>
      </div>

       <div
        onClick={handleOnDownloadPlan} 
        className="flex justify-center items-center border border-dashed border-primary text-primary px-5 py-2 rounded-md cursor-pointer"
      >
        <Download />
        <p className="ml-2">Download Plan</p>
      </div>

      <div
        onClick={handleOnEventActive} 
        className="flex justify-center items-center bg-primary text-white px-5 py-2 rounded-md cursor-pointer"
      >
        <Plus />
        <p className="ml-2">Event</p>
      </div>
    </div>
  );
};

export default ActionHeader;
