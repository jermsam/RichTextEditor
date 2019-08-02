import React from "react";
import { Box } from "grommet";
import PostPreviewInput from "./PostPreviewInput";

export default props => {
  return (
    <Box pad="small">
      <PostPreviewInput {...props} />
    </Box>
  );
};
