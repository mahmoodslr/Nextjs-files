import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// ADD TO CART
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        {
          message: "Product ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Please login first.",
        },
        {
          status: 401,
        },
      );
    }

    const userIdNumber = Number(userId);
    const productIdNumber = Number(productId);

    const user = await prisma.user.findUnique({
      where: {
        id: userIdNumber,
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

    const product = await prisma.product.findUnique({
      where: {
        id: productIdNumber,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found.",
        },
        {
          status: 404,
        },
      );
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: userIdNumber,
          productId: productIdNumber,
        },
      },
    });

    if (existingItem) {
      const cartItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({
        message: "Product quantity increased.",
        cartItem,
      });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId: userIdNumber,
        productId: productIdNumber,
        quantity: 1,
      },
    });

    return NextResponse.json(
      {
        message: "Product added to cart.",
        cartItem,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("ADD_TO_CART_ERROR:", error);

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

// GET CART
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Please login first.",
        },
        {
          status: 401,
        },
      );
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        product: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      cartItems,
    });
  } catch (error) {
    console.error("GET_CART_ERROR:", error);

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

// UPDATE QUANTITY
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        {
          message: "Product ID and quantity are required.",
        },
        {
          status: 400,
        },
      );
    }

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Please login first.",
        },
        {
          status: 401,
        },
      );
    }

    const userIdNumber = Number(userId);
    const productIdNumber = Number(productId);
    const quantityNumber = Number(quantity);

    if (quantityNumber < 1) {
      return NextResponse.json(
        {
          message: "Quantity must be at least 1.",
        },
        {
          status: 400,
        },
      );
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: userIdNumber,
          productId: productIdNumber,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        {
          message: "Product is not in the cart.",
        },
        {
          status: 404,
        },
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: quantityNumber,
      },
    });

    return NextResponse.json({
      message: "Cart updated successfully.",
      cartItem: updatedItem,
    });
  } catch (error) {
    console.error("UPDATE_CART_ERROR:", error);

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

// DELETE FROM CART
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        {
          message: "Product ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Please login first.",
        },
        {
          status: 401,
        },
      );
    }

    const userIdNumber = Number(userId);
    const productIdNumber = Number(productId);

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: userIdNumber,
          productId: productIdNumber,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        {
          message: "Product is not in the cart.",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return NextResponse.json({
      message: "Product removed from cart.",
    });
  } catch (error) {
    console.error("DELETE_CART_ERROR:", error);

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
