import { createFileRoute, Navigate } from "@tanstack/react-router";
import { getSudoku } from "sudoku-gen";
import { toDifficulty } from "~/components/sudoku/sudoku.utils";

export const Route = createFileRoute(
  "/tanstack-sudoku/sudoku/random/$difficulty",
)({
  loader: ({ params: { difficulty } }) => {
    const d = toDifficulty(difficulty);
    if (!d) {
      throw new Error(`Difficulty ${difficulty} not found`);
    }
    const sudoku = getSudoku(d);
    return sudoku.puzzle.replaceAll("-", "0");
  },
  component: RouteComponent,
  pendingComponent: PendingComponent,
  errorComponent: ({ error }) => <div>{error.message}</div>,
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

function PendingComponent({ difficulty }: { difficulty: string }) {
  return <div>Generating {difficulty} Sudoku...</div>;
}
