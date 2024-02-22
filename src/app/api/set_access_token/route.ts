import type { PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import { db } from "~/server/db";
import { getUserByClerkID } from "~/utils/auth";
import { publicTokenExchange, getAccounts } from "~/utils/plaid";

interface OnSuccessResponse {
  public_token: string;
  metadata: PlaidLinkOnSuccessMetadata;
}

export const POST = async (request: Request, _response: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res: OnSuccessResponse = await request.json();
  const user = await getUserByClerkID();

  const { institution } = res.metadata;

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  try {
    // Exchange the public token for an access token
    const { access_token, item_id } = await publicTokenExchange(res.public_token);

    // Optionally fetch account details using the access token
    const accountsResponse = await getAccounts(access_token);
    const accounts = accountsResponse.accounts;

    const newItem = await db.item.create({
      data: {
        userId: user.id,
        plaidAccessToken: access_token,
        plaidItemId: item_id,
        institutionId: institution?.institution_id ?? "",
        institutionName: institution?.name ?? "",
      },
    });

    await Promise.all(
      accounts.map((account) =>
        db.account.create({
          data: {
            itemId: newItem.id,
            accountId: account.account_id,
            name: account.name,
            officialName: account.official_name,
            type: account.type,
            subtype: account.subtype,
            mask: account.mask,
            availableBalance: account.balances.available,
            currentBalance: account.balances.current,
            limit: account.balances.limit,
            isoCurrencyCode: account.balances.iso_currency_code,
          },
        }),
      ),
    );

    const responseData = {
      newItem: {
        // Spread the newItem object but override or exclude sensitive fields
        ...newItem,
        plaidAccessToken: undefined, // Removing the access token from the response so its not sent to the client.
      },
      accountsLength: accounts.length,
    };

    return Response.json({ data: responseData });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};
