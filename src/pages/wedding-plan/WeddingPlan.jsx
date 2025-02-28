import { useState } from "react";
import ActionHeader from "./component/ActionHeader";
import CreateYourWeddingPlan from "./component/CreateYourWeddingPlan";
import HeadingCard from "./component/HeadingCard";
import sampleData from "./component/SampleDate";
import WeddingMindMap from "./component/WeddingMindMap";
import WeddingPlanSideNavber from "./component/WeddingPlanSideNavber";
import { X } from "lucide-react";
import CreateSubEvent from "./component/CreateSubEvent";
import CreateTaskForm from "./component/CreateTaskForm";
import AddVevdors from "./component/AddVevdors";

const WeddingPlan = () => {
  const [isActiveWeddingPlanForm, setIsActiveWeddingPlanForm] = useState(false);

  const [isActiveSubEvent, setIsActiveSubEvent] = useState(false)
  const [isActiveTask, setIsActiveTask] = useState(false)
  const [isActiveVendor, setIsActiveVendor] = useState(false)

const handleOnActive = () => {
  setIsActiveWeddingPlanForm((prev) => !prev); // Toggle the state
};

//handle add sub event 
const handleOnAddSubEvent = ()=>{
  setIsActiveSubEvent((prev)=> !prev)
}

//handle to add task
const handleOnAddTask = ()=>{
  setIsActiveTask((prev)=> !prev)
}
//handle to add vendor
const handleOnAddVendor = ()=>{
  setIsActiveVendor((prev)=> !prev)
}


  return (
    <div className="flex-col relative">
      <HeadingCard />
      
      <section className="p-6 w-full flex ">
        <WeddingPlanSideNavber />
        <div className="ml-[3rem]">
          <ActionHeader handleOnEventActive={handleOnActive} />
          <WeddingMindMap
            data={sampleData} 
            handleOnAddSubEvent={handleOnAddSubEvent}
            handleOnAddTask={handleOnAddTask}
            handleOnAddVendor={handleOnAddVendor}
          />
        </div>

      </section>

      {/* Backdrop Blur Effect */}
      {(isActiveWeddingPlanForm || isActiveSubEvent || isActiveTask || isActiveVendor) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity z-40"></div>
      )}

      {/* Sliding Form for event */}
      <div
         className={`fixed top-1/2 left-1/2 w-[700px] bg-white shadow-lg rounded-lg p-6 
        transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out 
        ${isActiveWeddingPlanForm ? "opacity-100 scale-100" : "opacity-0 scale-0"} z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveWeddingPlanForm(false)}
        >
          <X/>
        </button>
       
        <CreateYourWeddingPlan />
      </div>

       {/* Sliding Form for sub-event */}
       <div
        className={`fixed top-1/2 left-1/2 w-[500px] bg-white shadow-lg rounded-lg p-6 
        transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out 
        ${isActiveSubEvent ? "opacity-100 scale-100" : "opacity-0 scale-0"} z-50`}       
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveSubEvent(false)}
        >
          <X/>
        </button>
       
        <CreateSubEvent />
      </div>

      {/* Sliding Form for task */}
      <div
         className={`fixed top-1/2 left-1/2 w-[500px] bg-white shadow-lg rounded-lg p-6 
        transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out 
        ${isActiveTask ? "opacity-100 scale-100" : "opacity-0 scale-0"} z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveTask(false)}
        >
          <X/>
        </button>
       
        <CreateTaskForm />

      </div>


     {/* Pop-out Form for Vendor */}
      <div
        className={`fixed top-1/2 left-1/2 w-[700px] bg-white shadow-lg rounded-lg p-3  
        transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out 
        ${isActiveVendor ? "opacity-100 scale-100" : "opacity-0 scale-0"} z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveVendor(false)}
        >
          <X/>
        </button>

        {/* Vendor Form */}
        <AddVevdors />
      </div> 
    </div>
  );
};

export default WeddingPlan;
