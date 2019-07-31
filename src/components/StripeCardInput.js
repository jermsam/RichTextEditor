import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Box, Text, FormField } from "grommet";

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: "Open Sans, sans-serif",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#c23d4b"
      }
    }
  };
};

class CheckoutForm extends Component {
  render() {
    return (
      <Box direction="row" margin="small" border="all" wrap>
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
