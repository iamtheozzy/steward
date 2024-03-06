import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUserByClerkId: protectedProcedure
    .input(
      z.object({
        clerkUserid: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { clerkUserid } = input;
      const user = await ctx.db.user.findUniqueOrThrow({
        where: {
          clerkId: clerkUserid,
        },
        include: {
          financeTeams: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),
  createUser: protectedProcedure
    .input(
      z.object({
        clerkId: z.string(),
        email: z.string().email({ message: "Invalid email" }),
        firstName: z.optional(z.string()),
        lastName: z.optional(z.string()),
        birthday: z.optional(z.string()),
        imageUrl: z.optional(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { clerkId, email, firstName, lastName, birthday, imageUrl } = input;
      const user = await ctx.db.user.upsert({
        where: {
          clerkId,
        },
        update: {},
        create: {
          clerkId,
          email,
          firstName,
          lastName,
          birthday,
          imageUrl,
        },
      });

      return user;
    }),
});
