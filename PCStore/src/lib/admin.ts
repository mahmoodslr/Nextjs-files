import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getAdmin() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    return null;
  }

  if (user.email !== process.env.ADMIN_EMAIL) {
    return null;
  }

  return user;
}
