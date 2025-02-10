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
      className={`flex items-center rounded-md px-2 py-1 border focus:outline-none focus:ring-2 focus:ring-primary ${className}`} // Replaced with custom color for focus ring
      style={style}
    >
      {/* Left Icon */}
      {leftIcon && <div className="mr-2 text-primary">{leftIcon}</div>}  {/* Custom color for left icon */}

      {/* Input */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="flex-1 py-1 text-primary placeholder:text-muted-foreground focus:outline-none border-2 border-transparent rounded focus:border-2 focus:border-pink-200 focus:ring-transparent"  // Custom color for text and placeholder
      />

      {/* Right Icon */}
      {rightIcon && <div className="ml-2 text-primary">{rightIcon}</div>}  {/* Custom color for right icon */}
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
