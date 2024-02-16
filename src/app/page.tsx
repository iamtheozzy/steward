import { SignInButton, SignOutButton, currentUser } from '@clerk/nextjs';
import { ModeToggle } from '~/components/mode-toggle';
import { Button } from '~/components/ui/button';
import { buttonVariants } from "../components/ui/button";
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { Hero } from '~/components/Hero';

// Import MobileMenu dynamically to ensure it's rendered on the client-side
const MobileMenu = dynamic(() => import('~/components/MobileMenu'), { ssr: false });

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
      <nav className='items-center px-10 py-2 sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background flex justify-between'>
        <h1 className='text-xl lg:text-2xl font-extrabold'><a href="/">Steward.</a></h1>
        <ul className='hidden lg:flex justify-center items-center lg:gap-8'>
        {routeList.map(({ href, label }: RouteProps) => (
          <a
            key={label}
            href={href}
            className={buttonVariants({ variant: "ghost" })}
            >
            {label}
          </a>
        ))}
        </ul>
        <div className='flex lg:gap-x-2'>
          {isLoggedIn && (
            <div className='hidden lg:flex mt-[5px]'>
              <Button>
                <SignOutButton></SignOutButton>
              </Button>
            </div>
          )}
          {!isLoggedIn && (
            <div className='hidden lg:flex mt-[5px]'>
              <Button>
                <SignInButton afterSignInUrl='/dashboard'></SignInButton>
              </Button>
            </div>
          )}
          <ModeToggle />
          <MobileMenu />
        </div>
      </nav>
      <div className='mx-auto px-10'>
        <div>
          <Hero />
        </div>
      </div>
    </main>
  );
}
