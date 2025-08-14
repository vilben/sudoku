import { useEffect, useState } from "react";
import { initialize, parseGrid } from "~/components/sudoku/sudoku.utils";
import { Grid, SudokuError } from "~/components/sudoku/sudoku.types";
import { useUpdateRoute } from "./useUpdateRoute";
import { useUpdateGrid } from "~/components/sudoku/hooks/useUpdateGrid";
import { validateSudoku } from "~/components/sudoku/menu/validate/validate.utils";

export function useSudokuGrid(sudokuId: string, sudokuProgress?: string) {
  const initialGrid = initialize(sudokuId);
  const progressedGrid = sudokuProgress ? initialize(sudokuProgress) : null;
  const updateRoute = useUpdateRoute(sudokuId);
  const [grid, setGrid] = useState<Grid>(progressedGrid ?? initialGrid);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<SudokuError[]>([]);
  useUpdateGrid(setGrid);

  useEffect(() => {
    if (showErrors) {
      setErrors(validateSudoku(grid));
    }
  }, [grid, showErrors]);

  const setCellValue = (row: number, col: number, value: number) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? value : cell)),
    );
    setGrid(newGrid);
    updateRoute(parseGrid(newGrid));
  };

  const isInitial = (row: number, col: number, value: number) => {
    return initialGrid[row][col] !== 0 && initialGrid[row][col] === value;
  };

  return {
    grid,
    setCellValue,
    initialGrid,
    isInitial,
    setGrid,
    showErrors,
    setShowErrors,
    errors,
  };
}
