import { auth } from "@/auth";
import { db } from "./prisma";

export const checkUser = async () => {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = session?.user?.name || "User";

    const newUser = await db.user.create({
      data: {
        clerkUserId: `nextauth_${crypto.randomUUID()}`,
        name,
        imageUrl: session?.user?.image,
        email,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};