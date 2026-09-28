"use client";

import { useEffect, useState } from "react";
import ProductManagement from "./ProductManagement";

type Stats = {
  products: number;
  users: number;
  cartItems: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStats() {
      try {
        const response = await fetch("/api/admin/stats");

        const data = await response.json();

        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error("STATS_ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        Could not load dashboard.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Products */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">Products</p>

        <p className="mt-2 text-3xl font-bold">{stats.products}</p>
      </div>

      {/* Users */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">Users</p>

        <p className="mt-2 text-3xl font-bold">{stats.users}</p>
      </div>

      {/* Cart Items */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">Cart Items</p>

        <p className="mt-2 text-3xl font-bold">{stats.cartItems}</p>
      </div>
      <ProductManagement />
    </div>
  );
}
