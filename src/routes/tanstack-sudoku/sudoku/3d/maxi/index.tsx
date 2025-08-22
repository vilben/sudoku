import { createFileRoute } from "@tanstack/react-router";
import { Sudoku3DComponent } from "~/components/sudoku/3d/Sudoku3DComponent";
import { Sudoku3D } from "~/lib/3D/sudoku3D";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/3d/maxi/")({
  loader: () => {
    const sudoku = new Sudoku3D(5);
    const solution = sudoku.generateRandomSolution();
    const riddle = sudoku.generateRiddle(solution, 50);
    return { riddle };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { riddle } = Route.useLoaderData();

  return <Sudoku3DComponent N={5} threeDGrid={riddle} />;
}
