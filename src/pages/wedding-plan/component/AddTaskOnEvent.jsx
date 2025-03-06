import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useCreateEventTaskMutation } from "../../../redux/weddingPlanSlice";
import { toast } from "react-toastify";

const AddTaskOnEvent = ({eventId}) => {
    const [createEventTask, {isLoading, error} ] = useCreateEventTaskMutation();
    
  const { register, handleSubmit, reset} = useForm();
  const [tasks, setTasks] = useState([]);

  useEffect(()=> {
     const handleSaveTask = async()=>{
        try {
            const response =  await createEventTask({tasks, eventId}).unwrap()
            const {success, message} =  response
            if(success){
                toast.success(message)
            }
        } catch (error) {
            console.error(error)
        }
     }
    if(tasks && eventId){
        // save to db 
        handleSaveTask()
    }

  }, [tasks, createEventTask, eventId])

  //handle on submit 
  const onSubmit = (data) => {
    setTasks([...tasks, { ...data, status: "pending" }]); 
    reset(); 
  };

//   console.log(tasks, eventId)

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // ✅ Remove task safely
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Add Task for Event </h2>

      {/* Task Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-4">
        <input
          {...register("task", { required: true })}
          type="text"
          placeholder="Task name"
          className="border p-2 rounded"
        />
        <input
          {...register("dueDate", { required: true })}
          type="date"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center border p-2 rounded mb-2">
            <span>{task.task} - {task.dueDate} ({task.status})</span> 
            <button
              onClick={() => removeTask(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

AddTaskOnEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default AddTaskOnEvent;
