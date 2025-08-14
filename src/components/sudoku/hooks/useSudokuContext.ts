import { useContext } from "react";
import {
  SudokuContext,
  SudokuContextType,
} from "~/components/sudoku/SudokuContext";

export const useSudokuContext = () => {
  const data = useContext<SudokuContextType | undefined>(SudokuContext);
  if (!data) {
    throw new Error("SudokuContext is missing");
  }
  return data;
};
