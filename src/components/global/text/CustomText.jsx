import PropTypes from "prop-types";

const CustomText = ({
  text = "Default Text",
  className = "",
  style = {},
  as: Tag = "p", // Tag type: e.g., 'p', 'h1', 'span'
  onClick = null,
  children = null,
}) => {
  return (
    <Tag
      className={`text-gray-800 ${className}`}
      style={style}
      onClick={onClick}
    >
      {children || text}
    </Tag>
  );
};

// Set display name for better debugging
CustomText.displayName = "CustomText";

// Prop validation using PropTypes
CustomText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  as: PropTypes.string, // The tag type (e.g., 'p', 'h1', 'span')
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default CustomText;
