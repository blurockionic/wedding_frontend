import { Download, Plus, Share } from "lucide-react";
import EventSummary from "./event-summary/EventSummary";

const ActionHeader = ({
  handleOnEventActive,
  handleOnDownloadPlan,
  handleOnShare,
  eventSummary,
}) => {
  return (
    <div className="flex flex-col mx-4 lg:mr-0  gap-10">
      <div className=" ">
        <EventSummary summary={eventSummary} />
      </div>

      <div className="flex justify-end items-center    gap-4">
        {/* <div
          onClick={handleOnShare}
          className="flex justify-center items-center border border-dashed border-green-500 text-green-500 px-5 py-2 rounded-md cursor-pointer"
        >
          <Share />
          <p className="ml-2">Share</p>
        </div> */}

        <div
          onClick={handleOnDownloadPlan}
          className="flex justify-center items-center border border-dashed border-primary text-primary px-5 py-2 rounded-md cursor-pointer"
        >
          <Download />
          <p className="ml-2 flex items-center gap-1">
            <span className="hidden md:block">Download </span> Plan
          </p>
        </div>

        <button
          onClick={handleOnEventActive}
          className="flex justify-center items-center bg-primary text-white px-5 py-2 rounded-md cursor-pointer hover:bg-yellow-400 transition duration-300"
        >
          <Plus />
          <p className="ml-2">Event</p>
        </button>
      </div>
    </div>
  );
};

export default ActionHeader;
