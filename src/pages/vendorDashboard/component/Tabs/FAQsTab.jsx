import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useCreateFAQMutation, useUpdateFAQMutation } from "../../../../redux/serviceSlice";
import { toast } from "react-toastify";
import CustomButton from "../../../../components/global/button/CustomButton";
import { FaPlus } from "react-icons/fa";

export default function FAQsTab({ serviceId ,handleCloseFAQ }) {
  const [createFAQ] = useCreateFAQMutation();
  // const {} = useUpdateFAQMutation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const [selectedIndex, setSelectedIndex] = useState(0); // Default to the first FAQ

  // Ensure the last FAQ is selected if a new FAQ is added
  useEffect(() => {
    if (fields.length > 0) {
      setSelectedIndex(fields.length - 1); // Select the last FAQ
    }
  }, [fields]); // Trigger this effect whenever fields change

  const onSubmit = async(data) => {
    try {
       const response = await createFAQ({id: serviceId,
        data: data.faqs
       }).unwrap()

       console.log(response)

       const {success, message} =  response
       if(success){
        toast.success(message)
        handleCloseFAQ(true)
       }

    } catch (error) {
      console.error(error)
    }
  };

  const handleIndexClick = (index) => {
    setSelectedIndex(index); // Set selected FAQ index
  };

  return (
    <div className="h-full">
      <div className=" relative bg-transparent p-8 max-w-4xl mx-auto rounded-lg  bg-opacity-70 backdrop-blur-lg border border-ring">
        <h2 className="text-4xl font-bold  text-foreground mb-8">
          FAQs <span className="text-sm">({fields.length})</span>
        </h2>

        <button
          onClick={handleCloseFAQ}
          className="absolute top-3 right-3 bg-gray-100 text-primary rounded-full p-2 hover:bg-gray-200 transition"
        >
          <MdClose className="w-5 h-5" />

        </button>

        {/* FAQ Index Stack */}
        <div className="flex justify-center gap-2 mb-6">
          {fields.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleIndexClick(index)}
              className={`w-12 h-12 text-white rounded-lg ${
                selectedIndex === index ? "bg-primary" : "bg-gray-600"
              } hover:bg-pink-600 hover:scale-125 transition-transform`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Form for Editing FAQ */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Render FAQ input fields based on selected index */}
            {fields.length > 0 && (
              <div
                key={fields[selectedIndex]?.id}
                className="relative bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-md flex items-center gap-4 border border-gray-700 hover:border-gray-600 transition"
              >
                {/* Close Button moved to Index Stack */}
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <button
                    type="button"
                    onClick={() => remove(selectedIndex)}
                    className="relative bg-gray-300 text-primary rounded-lg w-8 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-125"
                  >
                    x
                  </button>
                </div>

                <div className="w-full space-y-4">
                  {/* Question Field */}
                  <div>
                    <label className="block text-lg font-medium text-white">
                      Question
                    </label>
                    <Controller
                      name={`faqs[${selectedIndex}].question`}
                      control={control}
                      defaultValue={fields[selectedIndex]?.question}
                      rules={{ required: "Question is required" }}
                      render={({ field }) => (
                        <input
                          autoFocus
                          {...field}
                          className="mt-2 w-full px-4 py-3 p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-ring"
                          placeholder="Enter question"
                        />
                      )}
                    />
                    {errors?.faqs?.[selectedIndex]?.question && (
                      <span className="text-red-500 text-sm">
                        {errors?.faqs?.[selectedIndex]?.question?.message}
                      </span>
                    )}
                  </div>

                  {/* Answer Field */}
                  <div>
                    <label className="block text-lg font-medium text-white">
                      Answer
                    </label>
                    <Controller
                      name={`faqs[${selectedIndex}].answer`}
                      control={control}
                      defaultValue={fields[selectedIndex]?.answer}
                      rules={{ required: "Answer is required" }}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="mt-2 w-full px-4 py-3 p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-ring"
                          placeholder="Enter answer"
                        />
                      )}
                    />
                    {errors?.faqs?.[selectedIndex]?.answer && (
                      <span className="text-red-500 text-sm">
                        {errors?.faqs?.[selectedIndex]?.answer?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <CustomButton
              type="button"
              leftIcon={<FaPlus/>}
              text="Another FAQ"
              onClick={() => append({ question: "", answer: "" })}
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-pink-500 transition transform hover:scale-105"
            />
              
            
            <button
              type="submit"
              className="px-8 py-3 border border-ring text-green-500 font-medium rounded-lg shadow-md hover:bg-green-100 transition transform hover:scale-105"
            >
              Submit FAQs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
