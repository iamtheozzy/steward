"use client";

import { useCallback } from "react";
import { type PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";
import { fetchExchangePublicToken } from "~/utils/api";
import { Button } from "./ui/button";

export const PlaidButton = ({link_token}: {link_token: string}) => {

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token:string, metadata) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await fetchExchangePublicToken(public_token, metadata);
    return Response.json(data);
  }, []);

  const { ready, open } = usePlaidLink({
    token: link_token,
    onSuccess,
  });

  const handleOpen = () => {
    if (ready) {
      open();
    }
  };

  return (
    <Button onClick={handleOpen} disabled={!ready}>
      Add Account
    </Button>
    
  );
};