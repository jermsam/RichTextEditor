import React from "react";

import { Box } from "grommet";

import { StripeProvider, Elements } from "react-stripe-elements";

import StripeCardInput from "./StripeCardInput";

export default props => {
  const [stripe, setStripe] = React.useState(null);

  const [stripeLoaded, setStripeLoaded] = React.useState({});

  const loadStripeScript = src =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve({ successful: true });
      });
      script.addEventListener("error", event => {
        reject({ error: event });
      });
      document.head.appendChild(script);
    });

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await loadStripeScript("https://js.stripe.com/v3/");
      setStripeLoaded(result);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx"));
    }
  }, []);

  return (
    <Box>
      {stripeLoaded ? (
        <StripeProvider {...{ stripe }}>
          <Elements>
            <StripeCardInput {...props} />
          </Elements>
        </StripeProvider>
      ) : null}
    </Box>
  );
};
