import React from "react";
import { injectStripe } from "react-stripe-elements";

import StripeCardInput from "./StripeCardInput";

export default injectStripe(({ ...rest }) => {
  const [cardError, setCardError] = React.useState("");

  const onCardChange = ({ error }) => {
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
  };

  return (
    <StripeCardInput {...rest} onChange={onCardChange} error={cardError} />
  );
});
