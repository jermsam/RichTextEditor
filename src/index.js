import React from "react";
import ReactDOM from "react-dom";
import { Grommet, Box, Heading, Text } from "grommet";
import theme from "./theme";
import RichTextEditor from "./components/RichTextEditor";
import { StripeProvider, Elements } from "react-stripe-elements";

import "./styles.css";
import StripeCardEditor from "./components/StripeCardEditor";

function App() {
  return (
    <Grommet theme={theme} style={{ height: "100vh" }}>
      <Box>
        <Heading level="2" margin={{ bottom: "none" }}>
          {" "}
          RichText Editor
        </Heading>
        <Text>My 2 cents on rich text editor with image inputs</Text>
      </Box>
      <Box>
        <RichTextEditor />
      </Box>
      <Box>
        <Heading level="2" margin={{ bottom: "none" }}>
          {" "}
          Stripe Card Editor
        </Heading>
        <Text>My 2 cents on stripe input element </Text>
      </Box>
      <Box>
        <StripeCardEditor />
      </Box>
    </Grommet>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
