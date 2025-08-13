import { createFileRoute, Navigate } from "@tanstack/react-router";
import { getSudoku } from "sudoku-gen";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/random/")({
  loader: () => {
    const sudoku = getSudoku();
    return sudoku.puzzle.replaceAll("-", "0");
  },
  component: RouteComponent,
  pendingComponent: PendingComponent,
  pendingMs: 16,
  pendingMinMs: 16,
});

function RouteComponent() {
  const sudokuId: string = Route.useLoaderData();
  return (
    <Navigate
      to={"/tanstack-sudoku/sudoku/$sudokuId"}
      params={{ sudokuId: sudokuId }}
    />
  );
}

function PendingComponent() {
  return <div>Generating...</div>;
}
