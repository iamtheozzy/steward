import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateLinkToken } from "~/utils/plaid";

export const plaidRouter = createTRPCRouter({
  generateLinkToken: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser.id;
    const data = await generateLinkToken(userId);
    return data;
  }),
  getAccounts: protectedProcedure.query(async ({ctx}) => {
    const userId = ctx.currentUser.id;
    const items = await ctx.db.item.findMany({
      where: {
        userId,
      },
      include: {
        accounts: true,
      }
    })
  
    const accountsWithInstitution = items.flatMap((item) => {
      return item.accounts.map((account) => {
        return {
          ...account,
          institutionName: item.institutionName,
        }
      })
    });

    return accountsWithInstitution;
  })
});
