import { useSudokuGrid } from "~/components/sudoku/useSudokuGrid";
import { ChangeEvent, useEffect, useState } from "react";
import { useUpdateRoute } from "~/components/sudoku/useUpdateRoute";
import { parseGrid } from "~/components/sudoku/sudoku.utils";
import { SudokuInput } from "~/components/sudoku/SudokuInput";

interface SudokuProps {
  sudokuId: string;
  sudokuProgress: string;
}

export const Sudoku = ({ sudokuId, sudokuProgress }: SudokuProps) => {
  const { grid, setCellValue, isInitial } = useSudokuGrid(
    sudokuId,
    sudokuProgress,
  );
  const updateRoute = useUpdateRoute(sudokuId);
  const [focused, setFocused] = useState<{
    rowIndex: number;
    colIndex: number;
  }>();

  useEffect(() => {
    updateRoute(parseGrid(grid));
  }, [grid]);

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number,
  ) => {
    const value = e.target.value;
    if (value.length > 1 || !/^[0-9]?$/.test(value)) {
      return;
    }

    setCellValue(rowIndex, colIndex, Number(value));
  };

  return (
    <div id={"tanstack-sudoku"} className={"inline-flex flex-col"}>
      {grid.map((row, i) => (
        <div
          key={i}
          className={`flex flex-row w-auto ${i % 3 === 0 ? `border-t-2 border-t-gray-300 ` : ""}${i % 3 === 2 ? `border-b-2 border-b-gray-300 ` : ""}`}
        >
          {row.map((cell, j) => (
            <div
              key={`${i}${j}`}
              className={`${j % 3 === 0 ? `border-l-2 border-l-gray-300 ` : ""}${j % 3 === 2 ? `border-r-2 border-r-gray-300 ` : ""}`}
            >
              <SudokuInput
                rowIndex={i}
                colIndex={j}
                value={cell === 0 ? "" : cell.toString()}
                onChange={(e) => onChange(e, i, j)}
                onFocus={() => {
                  setFocused({ rowIndex: i, colIndex: j });
                }}
                isDisabled={isInitial(i, j, cell)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
