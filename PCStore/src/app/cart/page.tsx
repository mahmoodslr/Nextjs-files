"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // GET CART
  useEffect(() => {
    async function getCart() {
      try {
        const response = await fetch("/api/cart");
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Something went wrong.");
          return;
        }

        setCartItems(data.cartItems);
      } catch (error) {
        console.error("CART_ERROR:", error);
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    getCart();
  }, []);

  // UPDATE QUANTITY
  async function updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      return;
    }

    try {
      setUpdatingId(productId);

      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not update cart.");
        return;
      }

      setCartItems((items) =>
        items.map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("UPDATE_QUANTITY_ERROR:", error);
      setMessage("Could not update cart.");
    } finally {
      setUpdatingId(null);
    }
  }

  // REMOVE ITEM
  async function removeItem(productId: number) {
    try {
      setUpdatingId(productId);

      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not remove product.");
        return;
      }

      setCartItems((items) =>
        items.filter((item) => item.product.id !== productId),
      );
    } catch (error) {
      console.error("REMOVE_CART_ERROR:", error);
      setMessage("Could not remove product.");
    } finally {
      setUpdatingId(null);
    }
  }

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-gray-900 dark:bg-gray-950 dark:text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-gray-500 dark:text-gray-400">Loading cart...</p>
        </div>
      </main>
    );
  }

  // LOGIN REQUIRED
  if (message) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-gray-900 dark:bg-gray-950 dark:text-white">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl dark:bg-gray-900">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold">Your Cart</h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">{message}</p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-gray-900 dark:bg-gray-950 dark:text-white">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl dark:bg-gray-900">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold">Your Cart is Empty</h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            You haven't added any products to your cart yet.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // CART PAGE
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-gray-900 sm:px-6 sm:py-12 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ← Continue Shopping
          </Link>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">My Cart</h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Review your selected products.
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => {
            const isUpdating = updatingId === item.product.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 transition dark:border-gray-800 dark:bg-gray-900 sm:p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Image */}
                  <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24 dark:bg-gray-800">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold">{item.product.name}</h2>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {item.product.description}
                    </p>

                    <p className="mt-3 font-medium">
                      {item.product.price.toLocaleString("en-US")} تومان
                    </p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1 || isUpdating}
                        aria-label="Decrease quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center text-sm font-medium">
                        {isUpdating ? "..." : item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={isUpdating}
                        aria-label="Increase quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      disabled={isUpdating}
                      className="text-sm text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>

              <p className="mt-1 text-2xl font-bold">
                {totalPrice.toLocaleString("en-US")} تومان
              </p>
            </div>

            <button className="w-full rounded-xl bg-gray-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-[0.99] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 sm:w-auto">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
