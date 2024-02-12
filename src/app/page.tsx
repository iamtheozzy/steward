import { SignInButton, SignOutButton, currentUser} from '@clerk/nextjs'
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default async function HomePage() {
  const user = await currentUser();
  const isLoggedInn = user !== null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center rounded-l-2xl bg-slate-100">
      <h1 className="upppercase text-5xl font-bold">HOME PAGE</h1>
      <p className="text-sm">We have to make some sort of design to make this pretty</p>
      <div className="mt-8 flex flex-col items-center justify-center">        
        {isLoggedInn ? <SignOutButton /> : <SignInButton />}
        {isLoggedInn && (
          <>
            <p className="text-sm">Welcome {user.firstName}</p>
            <Link href="/new-user">
              <Button>Go to Dashboard</Button>
            </Link>
            <SignOutButton />
          </>
        )}
      </div>
    </main>
  );
}