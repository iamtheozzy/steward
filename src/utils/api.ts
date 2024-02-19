/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { LinkTokenCreateResponse } from "plaid";
import type { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export const createURL = (path: string) => {
  return window.location.origin + path;
};

type createLinkTokenResponse = {
  data: LinkTokenCreateResponse;
};

export const fetchCreateLinkToken = async () => {
  const res = await fetch(
    new Request(createURL(`/api/create_link_token`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to create link token");
  }

  if (res.ok) {
    const data: createLinkTokenResponse = await res.json();
    return data.data;
  }
};

export const fetchExchangePublicToken = async (
  public_token: string,
  metadata: PlaidLinkOnSuccessMetadata,
) => {
  const res = await fetch(
    new Request(createURL(`/api/set_access_token`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_token: public_token,
        metadata: metadata,
      }),
    }),
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("res", res);
    throw new Error("Failed to exchange public token");
  }

  if (res.ok) {
    const data = await res.json();
    return data;
  }
};
