import { SignOutButton, UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";


export default async function DashboardPage () {
  const user = await currentUser();
  const isLoggedIn = user !== null;

  // Redirect to /dashboard if user is logged in
  if (!isLoggedIn) {
    redirect('/');
    return null; // Return null to prevent rendering of the rest of the component
  }

  return (
    <main className="from flex min-h-screen flex-col items-center justify-center rounded-l-2xl bg-slate-100">
      <h1 className="uppercase text-5xl font-bold">steward. dashboard</h1>
      {/* This is temporary, need to find a way to reroute the user back to / once they log out */}
      <UserButton afterSignOutUrl="/"></UserButton>
    </main>
  );
}
