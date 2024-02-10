'use client'

import { usePlaidLink } from "react-plaid-link";
import { Button } from "./ui/button";

type PlaidButtonProps = {
  linkToken: string
}

export const PlaidButton = ({linkToken}: PlaidButtonProps) => {

  const { ready, open } = usePlaidLink({
    token: linkToken,
    onSuccess: (publicToken) => {
      
    }
  });

  const handleOpen = () => {
    console.log('Clicked!')
    if (ready) {
      open();
    }
  }

  return (
    <Button onClick={handleOpen} disabled={!ready}>
      Connect your bank
    </Button>
  );
}
