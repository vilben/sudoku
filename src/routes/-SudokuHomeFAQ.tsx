export const SudokuHomeFAQ = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is this Sudoku free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes—play unlimited puzzles without creating an account.",
              },
            },
            {
              "@type": "Question",
              name: "Can I share my Sudoku?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Share the link and someone else can continue right where you left off.",
              },
            },
            {
              "@type": "Question",
              name: "Do you offer random puzzles?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Click 'Random Puzzle' to get a fresh one instantly.",
              },
            },
            {
              "@type": "Question",
              name: "What is the validation feature?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The validation function highlights mistakes in real time, helping you correct errors as you play.",
              },
            },
            {
              "@type": "Question",
              name: "How does Sudoku work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sudoku is a logic-based puzzle played on a 9×9 grid divided into 9 smaller 3×3 boxes. The goal is to fill every row, column, and box with digits 1–9, without repeating any number. Key points: Start with the given numbers (clues) and logically deduce the rest. 'Naked singles': Only one number fits in a cell. 'Hidden singles': Only one cell in a row, column, or box can hold a number. Pairs, triples, and other patterns can help narrow possibilities. Every puzzle has a unique solution—no guessing required. With our online Sudoku, you can use hints, validation, and undo/redo features to guide your solving process.",
              },
            },
          ],
        }),
      }}
    />
  );
};
