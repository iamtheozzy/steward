import { auth } from "@clerk/nextjs";
import { db } from "~/server/db";

export const getUserByClerkID = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Clerk user not found");
  }

  const user = await db.user.findUniqueOrThrow({
    where: {
      clerkId: userId ,
    },
  });

  return user;
};
