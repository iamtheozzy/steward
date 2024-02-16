import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";
import Link from 'next/link';
import { SignInButton, SignOutButton, SignUpButton, currentUser } from "@clerk/nextjs";

export const Hero = async () => {
  const user = await currentUser();
  const isLoggedIn = user !== null;

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Steward,
            </span>{" "}
            
          </h1>{" "}
          next gen{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              budgeting
            </span>{" "}
           app
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Embark on your financial adventure where you and your partner construct your budgeting journey with ease.</p>

        {/* Render the appropriate button based on the user's login status */}
        <div className="justify-center">
          {isLoggedIn ? (

            <div className="space-x-4 flex">
              <Link href="/dashboard" passHref className="w-full">
                <Button className="w-full md:w-1/3">Go to Dashboard</Button>
              </Link>
              <Button className="w-full md:w-1/3 lg:hidden" variant={"secondary"}>
                <SignOutButton>Log Out</SignOutButton>
              </Button>
            </div>

          ) : (
            <div className="space-x-4 flex">
              <Button className="w-full md:w-1/3"><SignUpButton afterSignUpUrl="/dashboard" afterSignInUrl="/dashboard">Get Started</SignUpButton></Button>
              <Button className="w-full md:w-1/3 lg:hidden" variant="secondary">
                <SignInButton afterSignInUrl="/dashboard">Sign In</SignInButton>
              </Button>            
            </div>
          )}
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
