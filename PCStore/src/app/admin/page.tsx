import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";

export default async function AdminPage() {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ADMIN PANEL
          </p>

          <h1 className="mt-2 text-3xl font-bold">Welcome, {admin.name}</h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage your PCStore from here.
          </p>
        </div>

        <AdminDashboard />
        <UserManagement />
      </div>
    </main>
  );
}
