import React from "react";
import { Button } from "@material-ui/core";

export const Form: React.FC<{
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isSubmitDisabled: boolean;
}> = ({ children, onSubmit, isSubmitDisabled, ...props }) => {
  const [submitState, setSubmitState] = React.useState({
    copy: "Submit",
    disabled: false,
  });

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitState({ copy: "Submitting...", disabled: true });
    try {
      await onSubmit(evt);
      setSubmitState({ copy: "Submitted Successfully", disabled: true });
    } catch (err) {
      console.log(err);
      setSubmitState({ copy: "Submit Failed", disabled: false });
    }
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      {children}
      <Button
        color="primary"
        variant="contained"
        type="submit"
        data-testid="submitBtn"
        disabled={isSubmitDisabled || submitState.disabled}
      >
        {submitState.copy}
      </Button>
    </form>
  );
};
