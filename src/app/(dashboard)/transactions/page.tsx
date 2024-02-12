import { PlaidButton } from "~/components/plaidButton";
import { api } from "~/trpc/server";

export default async function TrasactionsPage() {
  const {linkToken} = await api.plaid.generateLinkToken.query();

  return (
    <main className="from flex min-h-screen flex-col rounded-l-2xl bg-slate-100">
      <h2 className="upppercase text-5xl font-bold">Transactions Page</h2>
      <PlaidButton linkToken={linkToken} />
    </main>
  );
}

