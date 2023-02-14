import { Meta, StoryFn } from "@storybook/html";
import {
  AnalysisResults,
  AnalysisResultType,
  AssignmentType,
  DesignResults,
  DesignResultType,
  Model,
} from "../src/interfaces";
import { Viewer } from "../src/viewer/viewer";
import { ViewerSettingsState } from "../src/viewer/viewer-settings-panel";

export default {
  title: "Viewer",
} as Meta;

const settingsState: ViewerSettingsState = {
  supports: false,
  loads: false,
  deformed: false,
  results: "none",
};
const model: Model = {
  positions: [
    [-5, 0, 0],
    [0, 5, 0],
    [5, 0, 0],
    [0, 0, 2],
    [2, 5, -3],
  ],
  connectivities: [
    [0, 1],
    [1, 2],
    [3, 4],
  ],
  assignments: [
    [
      0,
      {
        type: AssignmentType.barSupports,
        firstNode: [true, true],
      },
    ],
    [
      1,
      {
        type: AssignmentType.barSupports,
        secondNode: [true, false],
      },
    ],
    [
      0,
      {
        type: AssignmentType.barUniformLoad,
        load: -100,
      },
    ],
    [
      1,
      {
        type: AssignmentType.barUniformLoad,
        load: -100,
      },
    ],
  ],
};
const analysisResults: AnalysisResults = {
  [0]: { type: AnalysisResultType.bar, stress: 0, force: 0 },
  [1]: { type: AnalysisResultType.bar, stress: 0.5, force: 90 },
  [2]: { type: AnalysisResultType.bar, stress: 1, force: 100 },
};
const designResults: DesignResults = {
  [0]: { type: DesignResultType.steel, ratio: 0.5 },
  [1]: { type: DesignResultType.steel, ratio: 1 },
  [2]: { type: DesignResultType.steel, ratio: 2 },
};

const template: StoryFn = (args): HTMLElement => {
  const viewer = new Viewer(args.state);
  viewer.update(args.model, args.analysisResults, args.designResults);
  return viewer.render();
};

export const Empty = template.bind({});
Empty.args = {
  state: settingsState,
  model: {
    positions: [],
    connectivities: [],
  },
};

export const WithoutResults = template.bind({});
WithoutResults.args = {
  state: settingsState,
  model,
};

export const AnalysisResults1 = template.bind({});
AnalysisResults1.args = {
  state: { ...settingsState, results: "stress" },
  model,
  analysisResults,
};

export const AnalysisResults2 = template.bind({});
AnalysisResults2.args = {
  state: { ...settingsState, results: "force" },
  model,
  analysisResults,
};

export const DesignResult = template.bind({});
DesignResult.args = {
  state: { ...settingsState, results: "steel" },
  model,
  analysisResults,
  designResults,
};

export const Supports = template.bind({});
Supports.args = {
  state: { ...settingsState, supports: true },
  model,
  analysisResults,
};

export const UniformLoad = template.bind({});
UniformLoad.args = {
  state: { ...settingsState, loads: true },
  model,
  analysisResults,
};
