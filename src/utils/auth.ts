import { auth } from "@clerk/nextjs";
import { db } from "~/server/db";

export const getUserByClerkID = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Clerk user not found");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const user = await db.user.findUniqueOrThrow({
    where: {
      clerkId: userId ,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user;
};
