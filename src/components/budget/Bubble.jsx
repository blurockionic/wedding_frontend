import PropTypes from "prop-types";

const Bubble = (props) => {
  const { content, role } = props.message || {};
  return (
    <div
      className={`${role} bubble m-2 p-2 text-[15px] border-none text-[#383838] shadow-[#959da533] shadow-md w-auto max-w-[50%] text-left`}
    >
      {content}
    </div>
  );
};

Bubble.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired, 
    role: PropTypes.string.isRequired,   
  }).isRequired, 
};

export default Bubble;