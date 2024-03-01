import { createTRPCRouter } from "~/server/api/trpc";
import { plaidRouter } from "~/server/api/routers/plaid";
import { userRouter } from "~/server/api/routers/user";
import { financeTeamRouter } from "~/server/api/routers/financeTeam";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  plaid: plaidRouter,
  user: userRouter,
  financeTeam: financeTeamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
