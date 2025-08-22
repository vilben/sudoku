import { useState, useCallback, useMemo } from "react";
import { ThreeDGrid } from "~/lib/3D/sudoku3D.types";

export function useSudoku3D(initialGrid: ThreeDGrid) {
  // Store current state
  const [currentGrid, setCurrentGrid] = useState<ThreeDGrid>(() =>
    initialGrid.map((face) => face.map((row) => [...row])),
  );

  // Memoize initial grid copy so it's stable across renders
  const initialCopy = useMemo(
    () => initialGrid.map((face) => face.map((row) => [...row])),
    [initialGrid],
  );

  // Update a cell
  const setCellValue = useCallback(
    (z: number, x: number, y: number, value: number) => {
      setCurrentGrid((prev) => {
        const newGrid = prev.map((face) => face.map((row) => [...row]));
        newGrid[z][x][y] = value;
        return newGrid;
      });
    },
    [],
  );

  // Check if a cell was part of the initial clues
  const isInitial = useCallback(
    (z: number, x: number, y: number) => {
      return initialCopy[z][x][y] !== 0;
    },
    [initialCopy],
  );

  // Reset the grid
  const resetGrid = useCallback(() => {
    setCurrentGrid(initialCopy.map((face) => face.map((row) => [...row])));
  }, [initialCopy]);

  return {
    initialGrid: initialCopy,
    currentGrid,
    setCellValue,
    isInitial,
    resetGrid,
  };
}
