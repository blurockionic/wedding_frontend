import { useState } from "react";
import {
  CalendarCheck,
  CalendarDays,
  CalendarMinus,
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  HandCoins,
  Loader2,
  NotebookTabs,
  Plus,
  Trash,
} from "lucide-react";
import moment from "moment";
import {
  useDeleteEventMutation,
  useGetEventTasksQuery,
  useDeleteEventTaskMutation,
  useUpdateEventTaskMutation,
  useUpdateTaskStatusMutation,
} from "../../../redux/weddingPlanSlice";
import { toast } from "react-toastify";
import ServiceCard from "./ServiceCard";

import PropTypes from "prop-types";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { BiBell, BiBellPlus } from "react-icons/bi";
import { useEffect } from "react";
import TaskList from "./TaskList"

const WeddingEventList = ({
  events,
  handleOnAddSubEvent,
  handleOnAddTask,
  handleOnAddVendor,
  handleOnDeleteService
}) => {
  const [editingIndexes, setEditingIndexes] = useState({});
  const [isActiveActions, setIsActiveActions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [deleteEvent, { isLoading, error }] = useDeleteEventMutation();
  
  // Store the current event ID for tasks
  const [currentEventId, setCurrentEventId] = useState(null);
  
  // RTK Query hooks for fetching tasks - Only fetch when currentEventId is set
  const { data: tasksData, isLoading: tasksLoading, refetch } = useGetEventTasksQuery(
    currentEventId, 
    { skip: !currentEventId }
  );
  
  // Ensure tasks is an array
  const tasks = Array.isArray(tasksData) ? tasksData : tasksData?.tasks || [];

  const [isToggle, setIsToggle] = useState(false);
  const [toggledIndex, setToggleIndex] = useState(null);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteEventTask] = useDeleteEventTaskMutation();
  const [updateEventTask] = useUpdateEventTaskMutation();

  // Update currentEventId when toggledIndex changes
  useEffect(() => {
    if (isToggle && toggledIndex !== null && events[toggledIndex]) {
      setCurrentEventId(events[toggledIndex].id);
    }
  }, [isToggle, toggledIndex, events]);

  // Custom hook for media query
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
      typeof window !== "undefined" ? window.matchMedia(query).matches : false
    );

    useEffect(() => {
      const media = window.matchMedia(query);
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  };

  const isMediumScreenOrSmaller = useMediaQuery("(max-width: 1024px)");

  // const handle to delete event
  const handleOnDelete = async (eventId) => {
    try {
      const response = await deleteEvent(eventId).unwrap();
      const { success, message } = response;
      if (success) {
        toast.success(message);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("delete event", eventId);
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

  // Handle hover events for tasks (for visual effects)
  const handleHover = (index, action) => {
    if (action === "enter") {
      setHoveredIndex(index);
    } else if (action === "leave") {
      setHoveredIndex(null);
    }
  };

  // Open calendar modal to set schedule date
  const openModal = (index) => {
    setSelectedTaskIndex(index);
    setShowCalendar(true);
  };

  // Toggle task status (done/undone)
  const handleTaskStatus = async (taskId, currentStatus) => {
    try {
      console.log(
        "Toggling status for taskId:",
        taskId,
        "Current status:",
        currentStatus
      );
      await updateTaskStatus({
        taskId,
        status: !currentStatus,
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="flex justify-center items-center  bg-gray-100 p-6">
        No event data available
      </div>
    );
  }

  return (
    <section className="p-2  border-1 border-b-2 rounded-md">
      {events.map((event, index) => (
        <div
          key={index}
          className="flex gap-10 justify-between  mb-4 p-4 bg-white shadow-md rounded-md "
        >
          <div className="flex flex-col gap-5 md:gap-10">
            <div className="flex flex-wrap gap-4 items-center">
              <span>{index + 1}.</span>
              {/* Editable Event Name */}
              <div className="flex flex-col">
                <p className="font-thin flex items-center gap-x-1">
                  <span>
                    <CalendarCheck size={16} />
                  </span>
                  Event Name
                </p>
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
                    className="mt-1 cursor-pointer capitalize text-green-500 text-xl"
                    onClick={() => toggleEditing(index, "eventName")}
                  >
                    {event.eventName}
                  </p>
                )}
              </div>

              {/* Editable Event Description */}
              <div
                className={`${
                  isToggle && index === toggledIndex
                    ? "flex flex-col"
                    : "hidden"
                } `}
              >
                <p className="font-thin flex items-center gap-x-1">
                  <span>
                    <NotebookTabs size={16} />
                  </span>
                  Description
                </p>
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
                    className="mt-1 w-64 cursor-pointer truncate text-xl"
                    onClick={() => toggleEditing(index, "eventDescription")}
                  >
                    {event.eventDescription}
                  </p>
                )}
              </div>
              {/* Editable Event Date */}
              <div className="flex flex-col">
                <p className="font-thin flex items-center gap-x-1">
                  <span>
                    <CalendarDays size={16} />
                  </span>
                  Date
                </p>
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
                    className="mt-1 cursor-pointer text-xl"
                    onClick={() => toggleEditing(index, "eventDate")}
                  >
                    {moment(event.eventDate).format("DD-MM-YYYY")}
                  </p>
                )}
              </div>

              {/* Editable Start Time */}
              <div
                className={`${
                  isToggle && index === toggledIndex
                    ? "flex flex-col"
                    : "hidden"
                } `}
              >
                <p className="font-thin flex items-center gap-x-1">
                  <span>
                    <CalendarPlus size={16} />
                  </span>
                  Start Date
                </p>
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
                    className="mt-1 cursor-pointer text-xl"
                    onClick={() => toggleEditing(index, "eventStartTime")}
                  >
                    {moment(event.eventStartTime).format("hh:mm A")}
                  </p>
                )}
              </div>

              {/* Editable End Time */}
              <div
                className={`${
                  isToggle && index === toggledIndex
                    ? "flex flex-col"
                    : "hidden"
                } `}
              >
                <p className="font-thin flex items-center gap-x-1">
                  <span>
                    <CalendarMinus size={16} />
                  </span>
                  End Date
                </p>
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
                    className="mt-1 cursor-pointer text-xl"
                    onClick={() => toggleEditing(index, "eventEndTime")}
                  >
                    {moment(event.eventEndTime).format("hh:mm A")}
                  </p>
                )}
              </div>

              {/* Editable Event Budget */}
              <div className={` flex flex-col  `}>
                <p className="font-thin flex items-center gap-x-1">
                  <span>
                    <HandCoins size={16} />
                  </span>
                  Budget
                </p>
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
                    className="mt-1 cursor-pointer text-red-500 text-xl"
                    onClick={() => toggleEditing(index, "eventBudget")}
                  >
                    ₹{event.eventBudget}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`${
                isToggle && index === toggledIndex
                  ? "flex flex-col md:px-10"
                  : "hidden"
              } `}
            >
              {/* task of event  */}
              <div className="flex flex-col gap-4  bg-yellow-50 p-4 rounded-lg">
                <h1 className="text-yellow-500">Task</h1>
                {/* Only render TaskList if this is the active event */}
                {isToggle && index === toggledIndex && (
                  <TaskList
                    tasks={tasks}
                    eventId={event.id}
                    isLoading={tasksLoading}
                    updateTaskStatus={updateTaskStatus}
                    deleteEventTask={deleteEventTask}
                    updateEventTask={updateEventTask}
                    refetch={refetch}
                  />
                )}
              </div>
              
            </div>
            {/* add vendors */}
            <div
                className={`${
                  isToggle && index === toggledIndex
                    ? "flex flex-col md:px-10"
                    : "hidden"
                } `}
              >
                <div className="bg-blue-50 rounded-lg">
                <h1 className="text-blue-700  my-5 px-4">Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 ">
                  {event.eventVendors.map((vendor) => (
                    <ServiceCard key={vendor.id} service={vendor} setRefetch={handleOnDeleteService}/>
                  ))}
                </div>
                </div>
              </div>
          </div>

          {/* Floating Button with Hover Menu */}
          <div className="flex flex-col">
            <button
              // disabled={isToggle}
              className="p-2 text-primary rounded-md"
              onClick={() => {
                setIsToggle((prev) => !prev);
                setToggleIndex(index);
              }}
            >
              {isToggle && index === toggledIndex ? (
                <ChevronDown size={30} />
              ) : (
                <ChevronUp size={30} />
              )}
            </button>

            {/* Floating Button with Hover Menu */}
            <div
              className={`${
                isToggle && index === toggledIndex
                  ? "right-4 top-4 relative"
                  : "hidden"
              }`}
            >
              <button
                disabled={isLoading}
                className="p-2 bg-primary text-white rounded-md mr-5"
                onClick={() => handleOnDelete(event.id)}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Trash />}
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
                      onClick={() => handleOnAddVendor(event.id)}
                      className="cursor-pointer p-2 w-full shadow-sm h-16 border border-dashed border-primary text-primary flex justify-center items-center gap-2 rounded-md hover:bg-pink-100"
                    >
                      <Plus /> <span>Vendor</span>
                    </div>
                    <div
                      onClick={() => handleOnAddTask(event.id)}
                      className="cursor-pointer p-2 w-full shadow-sm h-16 border border-dashed flex justify-center items-center gap-2 rounded-md border-primary text-primary  hover:bg-pink-100"
                    >
                      <Plus /> <span>Task</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

WeddingEventList.propTypes = {
  events: PropTypes.array.isRequired,
  handleOnAddSubEvent: PropTypes.func,
  handleOnAddTask: PropTypes.func,
  handleOnAddVendor: PropTypes.func,
  handleOnDeleteService: PropTypes.func
};

export default WeddingEventList;