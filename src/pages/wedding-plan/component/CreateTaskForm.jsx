import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { 
  useCreateEventTaskMutation, 
  useGetEventTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteEventTaskMutation,
  useUpdateEventTaskMutation
} from "../../../redux/weddingPlanSlice";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { BiBell, BiBellPlus } from "react-icons/bi";

// A separate EventTask component with defensive checks and logging
const EventTask = ({
  task,
  index,
  onToggleStatus,
  onRemoveTask,
  onOpenModal,
  hoveredIndex,
  isMediumScreenOrSmaller
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

      <div 
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => onToggleStatus(task.id, task.done)}
      >
        <span
          className={`leading-relaxed transition-all whitespace-normal block ${
            task.done ? "line-through opacity-50" : ""
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

const CreateTaskForm = ({ eventId, eventTitle, setRefetch }) => {
  console.log("CreateTaskForm: eventId =", eventId);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // RTK Query hooks for fetching tasks
  const { data: tasksData, isLoading: tasksLoading, refetch } = useGetEventTasksQuery(eventId);
  // Ensure tasks is an array (adjust based on your API response structure)
  const tasks = useMemo(() => Array.isArray(tasksData) ? tasksData : tasksData?.tasks || [], [tasksData]);
  
  useEffect(() => {
    console.log("Fetched tasks:", tasks);
  }, [tasks]);

  const [createEventTask, { isLoading: isCreatingTask, error }] = useCreateEventTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteEventTask] = useDeleteEventTaskMutation();
  const [updateEventTask] = useUpdateEventTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      task: "",
      priority: "Medium"
    }
  });

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

  // Handle create task form submission
  const onSubmit = async (data) => {
    try {
      if (!eventId) {
        toast.error("Event ID is missing");
        return;
      }
      
      console.log("onSubmit: Using eventId:", eventId, "Form data:", data);

      const response = await createEventTask({
        data: {
          name: data.task,
          priority: data.priority,
          done: false,
          scheduleDate: null
        },
        eventId
      }).unwrap();
      
      toast.success(response.message || "Task added successfully");
      reset();
      refetch();
      if (setRefetch) setRefetch(true);
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task");
    }
  };

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
      await deleteEventTask(taskId).unwrap();
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

  return (
    <div className="p-2 mt-10 rounded-md border-yellow">
      <h1 className="px-3 text-3xl">{eventTitle || "Event Tasks"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1 p-4 rounded-md relative group mt-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Task Name Input */}
            <div className="flex flex-col w-full">
              <p className="text-xs px-1">
                Task Name <span className="text-red-500">*</span>
              </p>
              <input
                {...register("task", {
                  required: "Task name is required",
                  maxLength: {
                    value: 100,
                    message: "Task name cannot exceed 100 characters"
                  }
                })}
                className="mt-1 border rounded p-2"
                type="text"
                placeholder="Add a new task"
              />
              {errors.task && (
                <span className="text-red-500 text-xs">
                  {errors.task.message}
                </span>
              )}
            </div>
            {/* Priority Select */}
            <div className="flex flex-col w-full">
              <p className="text-xs px-1">
                Priority <span className="text-red-500">*</span>
              </p>
              <select
                {...register("priority")}
                className="mt-1 border rounded p-2"
                defaultValue="Medium"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <span className="text-red-500 text-xs">
                  {errors.priority.message}
                </span>
              )}
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCreatingTask}
            className="px-5 py-2 flex justify-center items-center font-semibold text-[20px] bg-primary rounded-md w-full text-white mt-10"
          >
            {isCreatingTask ? <Loader2 className="animate-spin" /> : "Add Task"}
          </button>
        </div>
        {error && <p className="text-red-500">Error creating task</p>}
      </form>
      
      {/* Task List */}
      <div className="mt-8 px-3">
        <h4 className="text-xl font-medium mb-4">Your Tasks</h4>
        {tasksLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="animate-spin text-primary" size={24} />
            <span className="ml-2 text-gray-500">Loading tasks...</span>
          </div>
        ) : !Array.isArray(tasks) ? (
          <p className="text-gray-500 italic py-4">Error loading tasks</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 italic py-4">No tasks yet. Add one above.</p>
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
              />
            ))}
          </ul>
        )}
      </div>

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
              {/* Placeholder for a calendar component */}
              Calendar component would render here
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

CreateTaskForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventTitle: PropTypes.string,
  setRefetch: PropTypes.func
};

CreateTaskForm.defaultProps = {
  eventTitle: "Event Tasks"
};

export default CreateTaskForm;
