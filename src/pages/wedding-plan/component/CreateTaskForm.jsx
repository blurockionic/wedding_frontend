import { useState } from "react";
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
import TaskList from "./TaskList"; // Import the new component

const CreateTaskForm = ({ eventId, eventTitle, setRefetch }) => {
  console.log("CreateTaskForm: eventId =", eventId);
  
  // RTK Query hooks for fetching tasks
  const { data: tasksData, isLoading: tasksLoading, refetch } = useGetEventTasksQuery(eventId);
  // Ensure tasks is an array
  const tasks = Array.isArray(tasksData) ? tasksData : tasksData?.tasks || [];
  
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
      
      {/* Use the new TaskList component */}
      <div className="mt-8 px-3">
        <TaskList
          tasks={tasks}
          eventId={eventId}
          isLoading={tasksLoading}
          updateTaskStatus={updateTaskStatus}
          deleteEventTask={deleteEventTask}
          updateEventTask={updateEventTask}
          refetch={refetch}
          setRefetch={setRefetch}
          title="Your Tasks"
        />
      </div>
    </div>
  );
};

CreateTaskForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventTitle: PropTypes.string,
  setRefetch: PropTypes.func,
};

CreateTaskForm.defaultProps = {
  eventTitle: "Event Tasks"
};

export default CreateTaskForm;