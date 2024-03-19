import { TRPCError } from "@trpc/server";
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

      const existingInvitation = await ctx.db.invitation.findFirst({
        where: {
          financeTeamId,
          email,
        },
      });

      if (existingInvitation) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An invitation has already been sent to this email",
        });
      }

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
  listPendingInvitations: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser.id;

    const pendingInvitations = await ctx.db.invitation.findMany({
      where: {
        senderId: userId,
        status: "pending",
      },
      include: {
        role: true,
      },
      orderBy: {
        email: "asc",
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
  deleteInvitation: protectedProcedure
    .input(z.object({ invitationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { invitationId } = input;

      await ctx.db.invitation.delete({
        where: { id: invitationId },
      });

      return true;
    }),
});
