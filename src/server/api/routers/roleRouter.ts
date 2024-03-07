import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const RoleRouter = createTRPCRouter({
  listRoles: protectedProcedure.query(async ({ ctx }) => {
    const roles = await ctx.db.role.findMany();
    return roles;
  }),
  getRoleByName: protectedProcedure
    .input(
      z.optional(
        z.object({
          name: z.enum(["ADMIN", "ADVISOR", "COLLABORATOR", "VIEWER"]),
        }),
      ),
    )
    .query(async ({ input, ctx }) => {
      const { name } = input ?? {};
      const role = await ctx.db.role.findUnique({
        where: {
          name,
        },
      });

      if (!role) {
        throw new Error("Role not found");
      }

      return role;
    }),
});
