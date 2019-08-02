import React from "react";
import { Box } from "grommet";
import { StripeProvider, Elements } from "react-stripe-elements";
import DonationBox from "./DonationBox";

export default ({ stripe, ...rest }) => {
  return (
    <Box>
      <StripeProvider {...{ stripe }}>
        <Elements>
          <DonationBox {...rest} />
        </Elements>
      </StripeProvider>
      :null}
    </Box>
  );
};
