"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "~/utils/cn";
import type { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { buttonVariants } from "~/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { UserButton, SignedIn } from "@clerk/nextjs";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    route: string;
  }[];
  supportLinks: {
    title: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    route: string;
  }[];
}

export function Nav({ isCollapsed, links, supportLinks }: NavProps) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

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
                <h1 className="ml-[3px] px-3 text-3xl font-bold hover:cursor-pointer">
                  <Link href="/">s.</Link>
                </h1>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-1">
                <h1 className="ml-[3px] px-3 text-sm font-bold hover:cursor-pointer">stewie.</h1>
              </TooltipContent>
            </Tooltip>
          ) : (
            <h1 className="px-3 text-2xl font-bold">
              <Link href="/">steward.</Link>
            </h1>
          )}

          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.route}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "ml-[6px] h-9 w-9",
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
                href={link.route}
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
          <div className="absolute bottom-4 flex flex-col">
            {supportLinks.map((link, index) =>
              isCollapsed ? (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.route}
                      className={cn(
                        buttonVariants({ variant: link.variant, size: "icon" }),
                        "ml-[6px] h-9 w-9",
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
                  href={link.route}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "sm" }),
                    link.variant === "default" &&
                      "ml-1 dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start",
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              ),
            )}
            <div className="flex items-center gap-2">
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-12 w-12",
                    },
                  }}
                />
                {/* <Avatar>
                <AvatarImage src={user.imageUrl} alt={user.fullName ?? undefined} />
                <AvatarFallback>{user.fullName}</AvatarFallback>
              </Avatar> */}
                {!isCollapsed ? (
                  <div>
                    <p className="text-xs">{user.fullName}</p>
                    <p className="text-xs">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                ) : null}
              </SignedIn>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
