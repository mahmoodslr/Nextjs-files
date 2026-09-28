import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const admin = await getAdmin();

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

    const products = await prisma.product.count();
    const users = await prisma.user.count();
    const cartItems = await prisma.cartItem.count();

    return NextResponse.json({
      products,
      users,
      cartItems,
    });
  } catch (error) {
    console.error("ADMIN_STATS_ERROR:", error);

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
