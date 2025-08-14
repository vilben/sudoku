import {
  NavigationMenu,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "~/components/menu/ModeToggle";
import { Sudoku } from "~/components/menu/Sudoku";
import { Home } from "~/components/menu/Home";

export const NavMenu = () => {
  return (
    <div
      className={
        "flex-1 min-h-16 px-1 py-1 w-full rounded flex items-center justify-center bg-transparent"
      }
    >
      <NavigationMenu>
        <NavigationMenuList>
          <Home />
          <Sudoku />
          <ModeToggle />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
