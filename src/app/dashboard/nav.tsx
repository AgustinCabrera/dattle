"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MilkIcon as Cow, Heart, Baby, Stethoscope, LayoutDashboard } from 'lucide-react'
import { cn } from "../lib/utils"
import { Button } from "../../components/ui/button"

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
      title: "Animales",
    },
    {
      href: "/heat-service",
      icon: Heart,
      title: "Celo-Servicio",
    },
    {
      href: "/birth",
      icon: Baby,
      title: "Partos",
    },
    {
      href: "/diseases",
      icon: Stethoscope,
      title: "Enfermedades",
    },
  ]

  return (
    <nav className="flex flex-col w-64 border-r bg-gray-50/40">
      <div className="p-6">
        <h1 className="text-xl font-bold">Administrar Tambo</h1>
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

