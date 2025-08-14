import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/components/theme/ThemeProvider";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import * as React from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-2 md:w-[300px] md:grid-cols-2 lg:w-[350px]">
          <li>
            <NavigationMenuLink
              role={"button"}
              onClick={() => setTheme("light")}
            >
              <div className="text-sm leading-none font-medium">Light</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:rotate-90" />
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink
              role={"button"}
              onClick={() => setTheme("dark")}
            >
              <div className="text-sm leading-none font-medium">Dark</div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-90 transition-all dark:rotate-0" />
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
