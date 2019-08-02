import React from "react";

import { Paragraph, Heading, Box } from "grommet";

import Linkify from "react-linkify";

export default ({ title, content }) => {
  const [paragraphs, setParagraphs] = React.useState([]);

  const makeParagraphs = React.useCallback(() => {
    const lines = content.split(/\n/);

    const texts = [];
    let id = 0;
    let value = content;
    lines.map(line => {
      id += 1;
      // only push this line if it contains a non whitespace character.
      if (/\S/.test(line)) {
        value = line.trim();
        texts.push({ id, value });
      }

      return "";
    });
    return texts;
  }, [content]);

  React.useEffect(() => {
    if (content) {
      const texts = makeParagraphs();
      setParagraphs(texts);
    }
  }, [content, makeParagraphs]);

  return (
    <Box
      gap="xsmall"
      justify="between"
      pad="medium"
      background="white"
      round
      style={{ maxLines: 4 }}
    >
      <Linkify>
        {title && (
          <Heading level="2" margin="none" size="small">
            {title}
          </Heading>
        )}
        {paragraphs.map(({ id, value }) => (
          <Paragraph key={id} color="gray">
            {value}
          </Paragraph>
        ))}
      </Linkify>
    </Box>
  );
};
