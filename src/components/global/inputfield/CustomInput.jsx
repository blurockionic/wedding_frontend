import PropTypes from "prop-types"; 

const CustomInput = (props) => {
  const {
    type,
    placeholder,
    onFocus = () => {},
    value,
    onChange = () => {},
    className = "",
    customInputStyle = "",
    style = {},
    disabled = false,
    leftIcon = null,
    rightIcon = null,
  } = props;

  return (
    <div
      className={`overflow-hidden flex items-center rounded-md px-2 py-1 border focus:outline-none focus:ring-2 focus:ring-primary ${className}`} // Replaced with custom color for focus ring
      style={style}
    >
      {leftIcon && <div className="mr-1 text-primary">{leftIcon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value ?? ""} 
        onFocus={onFocus}
        onChange={onChange}
        disabled={disabled}
        className={`flex-1 py-1 text-primary placeholder:text-muted-foreground focus:outline-none border-2 border-transparent rounded focus:border-transparent focus:ring-0 capitalize ${customInputStyle}`} // Added capitalize
      />
      {rightIcon && <div className="ml-2 text-primary">{rightIcon}</div>}
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
  onFocus: PropTypes.func, // Fixed onFocus typo
  className: PropTypes.string,
  customInputStyle: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default CustomInput;
