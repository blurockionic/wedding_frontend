import PropTypes from "prop-types";
import PromptSuggestionButton from "./PromptSuggestionButton";

var prompts = [
  "My Budget is for 2,00,000 please suggest vendors who will plan our dream wedding",
  "Best Wedding halls near me",
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