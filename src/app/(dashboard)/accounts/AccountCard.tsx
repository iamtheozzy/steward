import type { RouterOutputs } from "~/trpc/shared";
import dayjs from "dayjs";

type AccountCardProps = RouterOutputs["plaid"]["getAccounts"][number];

export function AccountCard({ account }: { account: AccountCardProps }) {
  const { name, mask, currentBalance, institutionName, user, updatedAt, availableBalance } =
    account;
  const date = dayjs(updatedAt).format("MM/DD/YYYY");

  return (
    <div className="back flex h-48 w-80 flex-col justify-between rounded-xl border border-solid border-purple-400 bg-purple-700/30 p-6 text-white shadow-xl backdrop-blur-2xl">
      <div className="font-semibold">
        <div className="text-xl">{name}</div>
        <div className="text-md text-opacity-80">{institutionName}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-md text-opacity-80">XXXX-XXXX-XXXX-{mask}</div>
        <div className="text-sm">{`${user.firstName} ${user.lastName}`}</div>
        <div className="text-sm">Current balance: ${currentBalance}</div>
        <div className="text-sm">Available balance: ${availableBalance}</div>
        <div className="text-sm">Last updated: {date}</div>
      </div>
    </div>
  );
}
