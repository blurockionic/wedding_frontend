import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-gray-800">({rating})</span>
    </div>
  );
};

export default Rating;