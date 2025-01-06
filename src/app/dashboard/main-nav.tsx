"use client"
import { Bell, Settings } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { LogoutButton } from "@/components/logout-button"
import {useRouter} from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

export function MainNav() {
  
const router = useRouter();
const handleRoute = () =>{
  router.push('dashboard/settings')
}
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-white border border-gray-200 rounded-md shadow-lg'>
              <Button className='text-black'>My Account</Button>
              <DropdownMenuSeparator />
              <Button onClick={handleRoute} className='text-black'>Settings</Button>
              <DropdownMenuSeparator />
              <LogoutButton  />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

