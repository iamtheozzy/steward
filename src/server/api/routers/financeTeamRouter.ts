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

      const collaboratorRole = await ctx.db.role.findUnique({
        where: {
          name: "COLLABORATOR",
        },
      });

      if (!collaboratorRole) {
        throw new Error("Default role not found");
      }

      await ctx.db.userRole.create({
        data: {
          userId,
          financeTeamId: financeTeam.id,
          roleId: collaboratorRole.id,
        },
      });

      return financeTeam;
    }),
  getFinanceTeamByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      const financeTeam = await ctx.db.financeTeam.findFirst({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      });

      return financeTeam;
    }),
});
