import React from "react";
import { Box, Image } from "grommet";

import { Avatar } from "grommet-controls";
import ContentCard from "./ContentCard";

export default ({ image, content, avatar, reactions, name, duration }) => (
  <Box
    direction="column"
    justify="between"
    pad={{ horizontal: "none" }}
    background="white"
    round={{ corner: "top" }}
    height={image ? "large" : "none"}
  >
    <Box
      alignContent="stretch"
      direction="row"
      round={{ corner: "top" }}
      pad="medium"
      color="brand"
      gap="medium"
      justifySelf="center"
      elevation={image && "medium"}
    >
      {image || content ? (
        <Box alignSelf="start">
          <Avatar
            image={
              avatar ||
              "https://avatars0.githubusercontent.com/u/1753301?s=460&v=4\n"
            }
            title={name || "John Kaddu"}
            subTitle={duration || "almost"}
          />
        </Box>
      ) : null}
    </Box>

    {image && (
      <Box
        flex
        style={{ position: "relative" }}
        height="full"
        width="full"
        margin={{ vertical: "none" }}
      >
        <Image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%"
          }}
          fit="cover"
          src={image}
        />
      </Box>
    )}
    {content && <ContentCard {...{ content }} />}
    {reactions && (
      <Box direction="row" margin="medium" gap="small">
        {reactions}
      </Box>
    )}
  </Box>
);
