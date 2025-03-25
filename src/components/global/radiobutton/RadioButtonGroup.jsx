import React from "react";
import PropTypes from "prop-types";

export const RadioButtonGroup = ({ id, label, options, register, error }) => (
  <div className="my-4 cursor-pointer">
    <label htmlFor={id} className="block font-montserrat text-gray-700 font-medium">
      {label}
    </label>
    <div className="flex flex-col space-y-2 mt-2">
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            id={`${id}-${option.value}`}
            {...register(id)}
            value={option.value}
            className="appearance-none border border-gray-400 rounded-full w-5 h-5 checked:bg-blue-500 checked:ring-2 checked:ring-offset-2 transition-all duration-200"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
    {error && <span className="text-error text-xs mt-1">{error.message}</span>}
  </div>
);

RadioButtonGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
};
