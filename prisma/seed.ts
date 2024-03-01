import { db } from "~/server/db";
import { userRoles } from "~/userRoles";

async function main() {
  const roles = Object.values(userRoles);

  for (const roleName of roles) {
    await db.role.upsert({
      where: {
        name: roleName,
      },
      update: {},
      create: {
        name: roleName,
      },
    });
  }

  console.log("User Roles have been seeded successfully");
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
