import React from "react";
import { FormField, Box, Text } from "grommet";

export default props => {
  const { required, label, ...rest } = props;
  return (
    <FormField
      label={
        required ? (
          <Box direction="row">
            <Text size="medium">{label}</Text>
            <Text size="large" color="brand">
              *
            </Text>
          </Box>
        ) : (
          label
        )
      }
      required={required}
      {...rest}
    />
  );
};
