import { createFileRoute } from "@tanstack/react-router";
import SudokuHome from "./-SudokuHome";
import * as React from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <section className="relative w-full">
      <SudokuHome />
    </section>
  );
}
