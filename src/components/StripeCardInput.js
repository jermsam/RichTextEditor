import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Box } from "grommet";

class CheckoutForm extends Component {
  render() {
    return (
      <Box direction="row" margin="small" pad="small" border="all" wrap>
        <Box flex style={{ minWidth: "120px" }} margin="medium">
          <Box>
            <CardElement style={{ base: { fontSize: "20px" } }} />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default injectStripe(CheckoutForm);
