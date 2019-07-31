export const groupParagraphs = content => {
  const texts = [];
  let id = 0;
  let value = content;
  return content.split(/\n/).map(line => {
    id += 1;
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(line)) {
      value = line.trim();
      texts.push({ id, value });
    }
    return texts;
  });
};
