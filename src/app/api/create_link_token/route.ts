import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { generateLinkToken } from "~/utils/plaid";

export const GET = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const linkTokenData = await generateLinkToken(userId);
  return NextResponse.json({ data: linkTokenData });
};
