import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/3d/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"flex flex-row justify-center gap-2"}>
      <Button>
        <Link to={"/tanstack-sudoku/sudoku/3d/mini"} title={"Mini"}>
          Mini
        </Link>
      </Button>
      <Button>
        <Link to={"/tanstack-sudoku/sudoku/3d/maxi"} title={"Maxi"}>
          Maxi
        </Link>
      </Button>
    </div>
  );
}
