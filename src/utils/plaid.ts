import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from "plaid";
import {TRPCError} from "@trpc/server";

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(plaidConfig);

export async function generateLinkToken(userId: string) {
  const response = await plaidClient.linkTokenCreate({
    user: {
      client_user_id: userId,
    },
    client_name: "Steward",
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
  });

  return response.data;
}

export const publicTokenExchange = async (publicToken: string) => {
  const response = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken,
  });

  if (!response.data?.access_token) {
    throw new TRPCError({
      code: "BAD_REQUEST"
    });
  }

  return response.data;
}

export const getAccounts = async (accessToken: string) => {
  try {
    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    return response.data
  } catch (error) {
    console.error('failed to retrieve accounts from Plaid', error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve accounts from Plaid",
    });
  }
};