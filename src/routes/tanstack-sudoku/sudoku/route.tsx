import { createFileRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/tanstack-sudoku/sudoku")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
