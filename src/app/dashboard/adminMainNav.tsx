"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, FileText, AlertCircle, BarChart2 } from 'lucide-react'
import { cn } from "../lib/cn"
import { Button } from "@/components/ui/button"

export function AdminMainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard/admin",
      icon: BarChart2,
      title: "Dashboard",
    },
    {
      href: "/dashboard/admin/users",
      icon: Users,
      title: "User Management",
    },
    {
      href: "/dashboard/admin/content",
      icon: FileText,
      title: "Content Management",
    },
    {
      href: "/dashboard/admin/logs",
      icon: AlertCircle,
      title: "System Logs",
    },
    {
      href: "/dashboard/admin/analytics",
      icon: BarChart2,
      title: "Analytics",
    },
  ]

  return (
    <nav className="flex flex-col w-64 border-r bg-gray-50/40">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex-1 px-4 space-y-2">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-gray-100"
              )}
            >
              <route.icon className="w-5 h-5 mr-3" />
              {route.title}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  )
}

