import { createTRPCRouter } from "~/server/api/trpc";
import { plaidRouter } from "~/server/api/routers/plaidRouter";
import { userRouter } from "~/server/api/routers/userRouter";
import { financeTeamRouter } from "~/server/api/routers/financeTeamRouter";
import { invitationRouter } from "~/server/api/routers/invitationRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  plaid: plaidRouter,
  user: userRouter,
  financeTeam: financeTeamRouter,
  invitation: invitationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
