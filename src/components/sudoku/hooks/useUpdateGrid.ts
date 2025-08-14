import { useEffect } from "react";
import {
  initialize,
  validateBaseProgression,
} from "~/components/sudoku/sudoku.utils";
import { useLocation } from "@tanstack/react-router";

export const useUpdateGrid = (setGrid: (grid: number[][]) => void) => {
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    const splits = pathName.split("/");
    const sudokuProgress = splits.at(-1);
    const sudokuId = splits.at(-2);

    if (
      !sudokuProgress ||
      !sudokuId ||
      sudokuProgress.length !== 81 ||
      sudokuId.length !== 81
    ) {
      return;
    }

    if (validateBaseProgression(sudokuId, sudokuProgress)) {
      try {
        const grid = initialize(sudokuProgress);
        setGrid(grid);
      } catch (e) {
        console.error(e);
      }
    }
  }, [location]);
};
