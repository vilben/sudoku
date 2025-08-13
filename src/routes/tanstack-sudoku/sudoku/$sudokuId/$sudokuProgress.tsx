import { createFileRoute } from "@tanstack/react-router";
import { Sudoku } from "~/components/sudoku/Sudoku";
import { validateBaseProgression } from "~/components/sudoku/sudoku.utils";

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
  return (
    <div className={"flex flex-row justify-center"}>
      <Sudoku sudokuId={sudokuId} sudokuProgress={sudokuProgress} />
    </div>
  );
}
