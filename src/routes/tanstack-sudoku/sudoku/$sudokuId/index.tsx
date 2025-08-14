import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/$sudokuId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sudokuId } = Route.useParams();

  return (
    <Navigate
      to={"/tanstack-sudoku/sudoku/$sudokuId/$sudokuProgress"}
      params={{ sudokuId: sudokuId, sudokuProgress: sudokuId }}
    />
  );
}
