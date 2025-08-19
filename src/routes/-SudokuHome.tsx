import React from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { SudokuHomeFAQ } from "~/routes/-SudokuHomeFAQ";

export default function SudokuHome() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 relative z-1">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Sudoku — Play Free Puzzles Online
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Crush <strong>Sudoku</strong> grids anytime, anywhere. Smooth
            gameplay, undo/redo, validation hints, and easy sharing—optimized
            for mobile and desktop. Choose from{" "}
            <strong>Easy, Medium, and Hard</strong> levels and watch your skills
            grow.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              asChild
              className="rounded-2xl px-5 py-3 text-base font-semibold"
            >
              <Link
                to="/tanstack-sudoku/sudoku/random/$difficulty"
                params={{ difficulty: "easy" }}
              >
                Start Easy
              </Link>
            </Button>
            <Button
              variant="default"
              asChild
              className="rounded-2xl px-5 py-3 text-base font-semibold"
            >
              <Link
                to="/tanstack-sudoku/sudoku/random/$difficulty"
                params={{ difficulty: "medium" }}
              >
                Jump to Medium
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="rounded-2xl px-5 py-3 text-base font-semibold"
            >
              <Link to="/tanstack-sudoku/sudoku/random">Random Puzzle →</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <Badge>No login required</Badge>
            <Badge>Keyboard & touch friendly</Badge>
            <Badge>Validation hints available</Badge>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">
          <article className="prose dark:prose-invert max-w-none">
            <h2>Why this Sudoku?</h2>
            <p>
              Our <strong>free online Sudoku</strong> is built for speed and
              clarity: crisp grid, undo/redo, shareable links, validation hints,
              and a smooth, distraction-free experience. Whether you’re learning
              the basics or chasing tough solves, you’ll get a puzzle that’s
              always free and easy to share.
            </p>
            <ul>
              <li>
                Shareable Sudoku — send a link and continue where you left off
              </li>
              <li>Undo & redo any move</li>
              <li>Validation hints highlight mistakes in real time</li>
              <li>Mobile-friendly with instant loading</li>
            </ul>
          </article>

          <article className="prose dark:prose-invert max-w-none">
            <h2>How to Play Sudoku (Quick Guide)</h2>
            <p>
              Fill each row, column, and 3×3 box with digits 1–9 without
              repeating numbers. Apply logic techniques like <em>singles</em>,{" "}
              <em>hidden pairs</em>, and <em>line/box reduction</em> to
              progress. No math—just pure logic.
            </p>
            <p className="mt-4">
              New to Sudoku? Start on{" "}
              <Link
                className="underline"
                to="/tanstack-sudoku/sudoku/random/$difficulty"
                params={{ difficulty: "easy" }}
              >
                Easy
              </Link>{" "}
              and take your time. Ready to level up? Try{" "}
              <Link
                className="underline"
                to="/tanstack-sudoku/sudoku/random/$difficulty"
                params={{ difficulty: "medium" }}
              >
                Medium
              </Link>
              ,{" "}
              <Link
                className="underline"
                to="/tanstack-sudoku/sudoku/random/$difficulty"
                params={{ difficulty: "hard" }}
              >
                Hard
              </Link>{" "}
              or{" "}
              <Link className="underline" to="/tanstack-sudoku/sudoku/random">
                Random
              </Link>{" "}
              for a surprise challenge.
            </p>
          </article>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Shareable Games",
              text: "Send a link so friends can pick up exactly where you left off.",
            },
            {
              title: "Undo & Redo",
              text: "Go back and forth between moves effortlessly.",
            },
            {
              title: "Validation Hints",
              text: "Get instant feedback on mistakes and improve faster.",
            },
            {
              title: "Always Free",
              text: "Play as much as you want, no account needed.",
            },
          ].map((item) => (
            <Card key={item.title} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.text}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold">Sudoku FAQs</h2>
          <Accordion type="single" collapsible className="mt-4">
            {[
              {
                q: "Is this Sudoku free?",
                a: "Yes—play unlimited puzzles without creating an account.",
              },
              {
                q: "Can I share my Sudoku?",
                a: "Yes. Share the link and someone else can continue right where you left off.",
              },
              {
                q: "Do you offer random puzzles?",
                a: "Yes. Click 'Random Puzzle' to get a fresh one instantly.",
              },
              {
                q: "What is the validation feature?",
                a: "The validation function highlights mistakes in real time, helping you correct errors as you play.",
              },
              {
                q: "How does Sudoku work?",
                a: (
                  <>
                    Sudoku is a logic-based puzzle played on a 9×9 grid divided
                    into 9 smaller 3×3 boxes. The goal is to fill every row,
                    column, and box with digits 1–9, without repeating any
                    number. <br />
                    <br />
                    Key points to keep in mind: <br />
                    • Start with the given numbers (clues) and logically deduce
                    the rest. <br />
                    • "Naked singles": Only one number fits in a cell. <br />
                    • "Hidden singles": Only one cell in a row, column, or box
                    can hold a number. <br />
                    • Pairs, triples, and other patterns can help narrow
                    possibilities. <br />• Every puzzle has a unique solution—no
                    guessing required. <br />
                    <br />
                    With our online Sudoku, you can also use hints, validation,
                    and undo/redo features to guide your solving process.
                  </>
                ),
              },
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
            Play free Sudoku online: easy Sudoku for beginners, advanced logic
            for experts, and a fresh puzzle anytime. Fast, clean, and
            mobile-friendly—your best place to solve Sudoku now.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-16 left-1/2 h-72 w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-100 via-sky-100 to-cyan-100 blur-3xl dark:from-indigo-950 dark:via-sky-950 dark:to-cyan-950" />
      <SudokuHomeFAQ />
    </>
  );
}
