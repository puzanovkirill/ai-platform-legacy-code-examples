export type TChartRowProcess = {
  id: string;
  type: string;
  start: number;
  long: number;
  frameRange: [number, number];
  object?: { class: string; id: string };
  dataType: string;
};
