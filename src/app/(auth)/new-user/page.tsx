import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

const createnewUser = async () => {
  const user = await currentUser();

  if (user) {
    // Check if the user exists in the database
    const userExists = await api.user.getUserByClerkId.query({
      clerkUserid: user.id,
    });

    const { financeTeams } = userExists;

    // If the user doesn't exist, create a new user in db
    if (!userExists) {
      await api.user.createUser.mutate({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "", //
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        birthday: user.birthday,
        imageUrl: user.imageUrl,
      });
    }

    // if the user has a finance team redirect to the dashboard
    if (financeTeams.length > 0) {
      redirect("/dashboard");
    } else {
      // if the user doesn't have a finance team redirect to the new finance team page
      redirect("/new-user/finance-team");
    }
  }
};

const NewUser = async () => {
  await createnewUser();
  return <div>theres nothing here</div>;
};

export default NewUser;
