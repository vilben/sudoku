import React from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { SudokuHomeFAQ } from "~/routes/-SudokuHomeFAQ";

export default function SudokuHome() {
  return (
      <>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 relative z-1">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Sudoku — 2D & 3D Puzzles Online
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Enjoy classic <strong>2D Sudoku</strong> or try our <strong>3D Sudoku</strong> grids. Smooth gameplay, undo/redo, validation hints, and easy sharing—optimized for mobile and desktop.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {/* 2D Sudoku buttons */}
              <Button variant="outline" asChild className="rounded-2xl px-5 py-3 text-base font-semibold">
                <Link to="/tanstack-sudoku/sudoku/random/$difficulty" params={{ difficulty: "easy" }}>
                  Start 2D Easy
                </Link>
              </Button>
              <Button variant="default" asChild className="rounded-2xl px-5 py-3 text-base font-semibold">
                <Link to="/tanstack-sudoku/sudoku/random/$difficulty" params={{ difficulty: "medium" }}>
                  Jump to 2D Medium
                </Link>
              </Button>
              <Button variant="ghost" asChild className="rounded-2xl px-5 py-3 text-base font-semibold">
                <Link to="/tanstack-sudoku/sudoku/random">Random 2D Puzzle →</Link>
              </Button>

              {/* 3D Sudoku buttons */}
              <Button variant="outline" asChild className="rounded-2xl px-5 py-3 text-base font-semibold">
                <Link to="/tanstack-sudoku/sudoku/3d/mini">
                  Start 3D (mini)
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <Badge>No login required</Badge>
              <Badge>Keyboard & touch friendly</Badge>
              <Badge>Validation hints available</Badge>
              <Badge>3D mode supported</Badge>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">
            <article className="prose dark:prose-invert max-w-none">
              <h2>Why this Sudoku?</h2>
              <p>
                Our <strong>free online Sudoku</strong> now includes classic 2D grids and exciting 3D variants. Play with friends or challenge yourself with higher-dimensional logic. Smooth interface, instant validation, undo/redo, and shareable links make solving easy and fun.
              </p>
              <ul>
                <li>Shareable Sudoku — send a link and continue anywhere</li>
                <li>Undo & redo any move</li>
                <li>Validation hints highlight mistakes in real time</li>
                <li>Mobile-friendly with instant loading</li>
                <li>3D mode adds a new layer of challenge</li>
              </ul>
            </article>

            <article className="prose dark:prose-invert max-w-none">
              <h2>How to Play 3D Sudoku</h2>
              <p>
                3D Sudoku works like classic Sudoku, but in three dimensions. Fill each row, column, and pillar with numbers 1–N without repetition. Rotate the cube to view all faces and solve the puzzle layer by layer.
              </p>
              <p className="mt-4">
                New to 3D Sudoku? Start with N=3. Ready for a challenge? Try N=4 or N=5 for a deeper logical puzzle.
              </p>
            </article>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Shareable Games", text: "Send a link so friends can pick up exactly where you left off." },
              { title: "Undo & Redo", text: "Go back and forth between moves effortlessly." },
              { title: "Validation Hints", text: "Get instant feedback on mistakes and improve faster." },
              { title: "3D Sudoku", text: "Rotate the cube and solve multi-layer puzzles for an extra challenge." },
              { title: "Always Free", text: "Play as much as you want, no account needed." },
            ].map((item) => (
                <Card key={item.title} className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{item.text}</CardContent>
                </Card>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold">Sudoku FAQs</h2>
            <Accordion type="single" collapsible className="mt-4">
              {[{
                q: "What is 3D Sudoku?",
                a: "3D Sudoku is a higher-dimensional puzzle where each layer must follow Sudoku rules. Rotate the cube to view all faces."
              },
                {
                  q: "Is this Sudoku free?",
                  a: "Yes—play unlimited puzzles without creating an account."
                },
                {
                  q: "Can I share my Sudoku?",
                  a: "Yes. Share the link and someone else can continue right where you left off."
                },
                {
                  q: "Do you offer random puzzles?",
                  a: "Yes. Click 'Random Puzzle' to get a fresh one instantly."
                },
                {
                  q: "What is the validation feature?",
                  a: "The validation function highlights mistakes in real time, helping you correct errors as you play."
                }
              ].map((faq) => (
                  <AccordionItem key={faq.q} value={faq.q}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-sm leading-6 text-muted-foreground">
              Play free Sudoku online: classic 2D grids or advanced 3D challenges. Fast, clean, and mobile-friendly—your best place to solve Sudoku now.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -top-16 left-1/2 h-72 w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-100 via-sky-100 to-cyan-100 blur-3xl dark:from-indigo-950 dark:via-sky-950 dark:to-cyan-950" />
        <SudokuHomeFAQ />
      </>
  );
}
