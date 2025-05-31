import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateFeedbackMutation } from "../../redux/serviceSlice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const FeedbackForm = ({ serviceId }) => {
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
  const [rating, setRating] = useState(0);
  const [shake, setShake] = useState(false); // New state for shake animation
  const userData = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
   

    if (!rating) {
      toast.error("Please select a rating");
      setShake(true);
      setTimeout(() => setShake(false), 500); // remove shake class after animation
      return;
    }
     if (!userData) {
      toast.error("Please login to submit feedback");
      return;
    }

    const feedbackData = { ...data, rating };

    try {
      const res = await createFeedback({ id: serviceId, data: feedbackData }).unwrap();
      if (res.success) {
        toast.success(res.message);
        reset();
        setRating(0);
      } else {
        toast.error(res.message || "Failed to submit feedback");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };


  return (
    <div className="w-full md:w-1/2 p-4 rounded-lg shadow-md mt-5 border border-ring">
      <h2 className="text-2xl font-bold mb-4 text-center">Feedback</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div
            className={`flex space-x-1 p-1 rounded-md transition-all ${
              !rating && shake ? "border border-red-500 shake" : ""
            }`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleRating(star)}
                xmlns="http://www.w3.org/2000/svg"
                fill={star <= rating ? "gold" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer hover:fill-gold transition"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.048 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.33a1 1 0 00.95.69h6.647c.969 0 1.372 1.24.588 1.81l-5.37 3.824a1 1 0 00-.364 1.118l2.07 6.33c.3.921-.755 1.688-1.539 1.118l-5.37-3.824a1 1 0 00-1.175 0l-5.37 3.824c-.784.57-1.838-.197-1.539-1.118l2.07-6.33a1 1 0 00-.364-1.118L2.34 11.757c-.784-.57-.38-1.81.588-1.81h6.647a1 1 0 00.95-.69l2.07-6.33z"
                />
              </svg>
            ))}
          </div>
          {!rating && (
            <p className="text-red-500 text-sm mt-1">Please select a rating</p>
          )}
        </div>

        {/* Feedback Field */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="comment">
            Feedback
          </label>
          <textarea
            id="comment"
            {...register("comment", { required: "Comment is required" })}
            rows="4"
            className="w-full px-3 py-2 border border-input rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-pink-200"
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring focus:ring-blue-200"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
