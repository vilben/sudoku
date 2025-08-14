import { describe, expect, it } from "vitest";
import { Grid, SudokuError } from "~/components/sudoku/sudoku.types";
import { isValidSudoku, validateSudoku } from "./validate.utils";

const validSudokus: Grid[] = [
  [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ],
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 0, 9],
  ],
];

const invalidSudokus: {
  grid: Grid;
  expectedErrors: SudokuError[];
  description: string;
}[] = [
  {
    description: "row duplicate",
    grid: [
      [5, 3, 3, 6, 7, 8, 9, 1, 2], // duplicate 3
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    expectedErrors: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  },
  {
    description: "column duplicate",
    grid: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [5, 9, 8, 3, 4, 2, 5, 6, 7], // duplicate 5 in col 0
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    expectedErrors: [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
    ],
  },
  {
    description: "multiple duplicates",
    grid: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 5, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    expectedErrors: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 5, y: 1 },
      { x: 1, y: 3 },
    ],
  },
  {
    description: "out-of-range value",
    grid: [
      [10, 3, 4, 6, 7, 8, 9, 1, 2], // 10 is invalid
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    expectedErrors: [{ x: 0, y: 0 }],
  },
  {
    description: "multiple duplicates",
    grid: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 3, 9],
    ],
    expectedErrors: [
      { x: 0, y: 8 },
      { x: 7, y: 8 },
      { x: 0, y: 8 },
      { x: 7, y: 7 },
    ],
  },
  {
    description: "duplicate in column (unfinished sudoku)",
    grid: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [5, 0, 0, 0, 6, 0, 0, 0, 3], // duplicate 5 in col 0
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    expectedErrors: [
      { x: 0, y: 0 },
      { x: 0, y: 3 },
    ],
  },
  {
    description: "duplicate in 3x3 box (unfinished sudoku)",
    grid: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 5, 0, 1, 9, 5, 0, 0, 0], // duplicate 5 in top-left box
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    expectedErrors: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ],
  },
  {
    description: "invalid number out of range",
    grid: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 10, 0, 1, 9, 5, 0, 0, 0], // invalid 10
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    expectedErrors: [{ x: 1, y: 1 }],
  },
];

// ---- Convert to tuple tables so Vitest doesn't spread the grid ----
const validCases: [Grid][] = validSudokus.map((g) => [g] as [Grid]);
const invalidCases: [Grid, SudokuError[], string][] = invalidSudokus.map(
  ({ grid, expectedErrors, description }) =>
    [grid, expectedErrors, description] as [Grid, SudokuError[], string],
);

// --- Tests ---

describe("isValidSudoku", () => {
  it.each(validCases)("returns true for valid Sudoku %#", (grid) => {
    expect(isValidSudoku(grid)).toBe(true);
  });

  it.each(invalidCases)("returns false for invalid Sudoku %#", (grid) => {
    expect(isValidSudoku(grid)).toBe(false);
  });
});

describe("validateSudoku", () => {
  it.each(validCases)("returns [] for valid Sudoku %#", (grid) => {
    expect(validateSudoku(grid)).toEqual([]);
  });

  it.each(invalidCases)(
    "returns correct errors for invalid Sudoku (%#)",
    (grid, expectedErrors) => {
      const errors = validateSudoku(grid);
      expectedErrors.forEach((err) => {
        expect(errors).toContainEqual(err);
      });
    },
  );
});
