import * as React from "react";
import { NavigationMenuLink } from "~/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

export const MenuListItem = ({
  title,
  children,
  params,
  to,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string; params?: object }) => {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          activeOptions={{ exact: true }}
          params={params}
          activeProps={{
            className: "bg-secondary",
          }}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
