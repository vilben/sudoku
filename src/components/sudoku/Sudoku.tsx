import { ChangeEvent, useState } from "react";
import { SudokuInput } from "~/components/sudoku/SudokuInput";
import { useSudokuContext } from "~/components/sudoku/hooks/useSudokuContext";

export const Sudoku = () => {
  const { grid, setCellValue, isInitial } = useSudokuContext();

  const [focused, setFocused] = useState<{
    rowIndex: number;
    colIndex: number;
  }>();

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
    <>
      <div id={"tanstack-sudoku"} className={"inline-flex flex-col"}>
        {grid.map((row, i) => (
          <div
            key={i}
            className={`flex flex-row w-auto ${i % 3 === 0 ? `border-t-2 border-t-sudoku-outer-border ` : ""}${i % 3 === 2 ? `border-b-2 border-b-sudoku-outer-border ` : ""}`}
          >
            {row.map((cell, j) => (
              <div
                key={`${i}${j}`}
                className={`${j % 3 === 0 ? `border-l-2 border-l-sudoku-outer-border ` : ""}${j % 3 === 2 ? `border-r-2 border-r-sudoku-outer-border ` : ""}`}
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
    </>
  );
};
