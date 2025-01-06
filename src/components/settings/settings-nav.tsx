"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/app/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Settings, User, Sliders, Bell, Lock, Shield } from 'lucide-react'

const items = [
  {
    title: "General",
    href: "/dashboard/settings",
    icon: Settings,
    description: "General settings and configurations"
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
    icon: User,
    description: "Manage your account details"
  },
  {
    title: "Preferences",
    href: "/dashboard/settings/preferences",
    icon: Sliders,
    description: "Customize your experience"
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: Bell,
    description: "Configure your notifications"
  },
  {
    title: "Privacy",
    href: "/dashboard/settings/privacy",
    icon: Lock,
    description: "Manage your privacy settings"
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
    icon: Shield,
    description: "Security and authentication"
  },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1 p-2">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start relative h-auto py-3 px-4",
              isActive && "bg-muted font-medium shadow-sm",
              !isActive && "hover:bg-muted/50"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4 shrink-0" />
              <div className="grid gap-0.5">
                <span className="text-sm">{item.title}</span>
                <span className={cn(
                  "text-xs line-clamp-1",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}>
                  {item.description}
                </span>
              </div>
            </div>
            {isActive && (
              <span className="absolute right-2 top-[calc(50%-0.5rem)] flex h-4 w-4 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

