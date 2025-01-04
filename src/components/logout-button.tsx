import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import React from 'react'

export const LogoutButton = () => {
  const handleLogout = async() => {
    await signOut({redirect:false})
    window.location.href = "/auth/login"
  }
  return (
    <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-black">
      <LogOut className="w-5 h-5 mr-3" />
      Logout
    </Button>
  )
}
