import { useForm } from "react-hook-form";
import { useCreateSubEventMutation } from "../../../redux/weddingPlanSlice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const CreateSubEvent = () => {
  const [createSubEvent, {isLoading, error} ] = useCreateSubEventMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle on submit to create sub event
  const onSubmit = async(data, eventId) => {
    console.log("Form Data:", data);
    try{
      const response =  await createSubEvent(data, eventId).unwrap()
      const {success, message} =  response
      if(success){
        toast.success(message)
      }
    }catch(error){
      console.error(error)
    }
  };

  return (
    <div className=" p-3 mt-10 rounded-md">
       <h1 className="text-3xl px-3 ">Create Sub Event</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 p-2 rounded-md relative group mt-10">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Event Name */}
            <div className="flex flex-col w-full">
              <p className=" text-xs px-1">
                Sub Event Name <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventName", {
                  required: "Sub-Event Name is required",
                })}
                className="mt-1 border rounded p-2"
                type="text"
                placeholder="Sub-Event Name"
              />
              {errors.eventName && (
                <span className="text-red-500 text-xs">
                  {errors.subEventName.message}
                </span>
              )}
            </div>
            {/* Sub Event Budget */}
            <div className="flex flex-col w-full">
              <p className="text-xs px-1">
                Sub Event Budget <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventBudget", {
                  required: "Sub-Event budget is required",
                })}
                className="mt-1 border rounded p-2"
                type="number"
                placeholder="Sub-Event Budget"
              />
              {errors.subEventBudget && (
                <span className="text-red-500 text-xs">
                  {errors.subEventBudget.message}
                </span>
              )}
            </div>

            {/* Date, Start Time, End Time */}

            <div className="flex flex-col w-full">
              <p className=" text-xs px-1">
              Sub Event Date <span className="text-red-500">*</span>
              </p>
              <input
                {...register("eventDate", {
                  required: "Event Date is required",
                })}
                className="mt-1 border rounded p-2"
                type="date"
              />
              {errors.subEventDate && (
                <span className="text-red-500 text-xs">
                  {errors.subEventDate.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <p className=" text-xs px-1">
                Start From <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventStartTime", {
                  required: "Start time is required",
                })}
                className="mt-1 border rounded p-2"
                type="time"
              />
              {errors.subEventStartTime && (
                <span className="text-red-500 text-xs">
                  {errors.subEventStartTime.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <p className=" text-xs px-1">
                End At <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventEndTime", { required: "End time is required" })}
                className="mt-1 border rounded p-2"
                type="time"
              />
              {errors.subEventEndTime && (
                <span className="text-red-500 text-xs">
                  {errors.subEventEndTime.message}
                </span>
              )}
            </div>

            {/* Event Description */}
            <div className="flex flex-col w-full">
              <p className=" text-xs px-1">
              Sub Event Description <span className="text-red-500">*</span>
              </p>
              <textarea
                {...register("subEventDescription", {
                  required: "Sub-Event Description is required",
                })}
                className="mt-1 border rounded p-2"
                cols={10}
                placeholder="Sub-Event Description"
              />
              {errors.subEventDescription && (
                <span className="text-red-500 text-xs">
                  {errors.subEventDescription.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 bg-primary rounded-md w-full text-white mt-10"
          >
            {isLoading ? <Loader2 className="animate-spin"/> : "Submit"}
          </button>
        </div>
        {error && <p className="text-red-500">Error creating sub event</p>}
      </form>
    </div>
  );
};

export default CreateSubEvent;
