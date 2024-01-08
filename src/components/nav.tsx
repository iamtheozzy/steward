"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { buttonVariants } from "~/components/ui/button";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
}

export function Nav({ isCollapsed, links }: NavProps) {
  return (
    <div className="flex h-screen flex-col bg-gray-800 text-white">
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <h1 className="px-3 text-3xl font-bold hover:cursor-pointer">s.</h1>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-1">
                <h1 className="px-3 text-sm font-bold hover:cursor-pointer">little stewie.</h1>
              </TooltipContent>
            </Tooltip>
          ) : (
            <h1 className="px-3 text-2xl font-bold">steward.</h1>
          )}

          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start",
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
