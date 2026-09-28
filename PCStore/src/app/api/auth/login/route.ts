import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    // بررسی اطلاعات ورودی
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // اگر کاربر وجود نداشت
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    // بررسی رمز عبور با bcrypt
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    // ساخت Cookie
    const cookieStore = await cookies();

    cookieStore.set("userId", String(user.id), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    // Login موفق
    return NextResponse.json({
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN_ERROR:", error);

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
