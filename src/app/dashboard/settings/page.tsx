import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Sliders, Bell, Lock, Shield, ArrowRight } from 'lucide-react'
import Link from "next/link"

const items = [
  {
    title: "Account",
    description: "Manage your account settings and preferences",
    icon: User,
    href: "/dashboard/settings/account"
  },
  {
    title: "Preferences",
    description: "Customize your application experience",
    icon: Sliders,
    href: "/dashboard/settings/preferences"
  },
  {
    title: "Notifications",
    description: "Configure how you receive notifications",
    icon: Bell,
    href: "/dashboard/settings/notifications"
  },
  {
    title: "Privacy",
    description: "Control your privacy settings",
    icon: Lock,
    href: "/dashboard/settings/privacy"
  },
  {
    title: "Security",
    description: "Manage your security preferences",
    icon: Shield,
    href: "/dashboard/settings/security"
  },
]

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Manage your account settings and set preferences
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-primary">
                  Configure settings
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

