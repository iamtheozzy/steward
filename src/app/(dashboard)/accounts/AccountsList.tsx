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
import { api } from "~/trpc/react";

export default function AccountsList() {
  const [link_token, setLinkToken] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<string | null>(null);
  const [oauthLinkToken, setOathLinkToken] = useState<string>("");
  const [isOauth, setIsOath] = useState(false);

  const { data, isLoading } = api.plaid.getAccounts.useQuery();

  const generateToken = async () => {
    const data = await fetchCreateLinkToken();
    console.log("data", data);
    if (data) {
      setLinkToken(data.link_token);
      setExpiration(data.expiration);
      localStorage.setItem("link_token", data.link_token);
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
      await generateToken();
    };

    void init();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex content-between justify-between">
        {link_token && <div>link token : {link_token}</div>}
        {expiration && <div>expiration date : {expiration}</div>}
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

        <div>
          {
            data?.map((account) => {
              return (
                <div key={account.accountId}>
                  <div>{account.institutionName}</div>
                  <div>{account.name}</div>
                  <div>{account.mask}</div>
                  <div>{account.subtype}</div>
                  <div>{account.type}</div>
                  <div>Current balance: ${account.currentBalance}</div>
                  <div>Available balance: ${account.availableBalance}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}