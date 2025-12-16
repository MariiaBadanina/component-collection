import React from "react";
import Accordion from "../../modules/Accordion";

const elements = Array(5)
  .fill(0)
  .map((x, idx) => ({
    title: `Title ${idx + 1}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim ut nibh eget porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor nisi, rutrum amet tortor sed elementum. Commodo, proin tincidunt facilisi pellentesque morbi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim ut nibh eget porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor nisi, rutrum amet tortor sed elementum. Commodo, proin tincidunt facilisi pellentesque morbi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim ut nibh eget porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor nisi, rutrum amet tortor sed elementum. Commodo, proin tincidunt facilisi pellentesque morbi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim ut nibh eget porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor nisi, rutrum amet tortor sed elementum. Commodo, proin tincidunt facilisi pellentesque morbi.",
  }));

const defaultProps = {
  title: "Title",
  subtitle: "Subtitle",
  detail:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor nisi, rutrum amet tortor sed elementum. Commodo, proin tincidunt facilisi pellentesque morbi",
};

export const Base = () => <Accordion {...defaultProps} elements={elements} />;

export default {
  title: "Modules/Accordion",
  parameters: {
    layout: "fullscreen",
    options: {
      showPanel: false,
    },
  },
};
