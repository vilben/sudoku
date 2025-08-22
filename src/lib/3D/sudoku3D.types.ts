import { Grid } from "~/components/sudoku/sudoku.types";

export type Face = Grid;
export type ThreeDGrid = Array<Face>;
export enum Side {
  FRONT,
  TOP,
  RIGHT,
}
