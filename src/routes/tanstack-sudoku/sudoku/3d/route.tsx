import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tanstack-sudoku/sudoku/3d")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className={
        "p-2 flex h-[100%] w-full flex-col items-center justify-center"
      }
    >
      <h1 className={"mt-4 text-2xl font-bold"}>3D Sudoku (Beta)</h1>

      <div
        className={
          "flex p-16 h-[100%] w-full justify-center items-center flex-col"
        }
      >
        <div className={"h-[100%] w-[100%]"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
