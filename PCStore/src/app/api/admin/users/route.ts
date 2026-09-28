import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "admin@pcstore.com";

// CHECK ADMIN
async function checkAdmin() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user || user.email !== ADMIN_EMAIL) {
    return null;
  }

  return user;
}

// GET USERS
export async function GET() {
  try {
    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error("GET_ADMIN_USERS_ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE USER
export async function DELETE(request: Request) {
  try {
    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const userId = Number(body.userId);

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    // جلوگیری از حذف خود ادمین
    if (userId === admin.id) {
      return NextResponse.json(
        {
          message: "You cannot delete the admin account.",
        },
        {
          status: 400,
        },
      );
    }

    // بررسی وجود کاربر
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        },
      );
    }

    // حذف کاربر
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE_USER_ERROR:", error);

    return NextResponse.json(
      {
        message: "Could not delete user.",
      },
      {
        status: 500,
      },
    );
  }
}
