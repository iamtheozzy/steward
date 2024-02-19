import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateLinkToken, publicTokenExchange } from "~/utils/plaid";

export const plaidRouter = createTRPCRouter({
  generateLinkToken: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser.id;
    const data = await generateLinkToken(userId);
    return data;
  }),
  publicTokenExchange: protectedProcedure.input(z.string().min(1)).mutation(async ({ctx, input}) => {
  console.log("FIRING PUBLIC TOKEN EXCHANGE")
    const publicTokenExchangeResponse = await publicTokenExchange(input);
    const { access_token, item_id } = publicTokenExchangeResponse;
    return ctx.db.user.update({
      where: { id: ctx.currentUser.id },
      data: {
        plaidAccessToken: access_token,
        plaidItemId: item_id,
      }
    })
  }),
});
