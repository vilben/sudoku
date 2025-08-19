import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { MenuListItem } from "~/components/menu/MenuListItem";

export const Sudoku = () => {
  return (
    <NavigationMenuItem className="p-4">
      <NavigationMenuTrigger>Play</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <MenuListItem to={"/tanstack-sudoku/sudoku"} title={"Sudoku"}>
            Play Sudoku
          </MenuListItem>
          <MenuListItem to={"/tanstack-sudoku/sudoku/random"} title={"Random"}>
            Generate completely random Sudoku
          </MenuListItem>
          <MenuListItem
            to={"/tanstack-sudoku/sudoku/random/easy"}
            title={"Easy"}
          >
            Generate random easy Sudoku
          </MenuListItem>
          <MenuListItem
            to={"/tanstack-sudoku/sudoku/random/medium"}
            title={"Medium"}
          >
            Generate random medium Sudoku
          </MenuListItem>
          <MenuListItem
            to={"/tanstack-sudoku/sudoku/random/hard"}
            title={"Hard"}
          >
            Generate random hard Sudoku
          </MenuListItem>
          <MenuListItem to={"/tanstack-sudoku/sudoku/3d"} title={"3D"}>
            Play a 3x3x3 3D version of Sudoku (BETA)
          </MenuListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
