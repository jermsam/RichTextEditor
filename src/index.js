import React from "react";
import ReactDOM from "react-dom";
import { Grommet, Box, Heading, Text } from "grommet";
import theme from "./theme";
import RichTextEditor from "./components/RichTextEditor";

import "./styles.css";

function App() {
  return (
    <Grommet theme={theme} style={{ height: "100vh" }}>
      <Box>
        <Heading margin={{ bottom: "none" }} level="1">
          {" "}
          RichTextEditor
        </Heading>
        <Text>My 2 cents on rich text editor with image inputs</Text>
      </Box>
      <Box>
        <RichTextEditor />
      </Box>
    </Grommet>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
