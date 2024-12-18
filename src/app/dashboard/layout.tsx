import { MainNav } from "./main-nav"
import { DashboardNav } from "./nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1">
        <MainNav />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

