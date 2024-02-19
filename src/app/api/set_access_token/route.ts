import { db } from "~/server/db";
import { getUserByClerkID } from "~/utils/auth";
import { publicTokenExchange } from "~/utils/plaid";

export const POST = async (request: Request, _response: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res: { public_token: string } = await request.json();
  const user = await getUserByClerkID();

  try {
    console.log("Response", res);
    const response = await publicTokenExchange(res.public_token);
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        plaidAccessToken: response.access_token,
        plaidItemId: response.item_id,
      },
    });

    return Response.json({data: {
      user: updatedUser.id,
    }})
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};
