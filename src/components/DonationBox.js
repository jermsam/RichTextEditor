import React from "react";
import { Box, Button, Heading } from "grommet";
import RichTextInput from "./RichTextInput";
import { injectStripe } from "react-stripe-elements";

import StripeCardInput from "./StripeCardInput";
import FormFieldLabel from "./FormFieldLabel";

export default injectStripe(({ ...rest }) => {
  const [avatar, setAvatar] = React.useState("");
  const [name, setName] = React.useState("Anonymous");
  const [email, setEmail] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [cardError, setCardError] = React.useState("");

  const onCardChange = ({ error }) => {
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
  };

  const getDonation = () => {
    if (rest.stripe) {
      rest.stripe
        .createSource({
          type: "card",
          currency: "usd",
          owner: { name, email }
        })
        .then(({ error, source }) => {
          if (error) {
            // Inform the user if there was an error
            if (error.message.includes("email")) {
              setEmailError(error.message);
            }
            console.log("Error: ", error.message);
          } else {
            // Send the source to your server
            setEmailError("");
            console.log("send", { source: source.id, avatar, name, comment });
          }
        });
    } else {
      this.setState({ errorMessage: "Stripe.js hasn't loaded yet." });
    }
  };

  return (
    <Box
      elevation="medium"
      style={{ maxWidth: "500px" }}
      pad="large"
      background={{ color: "light-1", opacity: "strong" }}
    >
      <Heading color="brand" level="3">
        {" "}
        Donate
      </Heading>
      <FormFieldLabel label="E-mail" required>
        <RichTextInput
          isText
          disableSubmit
          showAvatar
          {...rest}
          placeholder="E-mail"
          hideImageSelection
          error={emailError}
          onChangeText={text => setEmail(text)}
        />
      </FormFieldLabel>
      <FormFieldLabel label="Card details" required>
        <StripeCardInput {...rest} onChange={onCardChange} error={cardError} />
      </FormFieldLabel>

      <FormFieldLabel label="Face and or Name">
        <RichTextInput
          disableSubmit
          isText
          showAvatar
          {...rest}
          placeholder="Reveal your identity"
          onChangeImage={image => setAvatar(image)}
          onChangeText={text => setName(text)}
        />
      </FormFieldLabel>
      <FormFieldLabel label="Comment">
        <RichTextInput
          disableSubmit
          showAvatar
          {...rest}
          placeholder="Say something ..."
          hideImageSelection
          onChangeText={text => setComment(text)}
        />
      </FormFieldLabel>
      <Box margin="small" style={{ height: "60px" }}>
        <Button
          pad="small"
          fill
          type="button"
          label="SUBMIT DONATE"
          primary
          onClick={getDonation}
        />
      </Box>
    </Box>
  );
});
