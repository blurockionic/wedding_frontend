import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Schedule Task</h2>
              <button onClick={() => setShowCalendar(false)} className="text-gray-400 hover:text-primary">
                <FaTimes size={20} />
              </button>
            </div>
            
            <h3 className="text-lg font-medium mb-3">
              {tasks[selectedTaskIndex]?.name || "Task name not available"}
            </h3>
            
            <div className="mb-4 text-center text-gray-500">
              <Calendar
                onChange={handleSetScheduleDate}
                value={tasks[selectedTaskIndex]?.scheduleDate ? new Date(tasks[selectedTaskIndex].scheduleDate) : null}
                className="w-full border rounded-lg p-2"
              />
            </div>
            
            <div className="flex justify-between">
              {tasks[selectedTaskIndex]?.scheduleDate && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
                  onClick={() => handleSetScheduleDate(null)}
                >
                  Remove Date
                </button>
              )}
              
              <button
                className="bg-primary hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md ml-auto"
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