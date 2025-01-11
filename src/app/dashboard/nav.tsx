"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MilkIcon as Cow, Heart, Baby, Stethoscope, LayoutDashboard, BarChartIcon as ChartNoAxesCombined, BookUser } from 'lucide-react'
import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/animals",
      icon: Cow,
      title: "Animals",
    },
    {
      href: "/heat-service",
      icon: Heart,
      title: "Heat - Service",
    },
    {
      href: "/birth",
      icon: Baby,
      title: "Births",
    },
    {
      href: "/diseases",
      icon: Stethoscope,
      title: "Diseases",
    },
    {
      href: "/analytics",
      icon: ChartNoAxesCombined,
      title: "Analytics",
    },
    {
      href: "/administration",
      icon: BookUser,
      title: "Administration",
    }
  ]

  return (
    <nav className="flex flex-col w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Manage Cattle</h1>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-base font-normal",
                pathname === route.href && "bg-muted font-medium"
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

