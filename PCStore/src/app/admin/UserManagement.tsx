"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // GET USERS
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("/api/admin/users");
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Could not load users.");
          return;
        }

        setUsers(data.users);
      } catch (error) {
        console.error("GET_USERS_ERROR:", error);
        setMessage("Could not load users.");
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  // DELETE USER
  async function deleteUser(userId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(userId);
      setMessage("");

      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not delete user.");
        return;
      }

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId),
      );

      setMessage("User deleted successfully.");
    } catch (error) {
      console.error("DELETE_USER_ERROR:", error);
      setMessage("Could not delete user.");
    } finally {
      setDeletingId(null);
    }
  }

  // LOADING
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold">Users</h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage registered users.
        </p>
      </div>

      {message && (
        <div className="mb-4 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {message}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {users.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No users found.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold">{user.name}</h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={() => deleteUser(user.id)}
                  disabled={deletingId === user.id}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950"
                >
                  {deletingId === user.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
