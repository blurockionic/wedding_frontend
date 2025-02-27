import { useForm } from "react-hook-form";

const CreateSubEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className=" p-6 mt-10 rounded-md">
       <h1 className="text-3xl px-3 ">Add Sub Event on</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 p-4 rounded-md relative group mt-10">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Event Name */}
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                Sub-Event Name <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventName", {
                  required: "Sub-Event Name is required",
                })}
                className="mt-1 border rounded p-3"
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
              <p className="font-semibold text-xs px-1">
                Sub-Event Name <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventBudget", {
                  required: "Sub-Event Name is required",
                })}
                className="mt-1 border rounded p-3"
                type="text"
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
              <p className="font-semibold text-xs px-1">
              Sub-Event Date <span className="text-red-500">*</span>
              </p>
              <input
                {...register("eventDate", {
                  required: "Event Date is required",
                })}
                className="mt-1 border rounded p-3"
                type="date"
              />
              {errors.subEventDate && (
                <span className="text-red-500 text-xs">
                  {errors.subEventDate.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                Start From <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventStartTime", {
                  required: "Start time is required",
                })}
                className="mt-1 border rounded p-3"
                type="time"
              />
              {errors.subEventStartTime && (
                <span className="text-red-500 text-xs">
                  {errors.subEventStartTime.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                End At <span className="text-red-500">*</span>
              </p>
              <input
                {...register("subEventEndTime", { required: "End time is required" })}
                className="mt-1 border rounded p-3"
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
              <p className="font-semibold text-xs px-1">
              Sub-Event Description <span className="text-red-500">*</span>
              </p>
              <textarea
                {...register("subEventDescription", {
                  required: "Sub-Event Description is required",
                })}
                className="mt-1 border rounded p-3"
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
            className="px-5 py-2 bg-primary rounded-md w-full text-white mt-10"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubEvent;
