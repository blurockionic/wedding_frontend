import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheckCircle, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { BiBell, BiBellPlus } from "react-icons/bi";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Task component remains the same but can be imported from here
const EventTask = ({
  task,
  index,
  onToggleStatus,
  onRemoveTask,
  onOpenModal,
  hoveredIndex,
  isMediumScreenOrSmaller,
  onUpdateTask,
  editingIndexes,
  toggleEditing
}) => {
  // Defensive check for undefined task
  if (!task) {
    console.error(`EventTask: task is undefined at index ${index}`);
    return <div>Task data is missing.</div>;
  }
  
  // Local state to track input value while editing
  const [inputValue, setInputValue] = useState(task.name);
  
  // Update local state when task changes
  useEffect(() => {
    setInputValue(task.name);
  }, [task.name]);

  return (
    <li
      key={task.id}
      className={`flex items-center p-3 rounded-md transition-all duration-300 ease-in-out ${
        task.done ? "bg-gray-50 text-gray-400" : "bg-white text-gray-700"
      } ${
        task.priority === "High" ? "border-l-4 border-red-400" :
        task.priority === "Medium" ? "border-l-4 border-yellow-400" :
        "border-l-4 border-green-400"
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
            task.done
              ? "text-primary"
              : "text-gray-300 hover:text-primary"
          }`}
          size={20}
        />
      </div>

      <div className="flex-1 min-w-0">
        {editingIndexes[`${index}-taskName`] ? (
          <input
            className="mt-1 border rounded p-1 w-full"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
              toggleEditing(index, "taskName");
              // Only update when input loses focus and if value has changed
              if (inputValue !== task.name) {
                onUpdateTask(index, "name", inputValue);
              }
            }}
            autoFocus
          />
        ) : (
          <span
            className={`leading-relaxed transition-all whitespace-normal block cursor-pointer ${
              task.done ? "line-through opacity-50" : ""
            }`}
            style={{ wordBreak: "break-word" }}
            onClick={() => toggleEditing(index, "taskName")}
          >
            {task.name}
          </span>
        )}
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
  onUpdateTask: PropTypes.func.isRequired,
  editingIndexes: PropTypes.object.isRequired,
  toggleEditing: PropTypes.func.isRequired
};

// Reusable media query hook
export const useMediaQuery = (query) => {
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

// Main TaskList component
const TaskList = ({
  tasks,
  eventId,
  isLoading,
  updateTaskStatus,
  deleteEventTask,
  updateEventTask,
  refetch,
  setRefetch,
  title = "Your Tasks"
}) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editingIndexes, setEditingIndexes] = useState({});
  
  const isMediumScreenOrSmaller = useMediaQuery("(max-width: 1024px)");

  // Toggle task status (done/undone)
  const handleTaskStatus = async (taskId, currentStatus) => {
    try {
      console.log("Toggling status for taskId:", taskId, "Current status:", currentStatus);
      await updateTaskStatus({
        taskId,
        status: !currentStatus
      }).unwrap();
      refetch();
      if (setRefetch) setRefetch(true);
    } catch (err) {
      console.error("Error updating task status:", err);
      toast.error("Failed to update task status");
    }
  };

  // Remove a task
  const handleRemoveTask = async (index) => {
    if (!tasks[index]) {
      console.error("handleRemoveTask: No task found at index", index);
      return;
    }
    const taskId = tasks[index].id;
    try {
      await deleteEventTask({
        eventId,
        taskId
      }).unwrap();
      toast.success("Task removed");
      refetch();
      if (setRefetch) setRefetch(true);
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to remove task");
    }
  };

  // Open calendar modal to set schedule date
  const openModal = (index) => {
    setSelectedTaskIndex(index);
    setShowCalendar(true);
  };

  // Set schedule date for a task
  const handleSetScheduleDate = async (date) => {
    if (selectedTaskIndex === null) return;
    
    const task = tasks[selectedTaskIndex];
    if (!task) {
      console.error("handleSetScheduleDate: Task not found at index", selectedTaskIndex);
      return;
    }
    try {
      await updateEventTask({
        taskId: task.id,
        data: {
          ...task,
          scheduleDate: date ? date.toISOString() : null
        }
      }).unwrap();
      
      toast.success(date ? "Task scheduled" : "Schedule removed");
      setShowCalendar(false);
      refetch();
      if (setRefetch) setRefetch(true);
    } catch (err) {
      console.error("Error updating task date:", err);
      toast.error("Failed to update schedule");
    }
  };

  // Handle hover events for tasks (for visual effects)
  const handleHover = (index, action) => {
    if (action === "enter") {
      setHoveredIndex(index);
    } else if (action === "leave") {
      setHoveredIndex(null);
    }
  };

  // Toggle editing state for task properties
  const toggleEditing = (index, field) => {
    setEditingIndexes((prev) => ({
      ...prev,
      [`${index}-${field}`]: !prev[`${index}-${field}`],
    }));
  };

  // Handle task update
  const handleUpdateTask = async (index, field, value) => {
    const task = tasks[index];
    if (!task) return;

    const updatedTask = { ...task, [field]: value };
    try {
      await updateEventTask({
        taskId: task.id,
        data: updatedTask
      }).unwrap();
      refetch();
      if (setRefetch) setRefetch(true);
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
    }
  };

  // Create Google Calendar link
  const createGoogleCalendarLink = (task) => {
    if (!task || !task.scheduleDate) return null;
    
    // Format task details for Google Calendar
    const encodedTitle = encodeURIComponent(task.name);
    const encodedDetails = encodeURIComponent(
      `Reminder to complete your task: "${task.name}"\n\nMake sure to finish it before the deadline!`
    );
    
    // Format the date for Google Calendar (YYYYMMDDTHHMMSSZ format)
    const formattedDate = new Date(task.scheduleDate)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";
    
    // Create the Google Calendar URL
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDetails}&dates=${formattedDate}/${formattedDate}`;
  };

  return (
    <div className="mt-4">
      <h4 className="text-xl font-medium mb-4">{title}</h4>
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="animate-spin text-primary" size={24} />
          <span className="ml-2 text-gray-500">Loading tasks...</span>
        </div>
      ) : !Array.isArray(tasks) ? (
        <p className="text-gray-500 italic py-4">Error loading tasks</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 italic py-4">No tasks yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task, index) => (
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
              onUpdateTask={handleUpdateTask}
              editingIndexes={editingIndexes}
              toggleEditing={toggleEditing}
            />
          ))}
        </ul>
      )}

      {/* Calendar Modal */}
      {showCalendar && selectedTaskIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={() => setShowCalendar(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-start pb-3">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1">Schedule Task</h2>
                <p className="text-gray-500 text-sm">(Select a completion date)</p>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-primary transition-all duration-300"
                onClick={() => setShowCalendar(false)}
              >
                <FaTimes size={22} />
              </button>
            </div>

            {/* Task Name & Date */}
            <div className="px-4 py-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tasks[selectedTaskIndex]?.name || "Task name not available"}
              </h3>
              <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                <p className="text-gray-700">
                  Complete by:{" "}
                  {tasks[selectedTaskIndex]?.scheduleDate ? (
                    <span className="font-semibold text-primary">
                      {new Date(tasks[selectedTaskIndex].scheduleDate).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-500">Not Set</span>
                  )}
                </p>
              </div>
            </div>
            
            {/* Calendar Picker */}
            <div className="flex justify-center my-4">
              <Calendar
                onChange={(date) => handleSetScheduleDate(date)}
                value={tasks[selectedTaskIndex]?.scheduleDate ? new Date(tasks[selectedTaskIndex].scheduleDate) : null}
                className="w-full border rounded-lg p-2"
              />
            </div>
            
            {/* Google Calendar Button */}
            {tasks[selectedTaskIndex]?.scheduleDate && (
              <div className="flex justify-center my-4">
                <a
                  href={createGoogleCalendarLink(tasks[selectedTaskIndex])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center shadow-md"
                >
                  <FaCalendarAlt className="mr-2" /> Set Reminder on Google Calendar
                </a>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              {tasks[selectedTaskIndex]?.scheduleDate && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 transition-all"
                  onClick={() => handleSetScheduleDate(null)}
                >
                  <FaTimes /> Remove Date
                </button>
              )}
              
              <button
                type="button"
                className="bg-primary hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition-all ml-auto"
                onClick={() => setShowCalendar(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  eventId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  updateTaskStatus: PropTypes.func.isRequired,
  deleteEventTask: PropTypes.func.isRequired,
  updateEventTask: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  setRefetch: PropTypes.func,
  title: PropTypes.string
};

export default TaskList;