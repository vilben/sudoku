import { Grid, SudokuError } from "~/components/sudoku/sudoku.types";
import { createContext } from "react";

export interface SudokuContextType {
  grid: Grid;
  setCellValue: (row: number, col: number, value: number) => void;
  isInitial: (row: number, col: number, value: number) => boolean;
  setGrid: (grid: Grid) => void;
  showErrors: boolean;
  setShowErrors: (showErrors: boolean) => void;
  errors: SudokuError[];
}
export const SudokuContext = createContext<SudokuContextType | undefined>(
  undefined,
);
