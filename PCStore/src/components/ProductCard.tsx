"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
    // جلوگیری از باز شدن صفحه جزئیات هنگام کلیک روی Add to Cart
    event.stopPropagation();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setMessage("Added to cart.");

      // اطلاع به Navbar برای آپدیت تعداد سبد
      window.dispatchEvent(new Event("cartUpdated"));

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("ADD_TO_CART_ERROR:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article
      onClick={onClick}
      className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur dark:bg-gray-900/90 dark:text-gray-300">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <p className="mt-2 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">Price</p>

            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
              {product.price.toLocaleString("en-US")} تومان
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>
        )}
      </div>
    </article>
  );
}
