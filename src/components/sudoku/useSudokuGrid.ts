import { useState } from "react";
import { initialize } from "~/components/sudoku/sudoku.utils";

export function useSudokuGrid(sudokuId: string, sudokuProgress?: string) {
  const initialGrid = initialize(sudokuId);
  const progressedGrid = sudokuProgress ? initialize(sudokuProgress) : null;

  const [grid, setGrid] = useState<number[][]>(progressedGrid ?? initialGrid);

  const setCellValue = (row: number, col: number, value: number) => {
    setGrid((currentGrid) =>
      currentGrid.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? value : cell)),
      ),
    );
  };

  const isInitial = (row: number, col: number, value: number) => {
    return initialGrid[row][col] !== 0 && initialGrid[row][col] === value;
  };

  return {
    grid,
    setCellValue,
    initialGrid,
    isInitial,
  };
}
