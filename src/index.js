import React from "react";
import ReactDOM from "react-dom";
import { Grommet, Box, Heading, Text } from "grommet";

import "react-html5-camera-photo/build/css/index.css";
import { StripeProvider, Elements } from "react-stripe-elements";
import "./styles.css";
import theme from "./theme";

import RichTextEditor from "./components/RichTextEditor";
import PostPreviewEditor from "./components/PostPreviewEditor";
import DonationForm from "./components/DonationForm";
import StripeCardEditor from "./components/StripeCardEditor";

function App() {
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
      const stripeObject = window.Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
      setStripe(stripeObject);
      setStripeLoaded(result);
    };
    fetchData();
  }, []);

  const printSubmittedValue = value => {
    console.log(value);
  };

  const getPreviewForAvatarEditor = value => {};

  return (
    <Grommet theme={theme} style={{ height: "100vh" }}>
      {stripeLoaded ? (
        <Box>
          <Box>
            <Heading level="2" margin={{ bottom: "none" }}>
              {" "}
              RichText Editor
            </Heading>
            <Text>My 2 cents on rich text editor with image inputs</Text>
          </Box>
          <Box>
            <RichTextEditor
              getPreview={() => {}}
              placeholder="Keep us engaged ..."
              onSubmit={printSubmittedValue}
            />
          </Box>
          <Box>
            <Heading level="2" margin={{ bottom: "none" }}>
              {" "}
              Stripe Card Editor
            </Heading>
            <Text>My 2 cents on stripe input element </Text>
          </Box>
          <Box>
            <StripeProvider {...{ stripe }}>
              {
                <Elements hidePostalCode>
                  <StripeCardEditor />
                </Elements>
              }
            </StripeProvider>
          </Box>
          <Box>
            <Heading level="2" margin={{ bottom: "none" }}>
              {" "}
              Applications for the RichTextEditors
            </Heading>
            <Text>
              RichTextEditor used to make a create posts Editor with preview
            </Text>
          </Box>
          <Box>
            <PostPreviewEditor
              placeholder="Your two cents buddy ..."
              onSubmit={printSubmittedValue}
            />
          </Box>
          <Box>
            <Heading level="2" margin={{ bottom: "none" }}>
              {" "}
              TextAvatar Editor
            </Heading>
            <Text>My 2 cents on rich text editor with avatar inputs</Text>
          </Box>
          <Box>
            <DonationForm
              stripe={stripe}
              getPreview={getPreviewForAvatarEditor}
              placeholder="Your two cents buddy ..."
              onSubmit={printSubmittedValue}
            />
          </Box>
        </Box>
      ) : null}
    </Grommet>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
