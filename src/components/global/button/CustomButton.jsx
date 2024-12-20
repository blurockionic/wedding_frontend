import PropTypes from "prop-types"; // Import PropTypes for prop validation

const CustomButton = ({
  text = "Button",
  onClick = () => {},
  className = "",
  style = {},
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`
        flex items-center justify-center gap-2  rounded-md
        font-medium transition duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
    >
      {/* Left Icon */}
      {leftIcon && <span>{leftIcon}</span>}

      {/* Button Text */}
      <span>{text}</span>

      {/* Right Icon */}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

// Set display name for better debugging
CustomButton.displayName = "CustomButton";

// Prop validation using PropTypes
CustomButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default CustomButton;



