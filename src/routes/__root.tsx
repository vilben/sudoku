/// <reference types="vite/client" />
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon-180x180.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
        color: "#fffff",
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild>
              <NavigationMenuLink asChild>
                <Link to={"/"} className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Play</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem to={"/tanstack-sudoku/sudoku"} title={"Sudoku"}>
                    Play Sudoku
                  </ListItem>
                  <ListItem
                    to={"/tanstack-sudoku/sudoku/random"}
                    title={"Random"}
                  >
                    Generate completely random Sudoku
                  </ListItem>
                  <ListItem
                    to={"/tanstack-sudoku/sudoku/random/easy"}
                    title={"Easy"}
                  >
                    Generate random easy Sudoku
                  </ListItem>
                  <ListItem
                    to={"/tanstack-sudoku/sudoku/random/medium"}
                    title={"Medium"}
                  >
                    Generate random mediumSudoku
                  </ListItem>
                  <ListItem
                    to={"/tanstack-sudoku/sudoku/random/hard"}
                    title={"Hard"}
                  >
                    Generate random mediumSudoku
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <hr />
        <div className={"p-4 flex flex-row justify-center"}>{children}</div>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}

function ListItem({
  title,
  children,
  params,
  to,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string; params?: object }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          activeOptions={{ exact: true }}
          params={params}
          activeProps={{
            className: "bg-gray-100",
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
}
