import AccountsList from "./AccountsList";

export default async function AccountsPage() {
  return (
    <main className="min-h-screen rounded-l-2xl bg-slate-100">
      <div className="px-16 py-10">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">Accounts</h2>
        <AccountsList />
      </div>
    </main>
  );
}
