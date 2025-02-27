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
    <div className="flex relative">
      <WeddingPlanSideNavber />
      <section className="p-6 w-full">
        <HeadingCard />
        <ActionHeader handleOnEventActive={handleOnActive} />
        <WeddingMindMap 
        data={sampleData} 
        handleOnAddSubEvent={handleOnAddSubEvent}
        handleOnAddTask={handleOnAddTask}
        handleOnAddVendor={handleOnAddVendor}
        />
      </section>

      {/* Backdrop Blur Effect */}
      {(isActiveWeddingPlanForm || isActiveSubEvent || isActiveTask || isActiveVendor) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity z-40"></div>
      )}

      {/* Sliding Form for event */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg  transform ${
          isActiveWeddingPlanForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
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
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg  transform ${
          isActiveSubEvent ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
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
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg  transform ${
          isActiveTask ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveTask(false)}
        >
          <X/>
        </button>
       
        <CreateTaskForm />

      </div>


      {/* Sliding Form for vendor */}
      <div
        className={`fixed top-0 right-0 h-full w-[700px] bg-white shadow-lg  transform ${
          isActiveVendor ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveVendor(false)}
        >
          <X/>
        </button>
       
        <AddVevdors />
      </div>
    </div>
  );
};

export default WeddingPlan;
