import React from "react";

import { Layer, Box } from "grommet";

export default ({ children, onClose }) => (
  <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
    <Box full flex>
      {children}
    </Box>
  </Layer>
);
