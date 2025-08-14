import React from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function SudokuPage() {
  const difficulties = [
    {
      title: "Easy",
      path: "/tanstack-sudoku/sudoku/random/easy",
      description: "Generate a random easy Sudoku",
    },
    {
      title: "Medium",
      path: "/tanstack-sudoku/sudoku/random/medium",
      description: "Generate a random medium Sudoku",
    },
    {
      title: "Hard",
      path: "/tanstack-sudoku/sudoku/random/hard",
      description: "Generate a random hard Sudoku",
    },
    {
      title: "Random",
      path: "/tanstack-sudoku/sudoku/random",
      description: "Generate a completely random Sudoku",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Play Sudoku</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a difficulty to start a Sudoku puzzle, continue an unfinished
          one, or challenge yourself with a random grid. Track your progress and
          enjoy our validation, undo/redo, and sharing features.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-2">
        {difficulties.map((diff) => (
          <Card key={diff.title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                {diff.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {diff.description}
              <div className="mt-4">
                <Link to={diff.path}>Play {diff.title} Sudoku →</Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
