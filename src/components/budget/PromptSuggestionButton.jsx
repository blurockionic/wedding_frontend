import PropTypes from "prop-types";

function PromptSuggestionButton(props) {
  var text = props.text;
  var onClick = props.onClick;

  return (
    <button
      className="bg-[#bd3a77] text-slate-600 border border-[#ac9540] border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group max-w-[300px] mx-4"
      onClick={onClick}
    >
      <span
        className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
      ></span>
      {text}
    </button>
  );
}

// Prop validation
PromptSuggestionButton.propTypes = {
  text: PropTypes.string.isRequired, // `text` must be a string and is required
  onClick: PropTypes.func.isRequired, // `onClick` must be a function and is required
};

export default PromptSuggestionButton;