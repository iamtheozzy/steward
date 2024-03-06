import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const invitationRouter = createTRPCRouter({
  createInvitation: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        financeTeamId: z.string(),
        senderId: z.string(),
        roleId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, financeTeamId, senderId, roleId } = input;

      const invitation = await ctx.db.invitation.create({
        data: {
          email,
          financeTeamId,
          senderId,
          roleId,
          status: "pending",
        },
      });

      return invitation;
    }),
  listPendingInvitations: protectedProcedure
    .input(z.object({ financeTeamId: z.string().min(1, "must be a valid finance team id") }))
    .query(async ({ input, ctx }) => {
      const { financeTeamId } = input;

      const pendingInvitations = await ctx.db.invitation.findMany({
        where: {
          financeTeamId,
          status: "pending",
        },
        include: {
          role: true,
        },
      });

      return pendingInvitations;
    }),
  updateInvitationStatus: protectedProcedure
    .input(
      z.object({
        invitationId: z.string(),
        status: z.enum(["accepted", "rejected"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { invitationId, status } = input;

      const invitation = await ctx.db.invitation.update({
        where: { id: invitationId },
        data: { status },
      });

      return invitation;
    }),
});
