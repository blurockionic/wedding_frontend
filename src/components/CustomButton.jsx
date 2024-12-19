
const CustomButton = ({
  text = "Button",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  iconLeft,
  iconRight,
  style,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center px-4 py-1.5 rounded-lg transition-all duration-300 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed text-gray-700"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } ${className}`}
      style={style}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {text}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default CustomButton;
