import React from "react";
import WebCamera from "react-html5-camera-photo";

import {
  Box,
  Button,
  Keyboard,
  TextArea,
  Image,
  TextInput,
  Text
} from "grommet";
import { Camera, Gallery, Close } from "grommet-icons";
import CameraModal from "./CameraModal";

export default ({
  isText,
  getPreview,
  onSubmit,
  showAvatar,
  hideImageSelection,
  onChangeText,
  onChangeImage,
  disableSubmit,
  error,
  ...rest
}) => {
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");
  const [showCamera, setShowCamera] = React.useState(false);
  const [allowEnter, setAllowEnter] = React.useState(true);

  React.useEffect(() => {
    getPreview({ image, text });
  }, [image, text, getPreview]);

  const fileInputRef = React.useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const changeText = React.useCallback(
    event => {
      const textValue = event.target.value;
      setText(textValue);
      if (disableSubmit) {
        onChangeText(textValue);
      }
    },
    [disableSubmit, onChangeText]
  );

  const onEnter = React.useCallback(() => {
    if (!disableSubmit) {
      if (allowEnter) {
        onSubmit({
          image,
          text
        });
        setImage("");
        setText("");
      }
      setAllowEnter(true);
    }
  }, [disableSubmit, text, image, allowEnter, onSubmit]);

  const onFilesAdded = React.useCallback(
    event => {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => {
        const img = e.target.result;
        // do whatever you want with the file content

        setImage(img);
        if (disableSubmit) {
          onChangeImage(img);
        }
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [disableSubmit, onChangeImage]
  );

  return (
    <Keyboard
      onEnter={onEnter}
      onKeyDown={e => setAllowEnter(e.keyCode !== 16)}
    >
      <Box
        direction="row"
        align="center"
        pad={{ horizontal: "xsmall" }}
        border="all"
        wrap={!isText}
        flex
      >
        <Box full>
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
        {!hideImageSelection && (
          <Box direction="row" align="stretch">
            <Box alignSelf="end" direction="row">
              <Button
                icon={image ? <Close /> : <Camera />}
                onClick={() =>
                  image ? setImage("") : setShowCamera(!showCamera)
                }
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
        )}
        <Box
          fill={!showAvatar || false}
          flex="grow"
          style={{ minWidth: "120px" }}
        >
          {!isText ? (
            <TextArea
              {...rest}
              size="large"
              plain
              onChange={changeText}
              value={text}
            />
          ) : (
            <TextInput
              {...rest}
              size="large"
              // plain
              focus
              onChange={changeText}
              value={text}
            />
          )}
          <Text
            margin={{ horizontal: "small" }}
            alignSelf="start"
            color="error"
          >
            {error}
          </Text>
        </Box>
        {image && showAvatar && (
          <Box direction="row" align="stretch">
            <Box alignSelf="end" direction="row">
              <Button
                round
                icon={
                  <Image
                    fit="cover"
                    src={image}
                    width="40px"
                    height="40px"
                    style={{ borderRadius: "100%" }}
                  />
                }
              />
            </Box>
          </Box>
        )}
      </Box>
    </Keyboard>
  );
};
