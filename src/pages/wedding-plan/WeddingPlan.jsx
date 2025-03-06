import { useEffect, useState } from "react";
import ActionHeader from "./component/ActionHeader";
import CreateYourWeddingPlan from "./component/CreateYourWeddingPlan";
import HeadingCard from "./component/HeadingCard";
import WeddingEventList from "./component/WeddingEventList";
import WeddingPlanSideNavber from "./component/WeddingPlanSideNavber";
import { X } from "lucide-react";
// import CreateSubEvent from "./component/CreateSubEvent";
import CreateTaskForm from "./component/CreateTaskForm";
import AddVevdors from "./component/AddVevdors";
import { useGetWeddingPlanQuery } from "../../redux/weddingPlanSlice";
import AddTaskOnEvent from "./component/addTaskOnEvent";

const WeddingPlan = () => {
  const { data, error, isLoading, refetch } = useGetWeddingPlanQuery();
  const [isActiveWeddingPlanForm, setIsActiveWeddingPlanForm] = useState(false);
  const [isActiveSubEvent, setIsActiveSubEvent] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState(false);
  const [isActiveVendor, setIsActiveVendor] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isRefetchData, setIsRefetchData] = useState(false);
  const [eventId, setEventId] =  useState(null)


  useEffect(()=>{
    if(refetch){
      refetch() //refetch the event 
      setIsRefetchData(false)
    }
  },[isRefetchData, refetch])

  const handleOnActive = () => {
    setIsActiveWeddingPlanForm((prev) => !prev); // Toggle the state
  };

  //handle add sub event
  const handleOnAddSubEvent = () => {
    setIsActiveSubEvent((prev) => !prev);
  };

  //handle to add task
  const handleOnAddTask = (eventId) => {
    console.log(eventId)
    setSelectedEvent(eventId);
    setIsActiveTask((prev) => !prev);
  };
  
  //handle to add vendor
  const handleOnAddVendor = (serviceId) => {
    console.log(serviceId)
    setEventId(serviceId)
    setIsActiveVendor((prev) => !prev);
  };


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching wedding plans.</p>;

 
  return (
    <div className="flex-col relative">
      <section className="p-3 w-full flex ">
        <WeddingPlanSideNavber />
        <div className="w-full p-3">
          <HeadingCard />
          <ActionHeader handleOnEventActive={handleOnActive} />
          <WeddingEventList
            data={data.events}
            handleOnAddSubEvent={handleOnAddSubEvent}
            handleOnAddTask={handleOnAddTask}
            handleOnAddVendor={handleOnAddVendor}
          />
        </div>
      </section>

      {/* Backdrop Blur Effect */}
      {(isActiveWeddingPlanForm ||
        isActiveSubEvent ||
        isActiveTask ||
        isActiveVendor) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity z-40"></div>
      )}

      {/* Sliding Form for event */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg p-6 transform ${
          isActiveWeddingPlanForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveWeddingPlanForm(false)}
        >
          <X />
        </button>

        <CreateYourWeddingPlan setRefetch={() => setIsRefetchData(true)} />
      </div>

      {/* Sliding Form for sub-event */}
      {/* <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg p-6 transform ${
          isActiveSubEvent ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveSubEvent(false)}
        >
          <X />
        </button>

        <CreateSubEvent />
      </div> */}

      {/* Sliding Form for task */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg p-6 transform ${
          isActiveTask ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => {
            setIsActiveTask(false);
            setSelectedEvent(null);
          }}
        >
          <X />
        </button>

        {/* {isActiveTask && selectedEvent && ( */}
          {/* // <CreateTaskForm  */}
          {/* //   eventId={selectedEvent.id} 
          //   eventTitle={selectedEvent.title} 
          // /> */}
          <AddTaskOnEvent eventId={selectedEvent} />


        {/* )} */}
      </div>

      {/* Pop-out Form for Vendor */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg p-6 transform ${
          isActiveVendor ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => setIsActiveVendor(false)}
        >
          <X />
        </button>

        {/* Vendor Form */}
        <AddVevdors eventId={eventId}/>
      </div>
    </div>
  );
};

export default WeddingPlan;