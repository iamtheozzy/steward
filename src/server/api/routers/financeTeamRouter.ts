import { TRPCError } from "@trpc/server";
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
  getFinanceTeamMembers: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser.id;
    const financeTeam = await ctx.db.financeTeam.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: {
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!financeTeam) {
      throw new Error("Finance team not found");
    }

    return financeTeam.users;
  }),
  addFinanceTeamMember: protectedProcedure
    .input(z.object({ email: z.string().email(), userRole: z.enum(["COLLABORATOR", "VIEWER"]) }))
    .mutation(async ({ input, ctx }) => {
      const { email, userRole } = input;
      const financeTeam = await ctx.db.financeTeam.findFirst({
        where: {
          users: {
            some: {
              id: ctx.currentUser.id,
            },
          },
        },
        include: {
          users: true,
        },
      });

      if (!financeTeam) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Finance team not found",
        });
      }

      // Check if the invitee is already a member of the finance team
      const isAlreadyMember = financeTeam.users.some((user) => user.email === email);
      if (isAlreadyMember) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User is already a member of the finance team",
        });
      }

      // Check for an existing invitation
      const existingInvitation = await ctx.db.invitation.findFirst({
        where: {
          email,
          financeTeamId: financeTeam.id,
          status: "PENDING",
        },
      });

      if (existingInvitation) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An invitation for this user already exists",
        });
      }

      // Retrieve the role by name
      const role = await ctx.db.role.findUnique({
        where: {
          name: userRole,
        },
      });
      if (!role) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Role not found",
        });
      }

      // Create the invitation
      const invitation = await ctx.db.invitation.create({
        data: {
          email,
          financeTeamId: financeTeam.id,
          roleId: role.id,
          senderId: ctx.currentUser.id,
        },
      });

      return { success: true, message: "Invitation sent", invitation };
    }),
});
