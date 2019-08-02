
import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Box } from "grommet";

export default injectStripe(props => {
  return (
    <Box direction="row" margin="small" pad="small" border="all" wrap>
      <Box flex style={{ minWidth: "120px" }} margin="medium">
        <Box>
          <CardElement {...props} style={{ base: { fontSize: "20px" } }} />
        </Box>
      </Box>
    </Box>
  );
});
