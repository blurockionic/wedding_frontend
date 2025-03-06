import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaPlus, FaTimes, FaCalendarAlt, FaTrash } from "react-icons/fa";
import { BiBell, BiBellPlus } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { 
  useCreateEventTaskMutation, 
  useGetEventTasksQuery,
  useUpdateTaskStatusMutation,
  useDeleteEventTaskMutation,
  useUpdateEventTaskMutation
} from "../../../redux/weddingPlanSlice";

// Custom hook to detect screen size
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

const CreateTaskForm = ({ eventId, eventTitle, setRefetch }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scheduleIndex, setScheduleIndex] = useState(null);
  const isMediumScreenOrSmaller = useMediaQuery("(max-width: 1024px)");
  const modalRef = useRef(null);

  // RTK Query hooks
  const { data: taskData, isLoading: tasksLoading } = useGetEventTasksQuery(eventId);
  const [createEventTask, { isLoading: isCreatingTask }] = useCreateEventTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteEventTask] = useDeleteEventTaskMutation();
  const [updateEventTask] = useUpdateEventTaskMutation();

  // Access tasks from query result
  const tasks =  [];

  console.log(JSON.stringify(taskData))

  const {
    register: registerTask,
    handleSubmit: handleTaskSubmit,
    reset: resetTaskForm,
    formState: { errors: taskErrors },
  } = useForm();

  

  //handle for task clicked
  const handleTaskClick = (index) => {
    setClickedIndex(index);
    
    // Using RTK mutation to toggle status
    const task = tasks[index];
    const newStatus = !task.done;
    
    updateTaskStatus({
      taskId: task.id,
      status: newStatus
    });

    setTimeout(() => {
      setClickedIndex(null);
    }, 300);
  };

  // handle for create task 
  const handleAddTask = async (data) => {
    try {
      await createEventTask({
        data: {
          name: data.task,
          priority: data.priority || "Medium",
          done: false,
          scheduleDate: null
        },
        eventId
      }).unwrap();
      
      // If you're using a refetch pattern like in the first component
      if (setRefetch) {
        setRefetch(true);
      }
      
      resetTaskForm();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  //handle for remove task
  const handleRemoveTask = async (index) => {
    const taskId = tasks[index].id;
    try {
      await deleteEventTask(taskId).unwrap();
      // If you're using a refetch pattern like in the first component
      if (setRefetch) {
        setRefetch(true);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // handle to change date 
  const handleDateChange = async (date, index) => {
    const taskId = tasks[index].id;
    const dateString = date.toISOString();
    
    try {
      await updateEventTask({
        taskId,
        data: {
          ...tasks[index],
          scheduleDate: dateString
        }
      }).unwrap();
      
      // If you're using a refetch pattern like in the first component
      if (setRefetch) {
        setRefetch(true);
      }
      
      closeModal();
    } catch (err) {
      console.error("Error updating task date:", err);
    }
  };

  //handle to update date
  const handleRemoveDate = async (index) => {
    const taskId = tasks[index].id;
    
    try {
      await updateEventTask({
        taskId,
        data: {
          ...tasks[index],
          scheduleDate: null
        }
      }).unwrap();
      
      // If you're using a refetch pattern like in the first component
      if (setRefetch) {
        setRefetch(true);
      }
      
      closeModal();
    } catch (err) {
      console.error("Error removing task date:", err);
    }
  };

  const openModal = (index) => {
    setScheduleIndex(index);
  };

  const closeModal = () => {
    setScheduleIndex(null);
  };

  // Click-outside handler (for modal)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (scheduleIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [scheduleIndex]);

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg border-4 border-pink-300 break-inside-avoid transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex w-full flex-wrap">
        <div className="flex-1 min-w-0">
          <h3
            className="text-2xl font-semibold text-pink-600 mb-3 break-words whitespace-normal w-full"
            style={{ wordBreak: "break-word" }}
          >
            {eventTitle || "Event Tasks"}
          </h3>
        </div>
      </div>

      {/* Add new task Form */}
      <div className="mb-6">
        <form
          onSubmit={handleTaskSubmit(handleAddTask)}
          className="transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <button 
                type="submit" 
                className="flex-shrink-0"
                disabled={isCreatingTask}
              >
                {isCreatingTask ? (
                  <Loader2 className="animate-spin text-pink-500" size={20} />
                ) : (
                  <FaPlus
                    className="text-pink-500 hover:text-pink-600 transition cursor-pointer"
                    size={20}
                  />
                )}
              </button>
              <input
                {...registerTask("task", {
                  required: "Task name is required",
                  maxLength: {
                    value: 100,
                    message: "Task name cannot exceed 100 characters",
                  },
                })}
                type="text"
                placeholder="Add a new task"
                className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 focus-visible:outline-none"
              />
            </div>
            
            <div className="flex items-center ml-8">
              <label className="mr-3 text-gray-700">Priority:</label>
              <select
                {...registerTask("priority")}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                defaultValue="Medium"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            {taskErrors.task && (
              <p className="text-red-500 text-sm ml-8">
                {taskErrors.task.message}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Task List */}
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Tasks</h4>
        {/* //todo  */}
        {tasksLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="animate-spin text-pink-500" size={24} />
            <span className="ml-2 text-gray-500">Loading tasks...</span>
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks yet. Add one above.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, index) => {
              return (
                <li
                  key={index}
                  className={`flex items-center space-x-2 cursor-pointer group transition-all duration-300 ease-in-out ${
                    task.done ? "text-gray-400" : "text-gray-700"
                  } ${
                    task.priority === "High" ? "border-l-4 border-red-400 pl-2" :
                    task.priority === "Medium" ? "border-l-4 border-yellow-400 pl-2" :
                    "border-l-4 border-green-400 pl-2"
                  }`}
                  onClick={() => handleTaskClick(index)}
                  onMouseEnter={() =>
                    !isMediumScreenOrSmaller && setHoveredIndex(index)
                  }
                  onMouseLeave={() =>
                    !isMediumScreenOrSmaller && setHoveredIndex(null)
                  }
                >
                  <FaCheckCircle
                    className={`transition-all duration-150 ease-in-out ${
                      clickedIndex === index ? "scale-125" : ""
                    } ${
                      task.done
                        ? "text-pink-500 flex-shrink-0"
                        : "text-gray-300 flex-shrink-0 group-hover:text-pink-400"
                    }`}
                    size={20}
                  />

                  <div className="flex-1 min-w-0">
                    <span
                      className={`leading-relaxed transition-all duration-150 ease-in-out hyphenate break-words whitespace-normal block ${
                        clickedIndex === index ? "scale-105" : ""
                      } ${
                        task.done
                          ? "line-through opacity-50"
                          : "group-hover:text-pink-600"
                      }`}
                      style={{ wordBreak: "break-word" }}
                    >
                      {task.name}
                    </span>
                  </div>

                  {/* Icons Container */}
                  <div className="flex flex-shrink-0 w-auto justify-end items-center space-x-2">
                    <div className="relative">
                      {task.scheduleDate ? (
                        <BiBell
                          className="text-pink-500  hover:text-pink-700 transition-all duration-300 ease-in-out cursor-pointer"
                          size={18}
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(index);
                          }}
                        />
                      ) : (
                        <BiBellPlus
                          className={`transition-all duration-300 ease-in-out text-gray-300 hover:text-pink-600 cursor-pointer ${
                            hoveredIndex === index || isMediumScreenOrSmaller
                              ? "visible opacity-100"
                              : "invisible opacity-0"
                          }`}
                          size={18}
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(index);
                          }}
                        />
                      )}
                    </div>
                    <FaTimes
                      className={`transition-all duration-300 ml-1 ease-in-out text-gray-300 hover:text-pink-600 ${
                        hoveredIndex === index || isMediumScreenOrSmaller
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                      }`}
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTask(index);
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Render Modal Conditionally */}
      {scheduleIndex !== null && tasks && tasks[scheduleIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start pb-3">
              <div>
                <h2 className="text-2xl font-bold text-pink-600 mb-1">Schedule Task</h2>
                <p className="text-gray-500 text-sm">(Select a completion date)</p>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-pink-600 transition-all duration-300"
                onClick={closeModal}
              >
                <FaTimes size={22} />
              </button>
            </div>

            {/* Task Name & Date */}
            <div className="px-4 py-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tasks[scheduleIndex]?.name}
              </h3>
              <div className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                <p className="text-gray-700">
                  Complete by:{" "}
                  {tasks[scheduleIndex]?.scheduleDate ? (
                    <span className="font-semibold text-pink-600">
                      {new Date(tasks[scheduleIndex].scheduleDate).toLocaleDateString()}
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
                onChange={(date) => handleDateChange(date, scheduleIndex)}
                value={tasks[scheduleIndex]?.scheduleDate ? new Date(tasks[scheduleIndex].scheduleDate) : null}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Google Calendar Button */}
            {tasks[scheduleIndex]?.scheduleDate && (
              <div className="flex justify-center my-4">
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    tasks[scheduleIndex].name
                  )}&details=${encodeURIComponent(
                    `Task for event: "${eventTitle}"\n\nMake sure to finish it before the deadline!`
                  )}&dates=${new Date(tasks[scheduleIndex].scheduleDate)
                    .toISOString()
                    .replace(/[-:]/g, "")
                    .split(".")[0]}Z/${new Date(tasks[scheduleIndex].scheduleDate)
                    .toISOString()
                    .replace(/[-:]/g, "")
                    .split(".")[0]}Z`}
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
              {tasks[scheduleIndex]?.scheduleDate && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2 transition-all"
                  onClick={() => handleRemoveDate(scheduleIndex)}
                >
                  <FaTrash /> Remove Date
                </button>
              )}

              <button
                type="button"
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-md transition-all ml-auto"
                onClick={closeModal}
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

// Add PropTypes validation
CreateTaskForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventTitle: PropTypes.string,
  setRefetch: PropTypes.func
};

// Default props
CreateTaskForm.defaultProps = {
  eventTitle: 'Event Tasks',
  setRefetch: null
};

export default CreateTaskForm;