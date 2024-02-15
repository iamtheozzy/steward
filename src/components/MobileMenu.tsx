"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="w-full bg-white dark:border-b-slate-700 dark:bg-background mt-3">
      {/* mobile */}
      <span className="flex md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="px-2 mt-[2px]">
            <Menu
              className="flex md:hidden h-5 w-5"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Menu Icon</span>
            </Menu>
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle className="font-bold text-xl">Steward.</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col justify-center items-center gap-2 mt-4">
              {routeList.map(({ href, label }: RouteProps) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </span>
    </header>
  );
};

export default MobileMenu; // Correct export statement
