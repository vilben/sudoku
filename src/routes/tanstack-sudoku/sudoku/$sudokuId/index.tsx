import { createFileRoute } from "@tanstack/react-router";
import { Sudoku } from "~/components/sudoku/Sudoku";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/$sudokuId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sudokuId } = Route.useParams();

  return (
    <div className={"flex flex-row justify-center"}>
      <Sudoku sudokuId={sudokuId} sudokuProgress={sudokuId} />
    </div>
  );
}
