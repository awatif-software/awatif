import { Meta, StoryFn } from "@storybook/html";
import { ViewerLabel } from "./viewer-label";

export default {
  title: "UI/Viewer Label",
} as Meta;

const template: StoryFn = (): any => {
  const label = new ViewerLabel();
  label.update({ max: 10, min: 20 });

  return label.render();
};

export const Primary = template.bind({});
