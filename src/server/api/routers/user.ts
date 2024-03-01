import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
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
