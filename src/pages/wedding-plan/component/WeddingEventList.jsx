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

// A separate EventTask component with defensive checks and logging
const EventTask = ({
  task,
  index,
  onToggleStatus,
  onRemoveTask,
  onOpenModal,
  hoveredIndex,
  isMediumScreenOrSmaller,
}) => {
  // Defensive check for undefined task
  if (!task) {
    console.error(`EventTask: task is undefined at index ${index}`);
    return <div>Task data is missing.</div>;
  }

  

  return (
    <li
      key={task.id}
      className={`flex items-center p-3 rounded-md transition-all duration-300 ease-in-out ${
        task.done ? "bg-gray-50 text-gray-400" : "bg-white text-gray-700"
      } ${
        task.priority === "High"
          ? "border-l-8 border-red-400"
          : task.priority === "Medium"
          ? "border-l-8 border-yellow-400"
          : "border-l-8 border-green-400"
      } hover:shadow-md`}
      onMouseEnter={() => onToggleStatus(index, "enter")}
      onMouseLeave={() => onToggleStatus(index, "leave")}
    >
      <div
        className="cursor-pointer mr-3"
        onClick={() => onToggleStatus(task.id, task.done)}
      >
        <FaCheckCircle
          className={`transition-all duration-150 ${
            task.done ? "text-primary" : "text-gray-300 hover:text-primary"
          }`}
          size={20}
        />
      </div>

      <div
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => onToggleStatus(task.id, task.done)}
      >
        <span
          className={`leading-relaxed transition-all whitespace-normal block ${
            task.done ? "line-through opacity-50 bg-gray-400" : ""
          }`}
          style={{ wordBreak: "break-word" }}
        >
          {task.name}
        </span>
      </div>

      {task.scheduleDate && (
        <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-2">
          {new Date(task.scheduleDate).toLocaleDateString()}
        </span>
      )}

      <div className="flex flex-shrink-0 w-auto justify-end items-center space-x-3">
        <div className="relative">
          {task.scheduleDate ? (
            <BiBell
              className="text-primary hover:text-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
              size={18}
              onClick={() => onOpenModal(index)}
            />
          ) : (
            <BiBellPlus
              className={`transition-all duration-300 ease-in-out text-gray-300 hover:text-primary cursor-pointer ${
                hoveredIndex === index || isMediumScreenOrSmaller
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
              size={18}
              onClick={() => onOpenModal(index)}
            />
          )}
        </div>
        <FaTimes
          className={`transition-all duration-300 ease-in-out text-gray-300 hover:text-red-500 ${
            hoveredIndex === index || isMediumScreenOrSmaller
              ? "visible opacity-100"
              : "invisible opacity-0"
          }`}
          size={18}
          onClick={() => onRemoveTask(index)}
        />
      </div>
    </li>
  );
};

EventTask.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  hoveredIndex: PropTypes.number,
  isMediumScreenOrSmaller: PropTypes.bool.isRequired,
};



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

  const [isToggle, setIsToggle] = useState(false);
  const [toggledIndex, setToggleIndex] = useState(null);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteEventTask] = useDeleteEventTaskMutation();
  const [updateEventTask] = useUpdateEventTaskMutation();

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

  console.log(events)

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
      // refetch();
      // if (setRefetch) setRefetch(true);
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  // Remove a task
  const handleRemoveTask = async (index) => {
    // if (!tasks[index]) {
    //   console.error("handleRemoveTask: No task found at index", index);
    //   return;
    // }
    // const taskId = tasks[index].id;
    // try {
    //   await deleteEventTask(taskId).unwrap();
    //   toast.success("Task removed");
    //   refetch();
    //   if (setRefetch) setRefetch(true);
    // } catch (err) {
    //   console.error("Error deleting task:", err);
    //   toast.error("Failed to remove task");
    // }
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
        <>
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
                  {event.eventTask.map((task, index) => (
                    <EventTask
                      key={task?.id || index}
                      task={task}
                      index={index}
                      onToggleStatus={(idOrIndex, statusOrAction) => {
                        // Differentiate between hover events and status toggling
                        if (typeof statusOrAction === "string") {
                          handleHover(index, statusOrAction);
                        } else {
                          handleTaskStatus(idOrIndex, statusOrAction);
                        }
                      }}
                      onRemoveTask={handleRemoveTask}
                      onOpenModal={openModal}
                      hoveredIndex={hoveredIndex}
                      isMediumScreenOrSmaller={isMediumScreenOrSmaller}
                    />
                  ))}
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
        </>
      ))}
    </section>
  );
};

export default WeddingEventList;
