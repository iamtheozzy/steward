import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateLinkToken } from "~/utils/plaid";

export const plaidRouter = createTRPCRouter({
  generateLinkToken: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser.id;
    const linkToken = await generateLinkToken(userId);
    return { linkToken };
  })
});
