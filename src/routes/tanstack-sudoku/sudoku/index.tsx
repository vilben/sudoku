import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>INDEX</div>;
}
