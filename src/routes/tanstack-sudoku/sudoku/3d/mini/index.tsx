import { createFileRoute } from "@tanstack/react-router";
import { Sudoku3DComponent } from "~/components/sudoku/3d/Sudoku3DComponent";
import { Sudoku3D } from "~/lib/3D/sudoku3D";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/3d/mini/")({
  loader: () => {
    const sudoku = new Sudoku3D(3);
    const solution = sudoku.generateRandomSolution();
    const riddle = sudoku.generateRiddle(solution, 3);
    return { riddle };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { riddle } = Route.useLoaderData();

  return <Sudoku3DComponent N={3} threeDGrid={riddle} />;
}
