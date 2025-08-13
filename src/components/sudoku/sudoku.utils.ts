import { Difficulty } from "~/components/sudoku/sudoku.types";

export const InvalidLengthError = new Error("Invalid length");
export const InvalidProgression = new Error("Invalid progression");

const hasValidLength = (sudokuId: string) => sudokuId.length === 81;
const validateLength = (sudokuId: string) => {
  if (!hasValidLength(sudokuId)) {
    throw InvalidLengthError;
  }
  return sudokuId;
};

const hasValidBaseProgression = (sudokuId: string, sudokuProgress: string) => {
  if (sudokuId === sudokuProgress) {
    return true;
  }
  const base = initialize(sudokuId);
  const progression = initialize(sudokuProgress);

  return base.reduce((acc, curr, i) => {
    return (
      acc &&
      curr.reduce((acc, curr, j) => {
        if (curr !== 0) {
          return acc && progression[i][j] === curr;
        }
        return acc;
      }, true)
    );
  }, true);
};
export const validateBaseProgression = (
  sudokuId: string,
  sudokuProgress: string,
) => {
  if (!hasValidBaseProgression(sudokuId, sudokuProgress)) {
    throw InvalidProgression;
  }
  return { sudokuId, sudokuProgress };
};

export const split = (sudokuId: string) =>
  validateLength(sudokuId).match(/.{9}/g) as string[];
export const parseGrid = (grid: number[][]) =>
  grid.map((row) => row.join("")).join("");

export const initialize = (sudokuId: string) =>
  split(sudokuId).map((row) => row.split("").map(Number));
export const toDifficulty = (difficulty: string) =>
  Difficulty[difficulty.toUpperCase() as keyof typeof Difficulty];
