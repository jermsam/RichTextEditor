import React from "react";

import { Layer } from "grommet";

export default ({ children, onClose }) => (
  <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
    {children}
  </Layer>
);
