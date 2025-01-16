import PropTypes from "prop-types";
const CustomText = ({
  text = "Default Text",
  className = "",
  style = {},
  as: Tag = "p", // Tag type: e.g., 'p', 'h1', 'span'
  onClick = null,
  children = null,
}) => {
  
  // Use the provided variant, falling back to 'default' if not found
 
  return (
    <Tag className={className}  onClick={onClick}>
      {children || text}
    </Tag>
  );
};

CustomText.displayName = "CustomText";

// PropTypes for validation
CustomText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  as: PropTypes.string, // Tag type (e.g., 'p', 'h1', 'span')
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default CustomText;
