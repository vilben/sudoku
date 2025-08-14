import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import * as React from "react";

export const Home = () => {
  return (
    <NavigationMenuItem>
      <Link to={"/"} className={navigationMenuTriggerStyle()}>
        Home
      </Link>
    </NavigationMenuItem>
  );
};
