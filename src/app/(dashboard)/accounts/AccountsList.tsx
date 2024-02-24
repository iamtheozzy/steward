"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { fetchCreateLinkToken } from "~/utils/api";
import { PlaidButton } from "~/components/plaidButton";
import { AccountCard } from "./AccountCard";
import { api } from "~/trpc/react";

export default function AccountsList() {
  const [link_token, setLinkToken] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<string | null>(null);
  const [oauthLinkToken, setOathLinkToken] = useState<string>("");
  const [isOauth, setIsOath] = useState(false);

  const { data, isLoading } = api.plaid.getAccounts.useQuery();

  const generateToken = async () => {
    const data = await fetchCreateLinkToken();
    if (data) {
      setLinkToken(data.link_token);
      setExpiration(data.expiration);
      localStorage.setItem("link_token", data.link_token);
      localStorage.setItem("expiration", data.expiration);
    }
  };
  useEffect(() => {
    const init = async () => {
      if (window.location.href.includes("?oauth_state_id=")) {
        setIsOath(true);
        const localStorageLink = localStorage.getItem("link_token");
        if (localStorageLink) {
          setOathLinkToken(localStorageLink);
        }
        return;
      }

      const localStorageLink = localStorage.getItem("link_token");
      const localStorageExpiration = localStorage.getItem("expiration");
      if (
        localStorageLink &&
        localStorageExpiration &&
        new Date(localStorageExpiration) > new Date()
      ) {
        setLinkToken(localStorageLink);
      } else {
        await generateToken();
      }
    };
    void init();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-6 flex content-between justify-between">
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="All Accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="person 1">All Accounts</SelectItem>
              <SelectItem value="person 2">Person 2</SelectItem>
            </SelectContent>
          </Select>
          <PlaidButton link_token={isOauth ? oauthLinkToken : link_token!} />
        </div>

        <div className="sm:grid-col-2 grid grid-cols-1 gap-5 md:grid-cols-3">
          {data?.map((account) => {
            return <AccountCard key={account.accountId} account={account} />;
          })}
        </div>
      </div>
    </div>
  );
}
