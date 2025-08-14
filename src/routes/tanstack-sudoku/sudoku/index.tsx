import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import SudokuPage from "~/routes/tanstack-sudoku/sudoku/-SudokuPage";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SudokuPage />;
}
