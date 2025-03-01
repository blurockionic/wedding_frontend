import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import moment from "moment";
// import SubEventView from "./sub-event/SubEventView";
import EventTask from "./EventTask";
import { useDeleteEventMutation } from "../../../redux/weddingPlanSlice";
import { toast } from "react-toastify";
import ServiceCard from "./ServiceCard";
import { FiMinusCircle } from "react-icons/fi";


const WeddingEventList = ({
  data,
  handleOnAddSubEvent,
  handleOnAddTask,
  handleOnAddVendor,
}) => {
  const [editingIndexes, setEditingIndexes] = useState({});
  const [eventData, setEventData] = useState(data);
  const [isActiveActions, setIsActiveActions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const [deletEvent, { isLoading, error }] = useDeleteEventMutation();

  //handle to add task
  // const handleOnAddSubEventTask = () => {
  //   setIsActiveSubEventTask((prev) => !prev);
  // };
  // //handle to add vendor
  // const handleOnAddSubEventVendor = () => {
  //   setIsActiveSubEventVendor((prev) => !prev);
  // };

  // const handle to delete event
  const handleOnDelete = async (eventId) => {
    try {
      const response = await deletEvent(eventId).unwrap();
      const { success, message } = response;
      if (success) {
        toast.success(message);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("delete event", eventId);
  };

  const handleRemove = (id) => {
    console.log("Remove task:", id);
  };

  const handleSchedule = (task) => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      task.name
    )}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const toggleEditing = (index, field) => {
    setEditingIndexes((prev) => ({
      ...prev,
      [`${index}-${field}`]: !prev[`${index}-${field}`],
    }));
  };

  const handleChange = (index, field, value) => {
    setEventData((prevData) =>
      prevData.map((event, i) =>
        i === index ? { ...event, [field]: value } : event
      )
    );
  };

  //handle to show the options
  const handleOnPlus = (index, eventId) => {
    setIsActiveActions((prev) => !prev);
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center  bg-gray-100 p-6">
        No event data available
      </div>
    );
  }

  return (
    <section className="bg-gray-100 p-6 mt-10 border-4 border-dashed rounded-md">
      {eventData.map((event, index) => (
        <>
          <div
            key={index}
            className="flex gap-20 justify-between  mb-4 p-4 bg-white shadow-md rounded-md "
          >
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-4 items-center">
                <span>{index + 1}.</span>
                {/* Editable Event Name */}
                <div className="flex flex-col">
                  <p className="font-thin">Event Name</p>
                  {editingIndexes[`${index}-eventName`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="text"
                      value={event.eventName}
                      onChange={(e) =>
                        handleChange(index, "eventName", e.target.value)
                      }
                      onBlur={() => toggleEditing(index, "eventName")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 cursor-pointer"
                      onClick={() => toggleEditing(index, "eventName")}
                    >
                      {event.eventName}
                    </p>
                  )}
                </div>

                {/* Editable Event Description */}
                <div className="flex flex-col">
                  <p className="font-thin">Event Description</p>
                  {editingIndexes[`${index}-eventDescription`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="text"
                      value={event.eventDescription}
                      onChange={(e) =>
                        handleChange(index, "eventDescription", e.target.value)
                      }
                      onBlur={() => toggleEditing(index, "eventDescription")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 w-64 cursor-pointer truncate"
                      onClick={() => toggleEditing(index, "eventDescription")}
                    >
                      {event.eventDescription}
                    </p>
                  )}
                </div>
                {/* Editable Event Date */}
                <div className="flex flex-col">
                  <p className="font-thin">Event Date</p>
                  {editingIndexes[`${index}-eventDate`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="date"
                      value={event.eventDate}
                      onChange={(e) =>
                        handleChange(index, "eventDate", e.target.value)
                      }
                      onBlur={() => toggleEditing(index, "eventDate")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 cursor-pointer"
                      onClick={() => toggleEditing(index, "eventDate")}
                    >
                      {moment(event.eventDate).format("DD-MM-YYYY")}
                    </p>
                  )}
                </div>

                {/* Editable Start Time */}
                <div className="flex flex-col">
                  <p className="font-thin">Start Time</p>
                  {editingIndexes[`${index}-eventStartTime`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="time"
                      value={event.eventStartTime}
                      onChange={(e) =>
                        handleChange(index, "eventStartTime", e.target.value)
                      }
                      onBlur={() => toggleEditing(index, "eventStartTime")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 cursor-pointer"
                      onClick={() => toggleEditing(index, "eventStartTime")}
                    >
                      {moment(event.eventStartTime).format("hh:mm A")}
                    </p>
                  )}
                </div>

                {/* Editable End Time */}
                <div className="flex flex-col">
                  <p className="font-thin">End Time</p>
                  {editingIndexes[`${index}-eventEndTime`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="time"
                      value={event.eventEndTime}
                      onChange={(e) =>
                        handleChange(index, "eventEndTime", e.target.value)
                      }
                      onBlur={() => toggleEditing(index, "eventEndTime")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 cursor-pointer"
                      onClick={() => toggleEditing(index, "eventEndTime")}
                    >
                      {moment(event.eventEndTime).format("hh:mm A")}
                    </p>
                  )}
                </div>

                {/* Editable Event Budget */}
                <div className="flex flex-col">
                  <p className="font-thin">Budget</p>
                  {editingIndexes[`${index}-eventBudget`] ? (
                    <input
                      className="mt-1 border rounded p-1"
                      type="number"
                      value={event.eventBudget}
                      onChange={(e) =>
                        handleChange(index, "eventBudget", e.target.value)
                      }
                      onBlur={() => toggleEditing(index, "eventBudget")}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="mt-1 cursor-pointer"
                      onClick={() => toggleEditing(index, "eventBudget")}
                    >
                      ₹{event.eventBudget}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col ml-12 mt-5">
                {/* sub event  */}
                {/* <div>
                <h1 className="text-md">Sub Event</h1>
                <SubEventView data={event.subEvent} handleOnAddSubEventTask={handleOnAddSubEventTask} handleOnAddSubEventVendor={handleOnAddSubEventVendor}/>
              </div> */}
                {/* task of event  */}
                <div>
                  <h1>Task</h1>
                  {event.eventTask.map((eventTask, index) => (
                    <EventTask
                      index={index}
                      key={eventTask.id}
                      task={eventTask.items.task}
                      onRemove={handleRemove}
                      onSchedule={handleSchedule}
                    />
                  ))}
                </div>
                {/* add vendors */}
                <div>
                  <h1>Vendor</h1>
                    <div className="grid grid-cols-3">
                      <ServiceCard
                        key={"1"}
                        service={[]}
                        category={"vendor"}
                        state={"Ranchi"}
                        subCategory={"caterer"}
                        city={"chaibasa"}
                      />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Button with Hover Menu */}
            <div className="right-4 top-4 relative">
              <button
                disabled={isLoading}
                className="p-2 bg-primary text-white rounded-md"
                onClick={() => handleOnDelete(event.id)}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <X />}
              </button>
              <button
                className="p-2 bg-primary text-white rounded-md"
                onClick={() => handleOnPlus(index, event.id)}
              >
                <Plus />
              </button>

              {/* Group of divs - hidden by default, shown on hover */}
              {isActiveActions && index === activeIndex && (
                <div
                  className={`absolute z-40 right-0 mt-2 w-48 bg-white p-4 rounded-md shadow-md transition-all duration-300 
              ${
                isActiveActions && index === activeIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
                >
                  <div className="flex flex-col gap-3">
                    <div
                      onClick={()=>handleOnAddVendor(event.id)}
                      className="cursor-pointer p-2 w-full shadow-sm h-16 border border-dashed border-primary text-primary flex justify-center items-center gap-2 rounded-md hover:bg-pink-100"
                    >
                      <Plus /> <span>Vendor</span>
                    </div>
                    <div
                      onClick={handleOnAddTask}
                      className="cursor-pointer p-2 w-full shadow-sm h-16 border border-dashed flex justify-center items-center gap-2 rounded-md border-primary text-primary  hover:bg-pink-100"
                    >
                      <Plus /> <span>Task</span>
                    </div>
                    {/* <div
                    onClick={handleOnAddSubEvent}
                    className="cursor-pointer p-2 w-full shadow-sm h-16 border border-dashed flex justify-center items-center gap-2 rounded-md border-primary text-primary  hover:bg-pink-100"
                  >
                    <Plus /> <span>Sub Event</span>
                  </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ))}
    </section>
  );
};

export default WeddingEventList;
