import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const financeTeamRouter = createTRPCRouter({
  createFinanceTeam: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(1, "Team name cannot be empty")
          .max(40, "Team name cannot be longer than 40 characters"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;
      const userId = ctx.currentUser.id;

      const financeTeam = await ctx.db.financeTeam.create({
        data: {
          name,
          users: {
            connect: { id: userId },
          },
        },
      });

      return financeTeam;
    }),
});
