import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AdminMainNav } from "./adminMainNav";
import { MainNav } from "./main-nav";
import { DashboardNav } from "./nav";
import {SettingsNav} from "@/components/settings/settings-nav";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const isAdmin = session.user.role === "admin";
  const isSettingsPage =
    typeof window !== "undefined" &&
    window.location.pathname.includes("/dashboard/settings");

  return (
    <div className="flex min-h-screen">
      {isAdmin ? (
        <AdminMainNav />
      ) : isSettingsPage ? (
        <SettingsNav />
      ) : (
        <DashboardNav />
      )}
      <div className="flex-1">
        <MainNav />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
