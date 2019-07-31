import React from "react";
import { Box } from "grommet";
import RichTextInput from "./RichTextInput";

export default props => {
  return (
    <Box pad="small">
      <RichTextInput {...props} />
    </Box>
  );
};
