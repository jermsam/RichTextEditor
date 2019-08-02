import React from "react";
import { Box } from "grommet";
import RichTextInput from "./RichTextInput";
import PostCard from "./PostCard";

export default ({ ...rest }) => {
  const [image, setImage] = React.useState("");
  const [text, setText] = React.useState("");

  const getPreview = React.useCallback(value => {
    if (value.image) {
      setImage(value.image);
    } else {
      setImage("");
    }
    if (value.text) {
      setText(value.text);
    } else {
      setText("");
    }
  }, []);

  return (
    <Box
      elevation="medium"
      round={{ corner: "top" }}
      style={{ maxWidth: "500px" }}
    >
      <PostCard
        image={image}
        content={text}
        reactions={<RichTextInput {...rest} getPreview={getPreview} />}
      />
    </Box>
  );
};
