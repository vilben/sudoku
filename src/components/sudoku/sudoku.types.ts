export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Grid = number[][];
export type SudokuError = { x: number; y: number };
