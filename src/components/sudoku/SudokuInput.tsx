import { ChangeEvent, useCallback } from "react";
import { useSudokuContext } from "~/components/sudoku/hooks/useSudokuContext";

interface SudokuInputProps {
  rowIndex: number;
  colIndex: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  isDisabled: boolean;
}

export const SudokuInput = ({
  rowIndex,
  colIndex,
  value,
  onChange,
  isDisabled,
  onFocus,
}: SudokuInputProps) => {
  const { showErrors, errors } = useSudokuContext();
  const hasError = useCallback(() => {
    return (
      showErrors &&
      !isDisabled &&
      errors.find((e) => e.x === colIndex && e.y === rowIndex)
    );
  }, [showErrors, errors]);

  return (
    <input
      className={`w-8 h-8 text-xl sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-22 lg:h-22 sm:text-2xl md:text-4xl lg:text-6xl box-border text-center border-2 font-bold border-sudoku-border ${hasError() && "text-red-300"} ${isDisabled && "bg-sudoku-background"}`}
      id={`cell-${rowIndex}${colIndex}`}
      type="text"
      inputMode="numeric"
      autoComplete={"off"}
      disabled={isDisabled}
      maxLength={1}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};
