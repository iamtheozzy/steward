import type { RouterOutputs } from "~/trpc/shared";

type AccountCardProps = RouterOutputs["plaid"]["getAccounts"][number]

export function AccountCard({account}: {account: AccountCardProps}) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg w-80">
      <div className="text-white text-xl font-semibold mb-2">{account.name}</div>
      {/* <div>{account.institutionName}</div> */}
      {/* <div>{account.type}</div> */}
      <div>{account.subtype}</div>
      <div>{account.mask}</div>
      <div>Current balance: ${account.currentBalance}</div>
      <div>Available balance: ${account.availableBalance}</div>
    </div>
  );
}