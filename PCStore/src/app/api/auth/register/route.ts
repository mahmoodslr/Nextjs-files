import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    // بررسی اطلاعات ورودی که خالی نباشه
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        {
          status: 400,
        },
      );
    }

    // بررسی حداقل طول رمز
    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters.",
        },
        {
          status: 400,
        },
      );
    }

    // بررسی اینکه Email قبلاً ثبت شده یا نه
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "This email is already registered.",
        },
        {
          status: 409,
        },
      );
    }

    // Hash کردن Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ساخت User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);

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
