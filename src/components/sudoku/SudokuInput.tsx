import { ChangeEvent } from "react";

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
  return (
    <input
      className={`w-8 h-8 text-xl sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 sm:text-2xl md:text-4xl lg:text-6xl box-border text-center border-2 font-bold border-gray-500 ${isDisabled && "bg-gray-300"}`}
      id={`${rowIndex}${colIndex}`}
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
