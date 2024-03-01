import { db } from "~/server/db";
import { userRoles } from "~/userRoles";

async function main() {
  const roles = Object.values(userRoles);

  for (const roleName of roles) {
    await db.role
      .create({
        data: {
          name: roleName,
        },
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
