import { Meta, StoryFn } from "@storybook/html";
import { Viewer } from "../ui/viewer";
import {
  AssignmentType,
  Model,
  Parameters,
  ParameterType,
} from "../interfaces";
import { Configurator } from "../ui/configurator";
import { analyzing } from "./analyzing";
import { designing } from "./designing";

export default {
  title: "Algorithms/Designing",
} as Meta;

const template: StoryFn = (): HTMLElement => {
  const viewer = new Viewer({
    supports: true,
    deformed: true,
    results: "steel",
  });
  const parameters: Parameters = {
    xLoad: {
      type: ParameterType.slider,
      value: 25,
      min: 0,
      max: 50,
      step: 0.01,
    },
    yLoad: {
      type: ParameterType.slider,
      value: 25,
      min: 0,
      max: 50,
      step: 0.01,
    },
    zLoad: {
      type: ParameterType.slider,
      value: 25,
      min: 0,
      max: 50,
      step: 0.01,
    },
  };
  const configurator = new Configurator(parameters);

  configurator.onChange(() => {
    let model: Model = {
      nodes: [
        [-10, 0, 10],
        [10, 0, 10],
        [0, 0, -10],
        [0, 10, 0],
      ],
      elements: [
        [0, 3],
        [1, 3],
        [2, 3],
      ],
      assignments: [
        { element: 0, type: AssignmentType.bar, area: 5, elasticity: 200 },
        { element: 1, type: AssignmentType.bar, area: 5, elasticity: 200 },
        { element: 2, type: AssignmentType.bar, area: 5, elasticity: 200 },
        {
          element: 0,
          type: AssignmentType.barSupports,
          firstNode: [true, true, true],
        },
        {
          element: 1,
          type: AssignmentType.barSupports,
          firstNode: [true, true, true],
        },
        {
          element: 2,
          type: AssignmentType.barSupports,
          firstNode: [true, true, true],
        },
        {
          element: 0,
          type: AssignmentType.barUniformLoad,
          xLoad: parameters.xLoad.value as number,
          yLoad: parameters.yLoad.value as number,
          zLoad: parameters.zLoad.value as number,
        },
        { element: 0, type: AssignmentType.steelDesign, strength: 50 },
        { element: 1, type: AssignmentType.steelDesign, strength: 50 },
        { element: 2, type: AssignmentType.steelDesign, strength: 50 },
      ],
    };

    const analysisResults = analyzing(model);
    const designResults = designing(model, analysisResults);

    viewer.update(model, analysisResults, designResults);
  });

  const container = document.createElement("div");
  container.appendChild(viewer.render());
  container.appendChild(configurator.render());
  return container;
};

export const Primary = template.bind({});
