import { db } from "~/server/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createnewUser = async () => {
  const user = await currentUser();

  if (user) {
    const match = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!match) {
      await db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress ?? "", // 
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday,
          imageUrl: user.imageUrl,
        },
      });
    }

    redirect("/dashboard");
  }
};

const NewUser = async () => {
  await createnewUser();
  return <div>Creating new user...</div>;
}

export default NewUser;
