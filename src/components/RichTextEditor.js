import React from "react";
import { Box } from "grommet";
import RichTextInput from "./RichTextInput";

const allSuggestions = ["sony", "sonar", "foo", "bar"];

export default () => {
  const [selectedTags, setSelectedTags] = React.useState(["foo", "sony"]);
  const [suggestions, setSuggestions] = React.useState(allSuggestions);

  const onRemoveTag = tag => {
    const removeIndex = selectedTags.indexOf(tag);
    const newTags = [...selectedTags];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    setSelectedTags(newTags);
  };

  const onAddTag = tag => {
    setSelectedTags([...selectedTags, tag]);
  };

  const onFilterSuggestion = value =>
    setSuggestions(
      allSuggestions.filter(
        suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );

  return (
    <Box pad="small">
      <RichTextInput
        placeholder="Search for aliases..."
        suggestions={suggestions}
        value={selectedTags}
        onRemove={onRemoveTag}
        onAdd={onAddTag}
        onChange={({ target: { value } }) => onFilterSuggestion(value)}
      />
    </Box>
  );
};
