import { createFileRoute } from "@tanstack/react-router";
import { Sudoku } from "~/components/sudoku/Sudoku";
import { validateBaseProgression } from "~/components/sudoku/sudoku.utils";
import { Menu } from "~/components/sudoku/menu/Menu";
import { SudokuContext } from "~/components/sudoku/SudokuContext";
import { useSudokuGrid } from "~/components/sudoku/hooks/useSudokuGrid";

export const Route = createFileRoute(
  "/tanstack-sudoku/sudoku/$sudokuId/$sudokuProgress",
)({
  loader: ({ params: { sudokuId, sudokuProgress } }) => {
    const validated = validateBaseProgression(sudokuId, sudokuProgress);
    return {
      sudokuId: validated.sudokuId,
      sudokuProgress: validated.sudokuProgress,
    };
  },
  component: RouteComponent,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RouteComponent() {
  const { sudokuId, sudokuProgress } = Route.useParams();
  const {
    grid,
    setCellValue,
    isInitial,
    setGrid,
    errors,
    setShowErrors,
    showErrors,
  } = useSudokuGrid(sudokuId, sudokuProgress);

  return (
    <div className={"flex flex-col justify-center gap-2 p-2"}>
      <SudokuContext
        value={{
          grid,
          setCellValue,
          isInitial,
          setGrid,
          showErrors,
          setShowErrors,
          errors,
        }}
      >
        <Menu />
        <Sudoku />
      </SudokuContext>
    </div>
  );
}
