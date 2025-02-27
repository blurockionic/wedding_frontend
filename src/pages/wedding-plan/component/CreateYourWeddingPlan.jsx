import { useForm } from "react-hook-form";

const CreateYourWeddingPlan = () => {
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
       <h1 className="text-3xl px-3 ">Create your wedding event</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 p-4 rounded-md relative group mt-10">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Event Name */}
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                Event Name <span className="text-red-500">*</span>
              </p>
              <input
                {...register("eventName", {
                  required: "Event Name is required",
                })}
                className="mt-1 border rounded p-2"
                type="text"
                placeholder="Event Name"
              />
              {errors.eventName && (
                <span className="text-red-500 text-xs">
                  {errors.eventName.message}
                </span>
              )}
            </div>
            {/* Event Name */}
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                Event budget <span className="text-red-500">*</span>
              </p>
              <input
                {...register("eventBudget", {
                  required: "Event budget is required",
                })}
                className="mt-1 border rounded p-2"
                type="number"
                placeholder="Event Budget"
              />
              {errors.eventBudget && (
                <span className="text-red-500 text-xs">
                  {errors.eventBudget.message}
                </span>
              )}
            </div>

            {/* Date, Start Time, End Time */}

            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                Event Date <span className="text-red-500">*</span>
              </p>
              <input
                {...register("eventDate", {
                  required: "Event Date is required",
                })}
                className="mt-1 border rounded p-2"
                type="date"
              />
              {errors.eventDate && (
                <span className="text-red-500 text-xs">
                  {errors.eventDate.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                Start From <span className="text-red-500">*</span>
              </p>
              <input
                {...register("startTime", {
                  required: "Start time is required",
                })}
                className="mt-1 border rounded p-2"
                type="time"
              />
              {errors.startTime && (
                <span className="text-red-500 text-xs">
                  {errors.startTime.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                End At <span className="text-red-500">*</span>
              </p>
              <input
                {...register("endTime", { required: "End time is required" })}
                className="mt-1 border rounded p-2"
                type="time"
              />
              {errors.endTime && (
                <span className="text-red-500 text-xs">
                  {errors.endTime.message}
                </span>
              )}
            </div>

            {/* Event Description */}
            <div className="flex flex-col w-full">
              <p className="font-semibold text-xs px-1">
                Event Description <span className="text-red-500">*</span>
              </p>
              <textarea
                {...register("eventDescription", {
                  required: "Event Description is required",
                })}
                className="mt-1 border rounded p-2"
                cols={10}
                placeholder="Event Description"
              />
              {errors.eventDescription && (
                <span className="text-red-500 text-xs">
                  {errors.eventDescription.message}
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

export default CreateYourWeddingPlan;
