import React from "react";
import ReactDOM from "react-dom";
import { Grommet, Box, Heading, Text } from "grommet";
import theme from "./theme";
import RichTextEditor from "./components/RichTextEditor";

import "./styles.css";
import StripeCardEditor from "./components/StripeCardEditor";
import TextAvatarEditor from "./components/TextAvatarEditor";

function App() {
  const [cardError, setCardError] = React.useState("");

  const printSubmittedValue = value => {
    console.log(value);
  };

  const onCardChange = ({ error }) => {
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
  };

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
        <RichTextEditor
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
        <StripeCardEditor onChange={onCardChange} />
        {cardError && (
          <Text
            margin={{ horizontal: "small" }}
            alignSelf="start"
            color="error"
          >
            {cardError}
          </Text>
        )}
      </Box>
      <Box>
        <Heading level="2" margin={{ bottom: "none" }}>
          {" "}
          TextAvatar Editor
        </Heading>
        <Text>My 2 cents on rich text editor with avatar inputs</Text>
      </Box>
      <Box>
        <TextAvatarEditor
          placeholder="Your two cents buddy ..."
          onSubmit={printSubmittedValue}
        />
      </Box>
    </Grommet>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
