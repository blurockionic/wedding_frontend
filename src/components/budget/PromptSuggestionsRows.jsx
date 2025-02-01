import PropTypes from "prop-types";
import PromptSuggestionButton from "./PromptSuggestionButton";

var prompts = [
  "Who is the highest paid F1 driver",
  "Who will be the newest driver for ferrari",
];

function PromptSuggestionsRow(props) {
  var onPromptClick = props.onPromptClick;

  return (
    <div>
      {prompts.map(function (prompt, index) {
        return (
          <PromptSuggestionButton
            key={"suggestion-" + index}
            text={prompt}
            onClick={function () {
              onPromptClick(prompt);
            }}
          />
        );
      })}
    </div>
  );
}

PromptSuggestionsRow.propTypes = {
  onPromptClick: PropTypes.func.isRequired, // `onPromptClick` must be a function and is required
};

export default PromptSuggestionsRow;