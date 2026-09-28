"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // GET CART COUNT
  async function getCartCount() {
    try {
      const response = await fetch("/api/cart");

      const data = await response.json();

      if (!response.ok) {
        setCartCount(0);
        return;
      }

      const totalItems = data.cartItems.reduce(
        (total: number, item: { quantity: number }) => total + item.quantity,
        0,
      );

      setCartCount(totalItems);
    } catch (error) {
      console.error("CART_COUNT_ERROR:", error);
      setCartCount(0);
    }
  }

  // GET USER
  useEffect(() => {
    setMounted(true);

    async function getUser() {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();

        setUser(data.user);

        if (data.user) {
          await getCartCount();
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("USER_ERROR:", error);
        setUser(null);
        setCartCount(0);
      } finally {
        setLoading(false);
      }
    }

    getUser();

    function handleCartUpdate() {
      getCartCount();
    }

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // LOGOUT
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
      setCartCount(0);

      window.location.href = "/";
    } catch (error) {
      console.error("LOGOUT_ERROR:", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/80">
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm text-white dark:bg-white dark:text-gray-900">
            P
          </div>

          <span className="hidden sm:block">PCStore</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <Link
            href="/"
            className="text-xs font-medium text-gray-700 transition hover:text-black sm:text-sm dark:text-gray-300 dark:hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/#products"
            className="text-xs font-medium text-gray-700 transition hover:text-black sm:text-sm dark:text-gray-300 dark:hover:text-white"
          >
            Products
          </Link>

          {user && (
            <Link
              href="/cart"
              className="relative text-xs font-medium text-gray-700 transition hover:text-black sm:text-sm dark:text-gray-300 dark:hover:text-white"
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 py-0.5 text-[10px] font-semibold text-white sm:text-[11px] dark:bg-white dark:text-gray-900">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          )}

          {!loading && user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden text-sm font-medium lg:block">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-gray-200 px-2.5 py-2 text-xs font-medium transition hover:bg-gray-100 sm:px-4 sm:text-sm dark:border-gray-800 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            !loading && (
              <Link
                href="/login"
                className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-700 sm:px-4 sm:text-sm dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
