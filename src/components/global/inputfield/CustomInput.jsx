import PropTypes from "prop-types"; // Import PropTypes for prop validation

const CustomInput = (props) => {
  const {
    type,
    placeholder,
    value,
    onChange = () => {},
    className = "",
    style = {},
    disabled = false,
    leftIcon = null,
    rightIcon = null,
  } = props;

  return (
    <div
      className={`flex items-center rounded-md px-2 py-1 border focus:outline-none focus:ring-2 focus:ring-dustyRose-light ${className}`}
      style={style}
    >
      {/* Left Icon */}
      {leftIcon && <div className="mr-2 text-gray-500">{leftIcon}</div>}

      {/* Input */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="flex-1 py-2 focus:outline-none"
      />

      {/* Right Icon */}
      {rightIcon && <div className="ml-2 text-gray-500">{rightIcon}</div>}
    </div>
  );
};

// Set display name for better debugging
CustomInput.displayName = "CustomInput";

// Prop validation using PropTypes
CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default CustomInput;
