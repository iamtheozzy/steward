import { SignUpButton, currentUser } from "@clerk/nextjs";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { buttonVariants } from "../components/ui/button";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import { Hero } from "~/components/Hero";
import Link from "next/link";

// Import MobileMenu dynamically to ensure it's rendered on the client-side
const MobileMenu = dynamic(() => import("~/components/MobileMenu"), { ssr: false });

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

export default async function HomePage() {
  const user = await currentUser();
  const isLoggedIn = user !== null;

  return (
    <main>
      <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b-[1px] bg-white px-10 py-2 dark:border-b-slate-700 dark:bg-background">
        <h1 className="text-xl font-extrabold lg:text-2xl">
          <a href="/">Steward.</a>
        </h1>
        <ul className="hidden items-center justify-center lg:flex lg:gap-8">
          {routeList.map(({ href, label }: RouteProps) => (
            <a key={label} href={href} className={buttonVariants({ variant: "ghost" })}>
              {label}
            </a>
          ))}
        </ul>
        <div className="flex lg:gap-x-2">
          {isLoggedIn && (
            <div className="mt-[5px] hidden lg:flex">
              <Button>
                <Link href="/new-user">Dashboard</Link>
              </Button>
            </div>
          )}
          {!isLoggedIn && (
            <div className="mt-[5px] hidden lg:flex">
              <Button>
                <SignUpButton afterSignUpUrl="/new-user"></SignUpButton>
              </Button>
            </div>
          )}
          <ModeToggle />
          <MobileMenu />
        </div>
      </nav>
      <div className="mx-auto px-10">
        <div>
          <Hero />
        </div>
      </div>
    </main>
  );
}
