import React from "react";
import { Box } from "grommet";
import TextAvatarInput from "./TextAvatarInput";

export default props => {
  return (
    <Box pad="small">
      <TextAvatarInput {...props} />
    </Box>
  );
};
