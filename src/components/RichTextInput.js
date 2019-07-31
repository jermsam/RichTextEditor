import React from "react";
import WebCamera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Box, Button, Keyboard, TextArea, Image, TextInput } from "grommet";
import { FormClose, Camera, Gallery, Close } from "grommet-icons";
import CameraModal from "./CameraModal";

export default ({ onSubmit, ...rest }) => {
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");
  const [paragraphs, setParagraphs] = React.useState([]);
  const [showCamera, setShowCamera] = React.useState(false);
  const [allowEnter, setAllowEnter] = React.useState(true);

  const fileInputRef = React.useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const groupParagraphs = content => {
    const lines = content.split(/\n/);

    const texts = [];
    let id = 0;
    let value = content;
    return lines.map(line => {
      id += 1;
      // only push this line if it contains a non whitespace character.
      if (/\S/.test(line)) {
        value = line.trim();
        texts.push({ id, value });
      }
      return texts;
    });
  };

  const changeText = event => {
    const textValue = event.target.value;
    const paragraphsValue = groupParagraphs(text);
    setText(textValue);
    setParagraphs(paragraphsValue);
  };

  const onEnter = React.useCallback(
    event => {
      if (allowEnter) {
        onSubmit({
          image,
          paragraphs
        });
        setImage("");
        setText("");
      }
      setAllowEnter(true);
    },
    [paragraphs, image, allowEnter, onSubmit]
  );

  const onFilesAdded = event => {
    let file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      const img = e.target.result;
      // do whatever you want with the file content

      setImage(img);

      img.onload = () => {
        console.log(img);
      };
    };
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Box alignSelf="start" direction="column">
        {image && (
          <Box width="full" align="center">
            <Box align="end" background="dark-1" alignSelf="stretch">
              <Button
                icon={<FormClose />}
                onClick={() => {
                  setImage("");
                  setShowCamera(false);
                }}
              />
            </Box>
            <Image
              style={{
                maxHeight: "100%",
                maxWidth: "100%"
              }}
              fit="cover"
              src={image}
            />
          </Box>
        )}

        {showCamera && (
          <CameraModal onClose={() => setShowCamera(false)}>
            <WebCamera
              onTakePhoto={dataUri => {
                setImage(dataUri);
                setShowCamera(false);
              }}
            />
          </CameraModal>
        )}
      </Box>
      <Keyboard
        onEnter={onEnter}
        onKeyDown={e => setAllowEnter(e.keyCode !== 16)}
      >
        <Box
          direction="row"
          align="center"
          pad={{ horizontal: "xsmall" }}
          border="all"
          wrap
        >
          <Box direction="row" align="stretch">
            <Box alignSelf="end" direction="row">
              <Button
                icon={showCamera ? <Close /> : <Camera />}
                onClick={() => setShowCamera(!showCamera)}
              />
              <Button icon={<Gallery />} onClick={openFileDialog} />
              <TextInput
                hidden
                ref={fileInputRef}
                type="file"
                multiple
                onChange={onFilesAdded}
              />
            </Box>
          </Box>

          <Box flex style={{ minWidth: "120px" }}>
            <TextArea
              {...rest}
              size="large"
              plain
              onChange={changeText}
              value={text}
            />
          </Box>
        </Box>
      </Keyboard>
    </Box>
  );
};
