import React from "react";
import PropTypes from "prop-types";

const RadioButton = ({ label, name, value, checked, onChange, size = "md", color = "blue" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const colors = {
    blue: "checked:bg-blue-500",
    green: "checked:bg-green-500",
    red: "checked:bg-red-500",
    yellow: "checked:bg-yellow-500"
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`appearance-none border border-gray-400 rounded-full ${sizes[size]} ${colors[color]} 
        checked:ring-2 checked:ring-offset-2 transition-all duration-200`}
      />
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["blue", "green", "red", "yellow"])
};

export default RadioButton;
