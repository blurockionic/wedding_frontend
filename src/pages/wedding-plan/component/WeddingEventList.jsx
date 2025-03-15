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
  useUpdateEventMutation, // Add this import
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
  const [eventData, setEventData] = useState(events);
  const [isActiveActions, setIsActiveActions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [deleteEvent, { isLoading, error }] = useDeleteEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation(); // Add this hook
  
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

  // Update eventData whenever events prop changes
  useEffect(() => {
    setEventData(events);
  }, [events]);

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

  // the handle to delete event
  const handleOnDelete = async (eventId) => {
    try {
      const response = await deleteEvent(eventId).unwrap();
      const { success, message } = response;
      if (success) {
        toast.success(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event");
    }
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

  // New function to save event changes
  // New function to save event changes
const handleSaveChanges = async (index, field) => {
  try {
    const event = eventData[index];
    const eventId = event.id;
    
    // Include all required fields in the update payload
    const updatePayload = {
      eventId,
      data: {
        eventName: event.eventName,
        eventDescription: event.eventDescription || "",  // Provide default if empty
        eventDate: event.eventDate,
        eventBudget: event.eventBudget,
        eventStartTime: event.eventStartTime,  // Add this line
        eventEndTime: event.eventEndTime       // Add this line
      }
    };
    
    // Call the update API
    const response = await updateEvent(updatePayload).unwrap();
    
    if (response.success) {
      toast.success(`Event ${field} updated successfully`);
    } else {
      // Revert changes if API call failed
      setEventData(events);
      toast.error("Failed to update event");
    }
  } catch (error) {
    console.error("Error updating event:", error);
    toast.error(error.data?.message || "Failed to update event");
    // Revert changes on error
    setEventData(events);
  } finally {
    // End editing mode
    toggleEditing(index, field);
  }
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
  <section className="p-4 bg-gray-50 rounded-lg">
    {eventData.map((event, index) => (
      <div
        key={index}
        className="mb-6 overflow-hidden bg-white shadow-md rounded-lg border border-gray-100"
      >
        {/* Main Event Card Header */}
        <div className="flex justify-between items-start p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full">
              {index + 1}
            </div>
            
            {/* Event Name */}
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 flex items-center gap-x-1">
                <CalendarCheck size={14} className="text-primary" />
                Event Name
              </p>
              {editingIndexes[`${index}-eventName`] ? (
                <div className="flex items-center">
                  <input
                    className="mt-1 border rounded p-1 w-full focus:ring-1 focus:ring-primary focus:border-primary"
                    type="text"
                    value={event.eventName}
                    onChange={(e) => handleChange(index, "eventName", e.target.value)}
                    autoFocus
                  />
                  <button 
                    className="ml-2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => handleSaveChanges(index, "eventName")}
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "✓"}
                  </button>
                </div>
              ) : (
                <h3
                  className="font-medium text-lg cursor-pointer capitalize text-green-600 hover:text-green-700"
                  onClick={() => toggleEditing(index, "eventName")}
                >
                  {event.eventName}
                </h3>
              )}
            </div>
          </div>

          {/* Date and Budget Info */}
          <div className="flex items-center gap-6">
            {/* Event Date */}
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 flex items-center gap-x-1">
                <CalendarDays size={14} className="text-primary" />
                Date
              </p>
              {editingIndexes[`${index}-eventDate`] ? (
                <div className="flex items-center">
                  <input
                    className="mt-1 border rounded p-1 focus:ring-1 focus:ring-primary focus:border-primary"
                    type="date"
                    value={event.eventDate}
                    onChange={(e) => handleChange(index, "eventDate", e.target.value)}
                    autoFocus
                  />
                  <button 
                    className="ml-2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => handleSaveChanges(index, "eventDate")}
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "✓"}
                  </button>
                </div>
              ) : (
                <p
                  className="font-medium cursor-pointer"
                  onClick={() => toggleEditing(index, "eventDate")}
                >
                  {moment(event.eventDate).format("DD-MM-YYYY")}
                </p>
              )}
            </div>

            {/* Event Budget */}
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 flex items-center gap-x-1">
                <HandCoins size={14} className="text-primary" />
                Budget
              </p>
              {editingIndexes[`${index}-eventBudget`] ? (
                <div className="flex items-center">
                  <input
                    className="mt-1 border rounded p-1 focus:ring-1 focus:ring-primary focus:border-primary"
                    type="number"
                    value={event.eventBudget}
                    onChange={(e) => handleChange(index, "eventBudget", e.target.value)}
                    autoFocus
                  />
                  <button 
                    className="ml-2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => handleSaveChanges(index, "eventBudget")}
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "✓"}
                  </button>
                </div>
              ) : (
                <p
                  className="font-medium cursor-pointer text-red-500"
                  onClick={() => toggleEditing(index, "eventBudget")}
                >
                  ₹{event.eventBudget}
                </p>
              )}
            </div>

            {/* Toggle & Action Buttons */}
            <div className="flex items-center">
              <button
                className="p-2 text-primary rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setIsToggle((prev) => !prev);
                  setToggleIndex(index);
                }}
              >
                {isToggle && index === toggledIndex ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>
              
              {isToggle && index === toggledIndex && (
                <div className="flex gap-2 ml-2">
                  <button
                    disabled={isLoading}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => handleOnDelete(event.id)}
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Trash size={18} />}
                  </button>
                  <button
                    className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors relative"
                    onClick={() => handleOnPlus(index, event.id)}
                  >
                    <Plus size={18} />
                    
                    {/* Dropdown Menu */}
                    {isActiveActions && index === activeIndex && (
                      <div className="absolute z-40 right-0 top-full mt-2 w-48 bg-white p-3 rounded-md shadow-lg border border-gray-100">
                        <div className="flex flex-col gap-2">
                          <div
                            onClick={() => handleOnAddVendor(event.id)}
                            className="cursor-pointer p-3 w-full border border-dashed border-primary text-primary flex items-center gap-2 rounded-md hover:bg-pink-50 transition-colors"
                          >
                            <Plus size={16} /> <span>Add Vendor</span>
                          </div>
                          <div
                            onClick={() => handleOnAddTask(event.id)}
                            className="cursor-pointer p-3 w-full border border-dashed border-primary text-primary flex items-center gap-2 rounded-md hover:bg-pink-50 transition-colors"
                          >
                            <Plus size={16} /> <span>Add Task</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        {isToggle && index === toggledIndex && (
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Event Description */}
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 flex items-center gap-x-1 mb-1">
                  <NotebookTabs size={14} className="text-primary" />
                  Description
                </p>
                {editingIndexes[`${index}-eventDescription`] ? (
                  <div className="flex items-center">
                    <input
                      className="border rounded p-2 w-full focus:ring-1 focus:ring-primary focus:border-primary"
                      type="text"
                      value={event.eventDescription}
                      onChange={(e) => handleChange(index, "eventDescription", e.target.value)}
                      autoFocus
                    />
                    <button 
                      className="ml-2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => handleSaveChanges(index, "eventDescription")}
                    >
                      {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "✓"}
                    </button>
                  </div>
                ) : (
                  <p
                    className="cursor-pointer p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => toggleEditing(index, "eventDescription")}
                  >
                    {event.eventDescription || "Add a description..."}
                  </p>
                )}
              </div>

              {/* Event Times */}
              <div className="grid grid-cols-2 gap-4">
                {/* Start Time */}
                <div className="flex flex-col">
                  <p className="text-xs text-gray-500 flex items-center gap-x-1 mb-1">
                    <CalendarPlus size={14} className="text-primary" />
                    Start Time
                  </p>
                  {editingIndexes[`${index}-eventStartTime`] ? (
                    <div className="flex items-center">
                      <input
                        className="border rounded p-2 w-full focus:ring-1 focus:ring-primary focus:border-primary"
                        type="time"
                        value={event.eventStartTime}
                        onChange={(e) => handleChange(index, "eventStartTime", e.target.value)}
                        autoFocus
                      />
                      <button 
                        className="ml-2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={() => handleSaveChanges(index, "eventStartTime")}
                      >
                        {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "✓"}
                      </button>
                    </div>
                  ) : (
                    <p
                      className="cursor-pointer p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => toggleEditing(index, "eventStartTime")}
                    >
                      {moment(event.eventStartTime).format("hh:mm A")}
                    </p>
                  )}
                </div>

                {/* End Time */}
                <div className="flex flex-col">
                  <p className="text-xs text-gray-500 flex items-center gap-x-1 mb-1">
                    <CalendarMinus size={14} className="text-primary" />
                    End Time
                  </p>
                  {editingIndexes[`${index}-eventEndTime`] ? (
                    <div className="flex items-center">
                      <input
                        className="border rounded p-2 w-full focus:ring-1 focus:ring-primary focus:border-primary"
                        type="time"
                        value={event.eventEndTime}
                        onChange={(e) => handleChange(index, "eventEndTime", e.target.value)}
                        autoFocus
                      />
                      <button 
                        className="ml-2 p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={() => handleSaveChanges(index, "eventEndTime")}
                      >
                        {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "✓"}
                      </button>
                    </div>
                  ) : (
                    <p
                      className="cursor-pointer p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => toggleEditing(index, "eventEndTime")}
                    >
                      {moment(event.eventEndTime).format("hh:mm A")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Task Section */}
            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100 mb-6">
              <h2 className="text-yellow-700 font-medium flex items-center mb-4">
                <NotebookTabs size={18} className="mr-2" />
                Tasks
              </h2>
              {/* Task List Component */}
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

            {/* Services Section */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h2 className="text-blue-700 font-medium flex items-center mb-4">
                <NotebookTabs size={18} className="mr-2" />
                Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {event.eventVendors.map((vendor) => (
                  <ServiceCard 
                    key={vendor.id} 
                    service={vendor} 
                    setRefetch={handleOnDeleteService}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
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