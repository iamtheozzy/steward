import type { ReactNode } from "react";

export default function NewUser({ children }: { children?: ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 pt-3">
      <div className="">
        <h1 className="px-3 text-4xl font-bold text-white">steward.</h1>
      </div>
      <div className="container mx-auto">{children}</div>
    </main>
  );
}
