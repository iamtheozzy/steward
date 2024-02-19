import AccountsList from "./AccountsList";

export default async function AccountsPage() {
  

  return (
    <main className="min-h-screen rounded-l-2xl bg-slate-100">
      <div className="px-4 py-10">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">Accounts</h2>
        <div className="mb-4 h-[250px] rounded-md border-2 border-solid border-gray-300 px-6">
          <h3 className="text-2xl font-bold text-slate-900">All your monies</h3>
          <p className="text-slate-700">This is the total amount of debt and assets you have.</p>
        </div>
        <AccountsList />
      </div>
    </main>
  );
}
