import React from "react";
import ApplyForm from "../../modules/ApplyForm";

const defaultProps = {
  title: "Title",
  subtitle: "Subtitle",
  detail:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor nisi, rutrum amet tortor sed elementum. Commodo, proin tincidunt facilisi pellentesque morbi",
  stepOneButton: "Go to second step",
  stepTwoButton: "Submint",
};

export const Base = () => <ApplyForm {...defaultProps} />;

export default {
  title: "Modules/TwoStepForm",
  parameters: {
    layout: "fullscreen",
    options: {
      showPanel: false,
    },
  },
};
