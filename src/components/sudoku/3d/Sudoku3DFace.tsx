import { ChangeEvent, forwardRef } from "react";
import { Face, ThreeDGrid } from "~/lib/3D/sudoku3D.types";
import { useSudoku3D } from "~/components/sudoku/3d/useSudoku3D";

export const Sudoku3DFace = forwardRef<
  HTMLDivElement,
  {
    face: Face;
    faceIndex: number;
    setValue: (faceIndex: number, row: number, col: number, n: number) => void;
    initialGrid: ThreeDGrid;
  }
>(
  (
    {
      face,
      faceIndex,
      setValue,
      initialGrid,
    }: {
      face: Face;
      faceIndex: number;
      setValue: (
        faceIndex: number,
        row: number,
        col: number,
        n: number,
      ) => void;
      initialGrid: ThreeDGrid;
    },
    ref,
  ) => {
    const { isInitial } = useSudoku3D(initialGrid);

    const onChange = (
      e: ChangeEvent<HTMLInputElement>,
      faceIndex: number,
      rowIndex: number,
      colIndex: number,
    ) => {
      const value = e.target.value;
      if (value.length > 1 || !/^[0-9]?$/.test(value)) {
        return;
      }
      setValue(faceIndex, rowIndex, colIndex, Number(e.target.value));
    };

    return (
      <div ref={ref} className={`flex flex-col face`}>
        {face.map((row, rowIndex) => (
          <div
            key={`x-${faceIndex}${rowIndex}`}
            className={"flex flex-row border border-sudoku-border"}
          >
            {row.map((cell, colIndex) => (
              <div
                key={`y-${faceIndex}${rowIndex}${colIndex}`}
                className={`p-2 m-2 font-bold font-lg border border-sudoku-border ${isInitial(faceIndex, rowIndex, colIndex) && "bg-sudoku-background-3d"}`}
              >
                <input
                  className={`w-8 h-8 text-center text-2xl hover:shadow-lg `}
                  type={"text"}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  autoComplete={"off"}
                  disabled={isInitial(faceIndex, rowIndex, colIndex)}
                  maxLength={1}
                  onChange={(e) => {
                    onChange(e, faceIndex, rowIndex, colIndex);
                  }}
                  value={cell === 0 ? "" : cell}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
);
