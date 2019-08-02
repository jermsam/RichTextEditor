import React from "react";
import { CardElement } from "react-stripe-elements";
import { Box, Text } from "grommet";

export default ({ error, ...rest }) => {
  return (
    <Box
      margin="none"
      border="all"
      wrap
      direction="column"
      align="stretch"
      pad={{ horizontal: "xsmall", vertical: "small" }}
      flex
    >
      <Box flex style={{ minWidth: "120px" }} margin="medium">
        <Box>
          <CardElement {...rest} style={{ base: { fontSize: "20px" } }} />
          <Text
            margin={{ horizontal: "small" }}
            alignSelf="start"
            color="error"
          >
            {error}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
