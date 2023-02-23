export interface State {
  parameters?: Parameters;
  model?: Model;
  analysisResults?: AnalysisResult[];
  designResults?: DesignResult[];
}

// parameters
export enum ParameterType {
  slider = "slider",
}
interface SliderParameter {
  type: ParameterType.slider;
  value: number;
  min: number;
  max: number;
  step: number;
  label?: string;
}
type Parameter = SliderParameter;
export type Parameters = { [name: string]: Parameter };

// model
export enum AssignmentType {
  bar = "bar",
  barSupports = "barSupports",
  barUniformLoad = "barUniformLoad",
  steelDesign = "steelDesign",
}
interface BaseAssignment {
  element?: number;
}
interface BarAssignment extends BaseAssignment {
  type: AssignmentType.bar;
  area: number;
  elasticity: number;
}
interface BarSupportsAssignment extends BaseAssignment {
  type: AssignmentType.barSupports;
  firstNode?: [boolean, boolean];
  secondNode?: [boolean, boolean];
}
interface BarUniformLoadAssignment extends BaseAssignment {
  type: AssignmentType.barUniformLoad;
  xLoad?: number;
  yLoad?: number;
}
interface SteelDesignAssignment extends BaseAssignment {
  type: AssignmentType.steelDesign;
  strength: number;
}
export type Assignment =
  | BarAssignment
  | BarSupportsAssignment
  | BarUniformLoadAssignment
  | SteelDesignAssignment;

export interface Model {
  positions: [number, number, number][];
  deformedPositions?: [number, number, number][];
  connectivities: [number, number][];
  assignments?: Assignment[];
}

// results
interface BaseResult {
  element: number;
}

// analysis result
export enum AnalysisResultType {
  bar = "bar",
}
interface BarResult extends BaseResult {
  type: AnalysisResultType.bar;
  stress: number;
  force: number;
  deformation: number[][];
}
export type AnalysisResult = BarResult;

// design result
export enum DesignResultType {
  steel = "steel",
}
interface SteelDesignResult extends BaseResult {
  type: DesignResultType.steel;
  ratio: number;
}
export type DesignResult = SteelDesignResult;

// export public classes and functions
export { Viewer } from "./ui/viewer";
export { Configurator } from "./ui/configurator";
export { modeling } from "./algorithms/modeling";
export { deforming } from "./algorithms/deforming";
export { analyzing } from "./algorithms/analyzing";
export { designing } from "./algorithms/designing";
