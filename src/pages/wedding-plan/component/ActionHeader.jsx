import { Plus } from "lucide-react";

const ActionHeader = ({ handleOnEventActive }) => {
  return (
    <div className="flex justify-end items-center px-4 py-3 my-5 border-b">
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
