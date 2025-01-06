import { SettingsNav } from "@/components/settings/settings-nav"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="border-r bg-gray-50/40 w-64">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account and preferences
          </p>
        </div>
        <SettingsNav />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="h-full px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  )
}

